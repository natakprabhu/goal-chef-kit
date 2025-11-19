import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, Eye, Clock, Flame, RefreshCw } from "lucide-react";
import { useMilestones } from "@/hooks/useMilestones";
import { useMealPlan } from "@/hooks/useMealPlan";
import { MilestoneDialog } from "@/components/MilestoneDialog";
import { MealPlanGenerator } from "@/components/MealPlanGenerator";
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
  const [refreshKey, setRefreshKey] = useState(0);

  const weekStartDate = format(currentWeek, "yyyy-MM-dd");
  const { mealPlan, loading } = useMealPlan(weekStartDate + `-${refreshKey}`);
  const { addMilestone, hasMilestone } = useMilestones();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const day = daysOfWeek[currentDayIndex];
  const dayDate = format(addDays(currentWeek, currentDayIndex), "yyyy-MM-dd");

  useEffect(() => {
    const fetchUserPreference = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("user_profiles")
        .select("diet_preference")
        .eq("user_id", user.id)
        .single();

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
              <MealPlanGenerator />
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
                          className={`p-6 rounded-xl border-2 transition-all ${
                            isCompleted
                              ? "bg-primary/5 border-primary/30"
                              : "bg-card hover:bg-muted/30 border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{emoji}</span>
                              <div>
                                <h3 className="text-xl font-semibold capitalize">{type}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {recipe.cook_time ? `${recipe.cook_time} min` : "Quick prep"}
                                </p>
                              </div>
                            </div>
                            {isCompleted && (
                              <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>

                          <div className="mb-4">
                            <h4 className="text-lg font-medium mb-2">{recipe.title}</h4>
                            <p className="text-muted-foreground text-sm">{recipe.description}</p>
                          </div>

                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 rounded-lg bg-background/50">
                              <div className="text-2xl font-bold text-primary">{recipe.calories}</div>
                              <div className="text-xs text-muted-foreground">Calories</div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-background/50">
                              <div className="text-2xl font-bold text-primary">{recipe.protein}g</div>
                              <div className="text-xs text-muted-foreground">Protein</div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-background/50">
                              <div className="text-2xl font-bold text-primary">{recipe.carbs}g</div>
                              <div className="text-xs text-muted-foreground">Carbs</div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-background/50">
                              <div className="text-2xl font-bold text-primary">{recipe.fats}g</div>
                              <div className="text-xs text-muted-foreground">Fats</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link to={`/recipe/${recipe.id}`} className="flex-1">
                              <Button variant="outline" className="w-full gap-2">
                                <Eye className="h-4 w-4" />
                                View Recipe
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSwapData({ recipe, mealType: type, day });
                                setSwapDialogOpen(true);
                              }}
                              className="gap-2"
                            >
                              <RefreshCw className="h-4 w-4" />
                              Swap
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedMilestone({ date: dayDate, mealType: type, mealName: recipe.title });
                                setMilestoneDialogOpen(true);
                              }}
                              disabled={isCompleted}
                              className="flex-1 gap-2"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              {isCompleted ? "Completed" : "Mark Complete"}
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
          onSwapComplete={() => setRefreshKey(prev => prev + 1)}
        />
      )}
    </div>
  );
};

export default PlannerNew;
