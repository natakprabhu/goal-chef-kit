import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HealthNews from "@/components/HealthNews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, Heart, ChefHat, Plus, Trash2, Clock } from "lucide-react";
import { useMealLogs } from "@/hooks/useMealLogs";
import { LogMealDialog } from "@/components/LogMealDialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Dashboard = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const { mealLogs, loading: logsLoading, deleteMealLog } = useMealLogs(today);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");

  const dailyTotals = useMemo(() => {
    return mealLogs.reduce(
      (acc, log) => ({
        calories: acc.calories + log.calories,
        protein: acc.protein + Number(log.protein),
        carbs: acc.carbs + Number(log.carbs),
        fats: acc.fats + Number(log.fats),
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [mealLogs]);

  const dailyCalories = { consumed: dailyTotals.calories, target: 2200 };
  const macros = {
    protein: { consumed: Math.round(dailyTotals.protein), target: 165 },
    carbs: { consumed: Math.round(dailyTotals.carbs), target: 248 },
    fats: { consumed: Math.round(dailyTotals.fats), target: 73 }
  };

  const calorieProgress = (dailyCalories.consumed / dailyCalories.target) * 100;

  const mealTimes = useMemo(() => {
    const now = new Date();
    const sortedLogs = [...mealLogs].sort((a, b) => 
      new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime()
    );
    
    const lastMeal = sortedLogs.length > 0 ? new Date(sortedLogs[sortedLogs.length - 1].logged_at) : null;
    const nextMeal = sortedLogs.find(log => new Date(log.logged_at) > now);

    return {
      current: format(now, "h:mm a"),
      last: lastMeal ? format(lastMeal, "h:mm a") : "No meals yet",
      next: nextMeal ? format(new Date(nextMeal.logged_at), "h:mm a") : "No upcoming meals"
    };
  }, [mealLogs]);

  const handleLogMeal = (mealType: "breakfast" | "lunch" | "dinner" | "snack") => {
    setSelectedMealType(mealType);
    setLogDialogOpen(true);
  };

  const getMealTypeColor = (type: string) => {
    const colors = {
      breakfast: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      lunch: "bg-green-500/10 text-green-600 border-green-500/20",
      dinner: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      snack: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    };
    return colors[type as keyof typeof colors] || "bg-gray-500/10";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground">Track your progress and stay on target</p>
            </div>
          </div>
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Calorie Tracker - Large Card */}
            <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Today's Calorie Progress
                </CardTitle>
                <CardDescription>You're doing great! Keep it up.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Current Time</p>
                      <p className="font-semibold">{mealTimes.current}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Last Meal</p>
                      <p className="font-semibold text-sm">{mealTimes.last}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Next Meal</p>
                      <p className="font-semibold text-sm">{mealTimes.next}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {dailyCalories.consumed}
                    </div>
                    <div className="text-2xl text-muted-foreground">
                      / {dailyCalories.target} kcal
                    </div>
                  </div>
                  <Progress value={calorieProgress} className="h-4" />
                  <div className="text-center text-sm text-muted-foreground">
                    {dailyCalories.target - dailyCalories.consumed} calories remaining
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/planner" className="block">
                  <Button className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-primary-light hover:opacity-90">
                    <Calendar className="h-4 w-4" />
                    View Meal Plan
                  </Button>
                </Link>
                <Link to="/recipes" className="block">
                  <Button className="w-full justify-start gap-2 bg-gradient-to-r from-secondary to-accent hover:opacity-90">
                    <ChefHat className="h-4 w-4" />
                    Browse Recipes
                  </Button>
                </Link>
                <Link to="/favorites" className="block">
                  <Button className="w-full justify-start gap-2 bg-gradient-to-r from-accent to-secondary hover:opacity-90">
                    <Heart className="h-4 w-4" />
                    My Favorites
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Macro Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Protein</CardTitle>
                <CardDescription>{macros.protein.consumed}g / {macros.protein.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(macros.protein.consumed / macros.protein.target) * 100} className="h-3" />
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-lg">Carbs</CardTitle>
                <CardDescription>{macros.carbs.consumed}g / {macros.carbs.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(macros.carbs.consumed / macros.carbs.target) * 100} className="h-3" />
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Fats</CardTitle>
                <CardDescription>{macros.fats.consumed}g / {macros.fats.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(macros.fats.consumed / macros.fats.target) * 100} className="h-3" />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Health News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Meals</CardTitle>
                    <CardDescription>Track what you've eaten today</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {(["breakfast", "lunch", "dinner", "snack"] as const).map((type) => (
                      <Button
                        key={type}
                        size="sm"
                        variant="outline"
                        onClick={() => handleLogMeal(type)}
                        className="gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        {type.charAt(0).toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {logsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading meals...</div>
                ) : mealLogs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No meals logged yet. Click buttons above to log meals or browse our{" "}
                    <Link to="/recipes" className="text-primary hover:underline">
                      recipe collection
                    </Link>
                    .
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mealLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Badge className={getMealTypeColor(log.meal_type)}>
                            {log.meal_type}
                          </Badge>
                          <div className="flex-1">
                            <p className="font-medium">
                              {log.custom_meal_name || "Recipe from collection"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {log.calories} kcal • {log.protein}g protein • {log.carbs}g carbs • {log.fats}g fats
                            </p>
                            {log.logged_at && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Logged at {format(new Date(log.logged_at), "h:mm a")}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteMealLog(log.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div>
              <HealthNews />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <LogMealDialog
        open={logDialogOpen}
        onOpenChange={setLogDialogOpen}
        mealType={selectedMealType}
        date={today}
      />
    </div>
  );
};

export default Dashboard;
