import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, Eye, Clock, Flame, RefreshCw } from "lucide-react";
import { useMilestones } from "@/hooks/useMilestones";
import { useMealPlan } from "@/hooks/useMealPlan";
import { MilestoneDialog } from "@/components/MilestoneDialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";
import { toast } from "sonner";
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
  const [initialLoading, setInitialLoading] = useState(true);
  const weekStartDate = format(currentWeek, "yyyy-MM-dd");
  const { mealPlan, loading, refetch } = useMealPlan(weekStartDate);
  const { addMilestone, hasMilestone } = useMilestones();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const day = daysOfWeek[currentDayIndex];
  const dayDate = format(addDays(currentWeek, currentDayIndex), "yyyy-MM-dd");

  // Auto-generate meal plan if none exists for this week (Pro Feature)
  useEffect(() => {
    const autoGenerateMealPlan = async () => {
      if (!user) {
        setInitialLoading(false);
        return;
      }
      
      if (loading) return;
      
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

  const generateWeeklyPDF = async () => {
    if (!user) return;
    
    try {
      // Fetch all meal plans for the current week
      const { data: weekMealPlans } = await supabase
        .from("meal_plans")
        .select(`
          id,
          day_of_week,
          meal_type,
          servings,
          recipe:recipes(*)
        `)
        .eq("user_id", user.id)
        .eq("week_start_date", weekStartDate);

      if (!weekMealPlans || weekMealPlans.length === 0) {
        toast.error("No meal plan available for this week");
        return;
      }

      // Fetch user profile
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("full_name, diet_preference")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: nutritionSummary } = await supabase
        .from("user_nutrition_summary")
        .select("daily_calories, daily_protein, daily_carbs, daily_fats")
        .eq("user_id", user.id)
        .maybeSingle();

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      // Title
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Weekly Meal Plan", pageWidth / 2, 20, { align: "center" });

      // User info
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const weekStart = format(currentWeek, "MMM d, yyyy");
      const weekEnd = format(addDays(currentWeek, 6), "MMM d, yyyy");
      doc.text(`${weekStart} - ${weekEnd}`, pageWidth / 2, 28, { align: "center" });
      
      if (profile?.full_name) {
        doc.text(`Prepared for: ${profile.full_name}`, 14, 38);
      }
      if (profile?.diet_preference) {
        doc.text(`Diet: ${profile.diet_preference === "veg" ? "Vegetarian" : profile.diet_preference === "non_veg" ? "Non-Vegetarian" : "All"}`, 14, 44);
      }

      let yPos = 52;

      // Daily targets
      if (nutritionSummary) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Daily Targets:", 14, yPos);
        yPos += 6;
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Calories: ${nutritionSummary.daily_calories || "N/A"} | Protein: ${nutritionSummary.daily_protein || "N/A"}g | Carbs: ${nutritionSummary.daily_carbs || "N/A"}g | Fats: ${nutritionSummary.daily_fats || "N/A"}g`, 14, yPos);
        yPos += 10;
      }

      // Group meals by day
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      
      for (const day of daysOfWeek) {
        const dayMeals = weekMealPlans.filter((m: any) => m.day_of_week === day);
        
        if (dayMeals.length === 0) continue;

        // Check if we need a new page
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(day, 14, yPos);
        yPos += 8;

        const tableData = dayMeals.map((meal: any) => [
          meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1),
          meal.recipe?.title || "N/A",
          meal.recipe?.calories || "N/A",
          `${meal.recipe?.protein || 0}g`,
          `${meal.recipe?.carbs || 0}g`,
          `${meal.recipe?.fats || 0}g`,
        ]);

        autoTable(doc, {
          startY: yPos,
          head: [["Meal", "Recipe", "Cal", "Protein", "Carbs", "Fats"]],
          body: tableData,
          theme: "grid",
          headStyles: { fillColor: [79, 70, 229] },
          margin: { left: 14, right: 14 },
          styles: { fontSize: 9 },
        });

        yPos = (doc as any).lastAutoTable.finalY + 10;
      }

      // Weekly summary
      const totalWeeklyCalories = weekMealPlans.reduce((sum: number, m: any) => sum + (m.recipe?.calories || 0), 0);
      const totalWeeklyProtein = weekMealPlans.reduce((sum: number, m: any) => sum + (m.recipe?.protein || 0), 0);
      const totalWeeklyCarbs = weekMealPlans.reduce((sum: number, m: any) => sum + (m.recipe?.carbs || 0), 0);
      const totalWeeklyFats = weekMealPlans.reduce((sum: number, m: any) => sum + (m.recipe?.fats || 0), 0);

      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Weekly Summary", 14, yPos);
      yPos += 8;

      autoTable(doc, {
        startY: yPos,
        head: [["Nutrient", "Total", "Daily Avg"]],
        body: [
          ["Calories", totalWeeklyCalories.toString(), Math.round(totalWeeklyCalories / 7).toString()],
          ["Protein", `${totalWeeklyProtein}g`, `${Math.round(totalWeeklyProtein / 7)}g`],
          ["Carbs", `${totalWeeklyCarbs}g`, `${Math.round(totalWeeklyCarbs / 7)}g`],
          ["Fats", `${totalWeeklyFats}g`, `${Math.round(totalWeeklyFats / 7)}g`],
        ],
        theme: "grid",
        headStyles: { fillColor: [79, 70, 229] },
        margin: { left: 14, right: 14 },
        styles: { fontSize: 10 },
      });

      doc.save(`meal-plan-${format(currentWeek, "yyyy-MM-dd")}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

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
              <Button onClick={generateWeeklyPDF} className="gap-2">
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
                            ? "bg-muted/50 text-muted-foreground scale-95 hover:bg-muted hover:scale-100"
                            : "bg-card border border-border hover:border-primary hover:bg-accent hover:scale-100 text-foreground"
                        }
                      `}
                    >
                      <div className="text-sm font-medium">{d}</div>
                      <div className="text-xs mt-1">{format(addDays(currentWeek, i), "MMM d")}</div>
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
              {initialLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-3 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {[1, 2, 3, 4].map((j) => (
                          <Skeleton key={j} className="h-12 w-full" />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 flex-1" />
                      </div>
                    </div>
                  ))}
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
                          className={`p-3 rounded-lg border transition-all ${
                            isCompleted
                              ? "bg-primary/5 border-primary/30"
                              : "bg-card hover:bg-muted/20 border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{emoji}</span>
                              <div>
                                <h3 className="text-base font-semibold capitalize">{type}</h3>
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

                          <h4 className="text-sm font-medium mb-1">{recipe.title}</h4>

                          <div className="grid grid-cols-4 gap-2 mb-3">
                            <div className="text-center p-2 rounded bg-background/50">
                              <div className="text-sm font-bold text-primary">{recipe.calories}</div>
                              <div className="text-[10px] text-muted-foreground">Cal</div>
                            </div>
                            <div className="text-center p-2 rounded bg-background/50">
                              <div className="text-sm font-bold text-primary">{recipe.protein}g</div>
                              <div className="text-[10px] text-muted-foreground">Protein</div>
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
                              <Button variant="outline" size="sm" className="w-full gap-1 text-xs h-8">
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
                              className="gap-1 text-xs h-8"
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
                              className="flex-1 gap-1 text-xs h-8"
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
        onConfirm={async (notes) => {
          if (selectedMilestone && user) {
            // Add milestone
            addMilestone(selectedMilestone.date, selectedMilestone.mealType || undefined, notes);
            
            // Also create a meal log entry if meal type is specified
            if (selectedMilestone.mealType) {
              // Find the meal plan entry for this day and meal type
              const dayMeals = mealPlan.filter((entry) => entry.day_of_week === daysOfWeek[currentDayIndex]);
              const mealEntry = dayMeals.find((m) => m.meal_type === selectedMilestone.mealType);
              
              if (mealEntry?.recipe) {
                try {
                  // Create a meal log entry with the selected date
                  const { error } = await supabase.from("meal_logs").insert({
                    user_id: user.id,
                    // Store date as YYYY-MM-DD string so Dashboard can match it correctly
                    log_date: format(selectedMilestone.date, "yyyy-MM-dd"),
                    meal_type: selectedMilestone.mealType,
                    recipe_id: mealEntry.recipe.id,
                    custom_meal_name: mealEntry.recipe.title,
                    calories: mealEntry.recipe.calories,
                    protein: mealEntry.recipe.protein,
                    carbs: mealEntry.recipe.carbs,
                    fats: mealEntry.recipe.fats,
                  });
                  
                  if (error) throw error;
                  
                  // Show appropriate message based on whether the logged date is today
                  const loggedDate = format(new Date(selectedMilestone.date), "yyyy-MM-dd");
                  const todayDate = format(new Date(), "yyyy-MM-dd");
                  
                  if (loggedDate === todayDate) {
                    toast.success("Meal logged and will appear in your Dashboard!");
                  } else {
                    toast.success(`Meal logged for ${format(new Date(selectedMilestone.date), "EEEE, MMM d")}. It will appear in your Dashboard on that day.`);
                  }
                } catch (error) {
                  console.error("Error logging meal:", error);
                  toast.error("Failed to log meal");
                }
              }
            }
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
