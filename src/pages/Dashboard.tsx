import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HealthNews from "@/components/HealthNews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar as CalendarIcon, TrendingUp, Heart, ChefHat, Plus, Trash2, Clock, CheckCircle2, Scale, Info,NotebookPen } from "lucide-react";
import { useMealLogs } from "@/hooks/useMealLogs";
import { LogMealDialog } from "@/components/LogMealDialog";
import { LogWeightDialog } from "@/components/LogWeightDialog";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const isToday = formattedDate === format(new Date(), "yyyy-MM-dd");
  
  const { mealLogs, loading: logsLoading, deleteMealLog, refetch } = useMealLogs(formattedDate);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [weightDialogOpen, setWeightDialogOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack" | "snack2">("breakfast");

  // Refetch meal logs when dashboard loads or becomes visible
  useEffect(() => {
    refetch();
    
    // Also refetch when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch]);

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
    const currentHour = now.getHours();
    const sortedLogs = [...mealLogs].sort((a, b) => 
      new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime()
    );
    
    const lastMeal = sortedLogs.length > 0 ? new Date(sortedLogs[sortedLogs.length - 1].logged_at) : null;
    
    // Determine next meal based on current time and what's been logged
    let nextMealType = "dinner";
    if (currentHour < 12 && !mealLogs.some(m => m.meal_type === "breakfast")) {
      nextMealType = "breakfast";
    } else if (currentHour < 17 && !mealLogs.some(m => m.meal_type === "lunch")) {
      nextMealType = "lunch";
    }

    return {
      current: format(now, "h:mm a"),
      last: lastMeal ? format(lastMeal, "h:mm a") : "No meals yet",
      next: nextMealType.charAt(0).toUpperCase() + nextMealType.slice(1)
    };
  }, [mealLogs]);

  const handleLogMeal = (mealType: "breakfast" | "lunch" | "dinner" | "snack" | "snack2") => {
    setSelectedMealType(mealType);
    setLogDialogOpen(true);
  };

  const getMealTypeColor = (type: string) => {
    const colors = {
      breakfast: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      lunch: "bg-green-500/10 text-green-600 border-green-500/20",
      dinner: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      snack: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      snack2: "bg-pink-500/10 text-pink-600 border-pink-500/20",
    };
    return colors[type as keyof typeof colors] || "bg-gray-500/10";
  };

  const getMealIcon = (type: string) => {
    const icons: Record<string, string> = {
      breakfast: '🍳',
      lunch: '🍱', 
      dinner: '🍽️',
      snack: '🍎',
      snack2: '🥤'
    };
    return icons[type] || '🍴';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground">Track your progress and stay on target</p>
            </div>
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    {isToday && <Badge variant="secondary" className="ml-2">Today</Badge>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-lg font-semibold text-foreground">{mealTimes.current}</span>
              </div>
            </div>
          </div>
          
          {/* Date Info Alert */}
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {isToday ? (
                <>Viewing today's meals and progress. Meals logged in your planner will appear on their scheduled dates.</>
              ) : (
                <>Viewing meals for {format(selectedDate, "MMMM d, yyyy")}. Switch to today to see current progress.</>
              )}
            </AlertDescription>
          </Alert>
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Calorie Tracker - Large Card */}
            <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {isToday ? "Today's" : format(selectedDate, "MMM d")} Calorie Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Calories</span>
                    <span className="text-sm font-medium">
                      {dailyCalories.consumed} / {dailyCalories.target} kcal
                    </span>
                  </div>
                  <Progress value={calorieProgress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Last Meal</div>
                    <div className="text-lg font-semibold">{mealTimes.last}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Next Meal</div>
                    <div className="text-lg font-semibold">{mealTimes.next}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {Object.entries(macros).map(([name, values]) => (
                    <div key={name} className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </div>
                      <div className="text-2xl font-bold">{values.consumed}g</div>
                      <div className="text-xs text-muted-foreground">/ {values.target}g</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start gap-2 bg-gradient-to-r from-destructive to-red-600 hover:opacity-90 animate-pulse"
                  onClick={() => setWeightDialogOpen(true)}
                >
                  <Plus className="h-5 w-5" />                  
                  Log Today's Weight
                </Button>
                <Link to="/planner" className="block">
                  <Button className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-primary-light hover:opacity-90">
                    <NotebookPen className="h-4 w-4" />
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
                <Progress 
                  value={(macros.protein.consumed / macros.protein.target) * 100} 
                  className="h-3 border-primary/30" 
                  indicatorClassName="bg-primary"
                />
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-lg">Carbs</CardTitle>
                <CardDescription>{macros.carbs.consumed}g / {macros.carbs.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={(macros.carbs.consumed / macros.carbs.target) * 100} 
                  className="h-3 border-secondary/30" 
                  indicatorClassName="bg-secondary"
                />
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Fats</CardTitle>
                <CardDescription>{macros.fats.consumed}g / {macros.fats.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={(macros.fats.consumed / macros.fats.target) * 100} 
                  className="h-3 border-accent/30" 
                  indicatorClassName="bg-accent"
                />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Health News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  {isToday ? "Today's" : format(selectedDate, "MMM d")} Meals
                </CardTitle>
                <CardDescription>Track your meals from recipes or custom entries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid gap-4">
                  {(["breakfast", "lunch", "dinner", "snack", "snack2"] as const).map((mealType) => {
                    const mealsForType = mealLogs.filter(m => m.meal_type === mealType);
                    const totalCalories = mealsForType.reduce((sum, m) => sum + m.calories, 0);
                    const hasLogged = mealsForType.length > 0;
                    
                    return (
                      <Card key={mealType} className={`overflow-hidden transition-all ${hasLogged ? 'border-green-500/50 bg-green-500/5' : ''}`}>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                hasLogged ? 'bg-green-500/20' : 'bg-muted'
                              }`}>
                                {hasLogged ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                  <span className="text-xl">
                                    {getMealIcon(mealType)}
                                  </span>
                                )}
                              </div>
                               <div>
                                <h4 className="font-semibold capitalize text-base">
                                  {mealType === 'snack2' ? 'Snack 2' : mealType}
                                </h4>
                                {hasLogged ? (
                                  <p className="text-sm text-green-600 font-medium">{totalCalories} cal logged</p>
                                ) : (
                                  <p className="text-sm text-muted-foreground">Not logged yet</p>
                                )}
                              </div>
                            </div>
                            <Button 
                              size="sm"
                              variant={hasLogged ? "outline" : "default"}
                              onClick={() => handleLogMeal(mealType)}
                            >
                              {hasLogged ? 'Add More' : 'Log Meal'}
                            </Button>
                          </div>
                          
                          {mealsForType.length > 0 && (
                            <div className="space-y-2 pt-3 border-t">
                              {mealsForType.map((meal) => (
                                <div key={meal.id} className="space-y-1">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-foreground">
                                      {meal.custom_meal_name || meal.recipe_id ? 'Logged Meal' : 'Custom Meal'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold">{meal.calories} cal</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={() => deleteMealLog(meal.id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex gap-3 text-xs text-muted-foreground">
                                    <span>P: {meal.protein}g</span>
                                    <span>C: {meal.carbs}g</span>
                                    <span>F: {meal.fats}g</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
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
        date={formattedDate}
        onMealLogged={refetch}
      />

      <LogWeightDialog
        open={weightDialogOpen}
        onOpenChange={setWeightDialogOpen}
        onWeightLogged={() => {}}
      />
    </div>
  );
};

export default Dashboard;
