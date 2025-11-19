import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, Eye, Clock, Flame, RefreshCw, Download } from "lucide-react";
import { useMilestones } from "@/hooks/useMilestones";
import { useMealPlan } from "@/hooks/useMealPlan";
import { MilestoneDialog } from "@/components/MilestoneDialog";

import RecipeSwapDialog from "@/components/RecipeSwapDialog";
import { format, addDays, startOfWeek } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const PlannerNew = () => {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<{ date: string; mealType?: "breakfast" | "lunch" | "dinner" | "snack"; mealName?: string }>();
  const [userDietPreference, setUserDietPreference] = useState<string>("both");
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [swapData, setSwapData] = useState<{ recipe: any; mealType: "breakfast" | "lunch" | "dinner" | "snack"; day: string } | null>(null);
  const weekStartDate = format(currentWeek, "yyyy-MM-dd");
  const { mealPlan, loading, refetch } = useMealPlan(weekStartDate);
  const { addMilestone, hasMilestone } = useMilestones();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const day = daysOfWeek[currentDayIndex];
  const dayDate = format(addDays(currentWeek, currentDayIndex), "yyyy-MM-dd");

  // Auto-generate meal plan if none exists for this week (Pro Feature)
  useEffect(() => {
    const autoGenerateMealPlan = async () => {
      if (!user || loading) return;
      
      // If no meal plan exists for this week, generate one automatically
      if (mealPlan.length === 0) {
        try {
          // Fetch user profile
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("diet_preference")
            .eq("user_id", user.id)
            .maybeSingle();

          setUserDietPreference(profile?.diet_preference || "both");

          const dietPreference = profile?.diet_preference || "both";

          // Fetch recipes
          let recipesQuery = supabase.from("recipes").select("*");
          if (dietPreference !== "both") {
            recipesQuery = recipesQuery.eq("diet_type", dietPreference as "veg" | "non_veg");
          }

          const { data: recipes } = await recipesQuery;
          if (!recipes || recipes.length === 0) return;

          // Group recipes by meal type
          const breakfasts = recipes.filter(r => r.meal_type === "breakfast");
          const lunches = recipes.filter(r => r.meal_type === "lunch");
          const dinners = recipes.filter(r => r.meal_type === "dinner");
          const snacks = recipes.filter(r => r.meal_type === "snack");

          // Shuffle for variety
          const shuffle = <T,>(array: T[]): T[] => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
          };

          const shuffledBreakfasts = shuffle(breakfasts);
          const shuffledLunches = shuffle(lunches);
          const shuffledDinners = shuffle(dinners);
          const shuffledSnacks = shuffle(snacks);

          // Create meal plan entries
          const mealPlansToInsert = daysOfWeek.flatMap((day, index) => {
            const entries = [];
            if (shuffledBreakfasts.length > 0) {
              entries.push({
                user_id: user.id,
                week_start_date: weekStartDate,
                day_of_week: day,
                meal_type: "breakfast" as const,
                recipe_id: shuffledBreakfasts[index % shuffledBreakfasts.length].id,
                servings: 1,
              });
            }
            if (shuffledLunches.length > 0) {
              entries.push({
                user_id: user.id,
                week_start_date: weekStartDate,
                day_of_week: day,
                meal_type: "lunch" as const,
                recipe_id: shuffledLunches[index % shuffledLunches.length].id,
                servings: 1,
              });
            }
            if (shuffledDinners.length > 0) {
              entries.push({
                user_id: user.id,
                week_start_date: weekStartDate,
                day_of_week: day,
                meal_type: "dinner" as const,
                recipe_id: shuffledDinners[index % shuffledDinners.length].id,
                servings: 1,
              });
            }
            if (shuffledSnacks.length > 0) {
              entries.push({
                user_id: user.id,
                week_start_date: weekStartDate,
                day_of_week: day,
                meal_type: "snack" as const,
                recipe_id: shuffledSnacks[index % shuffledSnacks.length].id,
                servings: 1,
              });
            }
            return entries;
          });

          // Insert meal plans
          await supabase.from("meal_plans").insert(mealPlansToInsert);
          refetch();
        } catch (error) {
          console.error("Error auto-generating meal plan:", error);
        }
      }
    };

    autoGenerateMealPlan();
  }, [user, loading, mealPlan.length, weekStartDate, refetch]);

  // Fetch user preference separately
  useEffect(() => {
    const fetchUserPreference = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("user_profiles")
        .select("diet_preference")
        .eq("user_id", user.id)
        .maybeSingle();

      setUserDietPreference(data?.diet_preference || "both");
    };

    fetchUserPreference();
  }, [user]);

  // Filter meals for current day
  const dayMeals = mealPlan.filter((entry) => entry.day_of_week === day);

  // Group by meal type
  const breakfastMeal = dayMeals.find((m) => m.meal_type === "breakfast");
  const lunchMeal = dayMeals.find((m) => m.meal_type === "lunch");
  const dinnerMeal = dayMeals.find((m) => m.meal_type === "dinner");
  const snackMeal = dayMeals.find((m) => m.meal_type === "snack");

  const meals: Array<{ type: "breakfast" | "lunch" | "dinner" | "snack"; data: typeof breakfastMeal; emoji: string }> = [
    { type: "breakfast", data: breakfastMeal, emoji: "🌅" },
    { type: "lunch", data: lunchMeal, emoji: "☀️" },
    { type: "dinner", data: dinnerMeal, emoji: "🌙" },
    { type: "snack", data: snackMeal, emoji: "🍿" },
  ];

  const totalCalories = dayMeals.reduce((sum, m) => sum + (m.recipe?.calories || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Weekly Meal Planner
              </h1>
              <p className="text-muted-foreground mt-1">
                Your personalized meal plan based on {userDietPreference === "veg" ? "vegetarian" : userDietPreference === "non_veg" ? "non-vegetarian" : "all"} preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                {format(addDays(currentWeek, currentDayIndex), "MMM d, yyyy")}
              </Badge>
              <Button
                onClick={async () => {
                  // Generate PDF of weekly meal plan
                  const jsPDF = (await import("jspdf")).default;
                  const autoTable = (await import("jspdf-autotable")).default;
                  
                  const doc = new jsPDF();
                  const weekStart = currentWeek;
                  
                  doc.setFontSize(20);
                  doc.text("Weekly Meal Plan", 14, 20);
                  doc.setFontSize(10);
                  doc.text(`Week of ${format(weekStart, "MMM d, yyyy")}`, 14, 28);
                  
                  const tableData = daysOfWeek.map((day, index) => {
                    const dayMeals = mealPlan.filter((entry) => entry.day_of_week === day);
                    const breakfast = dayMeals.find((m) => m.meal_type === "breakfast");
                    const lunch = dayMeals.find((m) => m.meal_type === "lunch");
                    const dinner = dayMeals.find((m) => m.meal_type === "dinner");
                    const snack = dayMeals.find((m) => m.meal_type === "snack");
                    
                    return [
                      `${day}\n${format(addDays(weekStart, index), "MMM d")}`,
                      breakfast?.recipe?.title || "-",
                      lunch?.recipe?.title || "-",
                      dinner?.recipe?.title || "-",
                      snack?.recipe?.title || "-",
                    ];
                  });
                  
                  autoTable(doc, {
                    head: [["Day", "Breakfast", "Lunch", "Dinner", "Snack"]],
                    body: tableData,
                    startY: 35,
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [99, 102, 241] },
                  });
                  
                  doc.save(`meal-plan-${format(weekStart, "yyyy-MM-dd")}.pdf`);
                }}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Generate PDF
              </Button>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="relative mb-8 overflow-hidden">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDayIndex(Math.max(0, currentDayIndex - 1))}
                disabled={currentDayIndex === 0}
                className="z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
                {daysOfWeek.map((d, i) => {
                  const isActive = i === currentDayIndex;
                  const isPast = i < currentDayIndex;

                  return (
                    <button
                      key={d}
                      onClick={() => setCurrentDayIndex(i)}
                      className={`
                        min-w-[120px] px-6 py-3 rounded-xl font-medium transition-all duration-300
                        ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg scale-110"
                            : isPast
                            ? "bg-muted/50 text-muted-foreground scale-95 opacity-60"
                            : "bg-card border border-border hover:border-primary/50 scale-95 opacity-80"
                        }
                      `}
                    >
                      <div className="text-sm">{d}</div>
                      <div className="text-xs opacity-70 mt-1">{format(addDays(currentWeek, i), "MMM d")}</div>
                    </button>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDayIndex(Math.min(6, currentDayIndex + 1))}
                disabled={currentDayIndex === 6}
                className="z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Day Card */}
          <Card className="border-2 shadow-xl bg-gradient-to-br from-card to-card/50">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{day}'s Meal Plan</CardTitle>
                  <CardDescription className="text-base">
                    {format(addDays(currentWeek, currentDayIndex), "MMMM d, yyyy")}
                  </CardDescription>
                </div>
                <Badge className="text-lg px-4 py-2">
                  <Flame className="h-4 w-4 mr-1" />
                  {totalCalories} cal
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : dayMeals.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">No meal plan for this day yet.</p>
                  <p className="text-sm text-muted-foreground">
                    Use the "Generate Meal Plan" button to create your personalized weekly plan
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {meals.map(({ type, data, emoji }) => {
                    if (!data) return null;

                    const recipe = data.recipe;
                    const isCompleted = hasMilestone(dayDate, type);

                    return (
                      <div key={type} className="relative">
                        <div
                          className={`p-4 rounded-lg border transition-all ${
                            isCompleted
                              ? "bg-primary/5 border-primary/30"
                              : "bg-card hover:bg-muted/20 border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{emoji}</span>
                              <div>
                                <h3 className="font-semibold capitalize">{type}</h3>
                                <p className="text-xs text-muted-foreground">
                                  {recipe.cook_time ? `${recipe.cook_time} min` : "Quick prep"}
                                </p>
                              </div>
                            </div>
                            {isCompleted && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>

                          <h4 className="font-medium mb-1">{recipe.title}</h4>
                          <p className="text-muted-foreground text-xs mb-3 line-clamp-1">{recipe.description}</p>

                          <div className="grid grid-cols-4 gap-2 mb-3">
                            <div className="text-center p-2 rounded bg-background/50">
                              <div className="text-sm font-bold text-primary">{recipe.calories}</div>
                              <div className="text-[10px] text-muted-foreground">Cal</div>
                            </div>
                            <div className="text-center p-2 rounded bg-background/50">
                              <div className="text-sm font-bold text-primary">{recipe.protein}g</div>
                              <div className="text-[10px] text-muted-foreground">Pro</div>
                            </div>
                            <div className="text-center p-2 rounded bg-background/50">
                              <div className="text-sm font-bold text-primary">{recipe.carbs}g</div>
                              <div className="text-[10px] text-muted-foreground">Carbs</div>
                            </div>
                            <div className="text-center p-2 rounded bg-background/50">
                              <div className="text-sm font-bold text-primary">{recipe.fats}g</div>
                              <div className="text-[10px] text-muted-foreground">Fats</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link to={`/recipe/${recipe.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSwapData({ recipe, mealType: type, day });
                                setSwapDialogOpen(true);
                              }}
                              className="gap-1"
                            >
                              <RefreshCw className="h-3 w-3" />
                              Swap
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedMilestone({ date: dayDate, mealType: type, mealName: recipe.title });
                                setMilestoneDialogOpen(true);
                              }}
                              disabled={isCompleted}
                              className="flex-1 gap-1"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {isCompleted ? "Done" : "Complete"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      <MilestoneDialog
        open={milestoneDialogOpen}
        onOpenChange={setMilestoneDialogOpen}
        onConfirm={(notes) => {
          if (selectedMilestone) {
            addMilestone(selectedMilestone.date, selectedMilestone.mealType || undefined, notes);
          }
        }}
        mealName={selectedMilestone?.mealName}
      />

      {swapData && (
        <RecipeSwapDialog
          open={swapDialogOpen}
          onOpenChange={setSwapDialogOpen}
          currentRecipe={swapData.recipe}
          mealType={swapData.mealType}
          day={swapData.day}
          weekStartDate={weekStartDate}
          onSwapComplete={refetch}
        />
      )}
    </div>
  );
};

export default PlannerNew;
