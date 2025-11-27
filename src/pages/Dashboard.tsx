import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import HealthNews from "@/components/HealthNews";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, TrendingUp, Heart, ChefHat, Trash2, Clock, CheckCircle2, Info, NotebookPen } from "lucide-react";
import { useMealLogs } from "@/hooks/useMealLogs";
import { LogMealDialog } from "@/components/LogMealDialog";
import { LogWeightDialog } from "@/components/LogWeightDialog";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

// --- CUSTOM NEON PROGRESS COMPONENT ---
const NeonProgress = ({ 
  value, 
  max = 100, 
  colorClass = "from-cyan-500 to-blue-500", 
  glowColor = "#06b6d4",
  height = "h-4"
}: { 
  value: number; 
  max: number; 
  colorClass?: string; 
  glowColor?: string;
  height?: string;
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <>
      {/* Inject animation styles locally so no tailwind.config changes are needed */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s linear infinite;
          }
        `}
      </style>
      <div className="relative w-full">
        <div className={`${height} w-full overflow-hidden rounded-full bg-slate-900/10 border border-slate-500/20`}>
          <div
            className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out relative`}
            style={{ 
              width: `${percentage}%`,
              boxShadow: `0 0 15px ${glowColor}, 0 0 5px ${glowColor}` // The Neon Glow
            }}
          >
            {/* The Fluctuating Energy Flow */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            {/* Spark at the tip */}
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white shadow-[0_0_10px_white] opacity-80"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const isToday = formattedDate === format(new Date(), "yyyy-MM-dd");
  
  const { mealLogs, loading: logsLoading, deleteMealLog, refetch } = useMealLogs(formattedDate);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [weightDialogOpen, setWeightDialogOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack" | "snack2">("breakfast");

  // Refetch meal logs logic
  useEffect(() => {
    refetch();
    const handleVisibilityChange = () => {
      if (!document.hidden) refetch();
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

  // Smart Next Meal Logic
  const mealTimes = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const sortedLogs = [...mealLogs].sort((a, b) => 
      new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime()
    );
    
    const lastMeal = sortedLogs.length > 0 ? new Date(sortedLogs[sortedLogs.length - 1].logged_at) : null;
    
    const hasBreakfast = mealLogs.some(m => m.meal_type === "breakfast");
    const hasLunch = mealLogs.some(m => m.meal_type === "lunch");

    let nextMealType = "Snack"; 
    if (currentHour < 11 && !hasBreakfast) nextMealType = "Breakfast";
    else if (currentHour < 14 && !hasLunch) nextMealType = "Lunch";
    else if (currentHour < 19 && !mealLogs.some(m => m.meal_type === "dinner")) nextMealType = "Dinner";
    else if (hasLunch && currentHour < 18) nextMealType = "Evening Snack";

    return {
      current: format(now, "h:mm a"),
      last: lastMeal ? format(lastMeal, "h:mm a") : "No meals yet",
      next: nextMealType
    };
  }, [mealLogs]);

  const handleLogMeal = (mealType: "breakfast" | "lunch" | "dinner" | "snack" | "snack2") => {
    setSelectedMealType(mealType);
    setLogDialogOpen(true);
  };

  // Helper to make the meal cards look nicer
  const getMealTypeStyles = (type: string) => {
    const styles = {
      breakfast: "border-orange-200 bg-orange-50/50 hover:border-orange-300",
      lunch: "border-green-200 bg-green-50/50 hover:border-green-300",
      dinner: "border-blue-200 bg-blue-50/50 hover:border-blue-300",
      snack: "border-purple-200 bg-purple-50/50 hover:border-purple-300",
      snack2: "border-pink-200 bg-pink-50/50 hover:border-pink-300",
    };
    return styles[type as keyof typeof styles] || "border-gray-200";
  };

  const getMealIcon = (type: string) => {
    const icons: Record<string, string> = {
      breakfast: '🍳', lunch: '🍱', dinner: '🍽️', snack: '🍎', snack2: '🥤'
    };
    return icons[type] || '🍴';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <SEO 
        title="Dashboard - GoalChef"
        description="Track your daily meals, calories, and macros. Monitor your nutrition goals and progress in one place."
        url="https://goalchef.in/dashboard"
        noindex={true}
      />
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: "Dashboard" }]} />
          
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
                    className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
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
                <>Viewing today's meals and progress.</>
              ) : (
                <>Viewing meals for {format(selectedDate, "MMMM d, yyyy")}. Switch to today to see current progress.</>
              )}
            </AlertDescription>
          </Alert>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Calorie Tracker - Large Card */}
            <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {isToday ? "Today's" : format(selectedDate, "MMM d")} Calorie Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Calories</span>
                    <span className="text-sm font-medium">
                      {dailyCalories.consumed} / {dailyCalories.target} kcal
                    </span>
                  </div>
                  {/* NEON PROGRESS BAR (Main) */}
                  <NeonProgress 
                    value={dailyCalories.consumed} 
                    max={dailyCalories.target}
                    colorClass="from-orange-500 via-red-500 to-orange-600" 
                    glowColor="rgba(249, 115, 22, 0.5)"
                    height="h-5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 p-3 bg-background/50 rounded-lg border">
                    <div className="text-xs text-muted-foreground">Last Meal</div>
                    <div className="text-lg font-semibold">{mealTimes.last}</div>
                  </div>
                  <div className="space-y-1 p-3 bg-background/50 rounded-lg border">
                    <div className="text-xs text-muted-foreground">Next Meal</div>
                    <div className="text-lg font-semibold">{mealTimes.next}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {Object.entries(macros).map(([name, values]) => (
                    <div key={name} className="text-center p-2">
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
                  className="w-full justify-start gap-2 bg-gradient-to-r from-destructive to-red-600 hover:opacity-90 shadow-md"
                  onClick={() => setWeightDialogOpen(true)}
                >
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </div>
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

          {/* Macro Breakdown (Neon Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-blue-200/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-600">Protein</CardTitle>
                <CardDescription>{macros.protein.consumed}g / {macros.protein.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <NeonProgress 
                  value={macros.protein.consumed} 
                  max={macros.protein.target} 
                  colorClass="from-blue-500 to-indigo-600"
                  glowColor="rgba(59, 130, 246, 0.5)"
                />
              </CardContent>
            </Card>

            <Card className="border-emerald-200/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-600">Carbs</CardTitle>
                <CardDescription>{macros.carbs.consumed}g / {macros.carbs.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <NeonProgress 
                  value={macros.carbs.consumed} 
                  max={macros.carbs.target} 
                  colorClass="from-emerald-400 to-green-600"
                  glowColor="rgba(16, 185, 129, 0.5)"
                />
              </CardContent>
            </Card>

            <Card className="border-purple-200/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-purple-600">Fats</CardTitle>
                <CardDescription>{macros.fats.consumed}g / {macros.fats.target}g</CardDescription>
              </CardHeader>
              <CardContent>
                <NeonProgress 
                  value={macros.fats.consumed} 
                  max={macros.fats.target} 
                  colorClass="from-purple-500 to-pink-600"
                  glowColor="rgba(168, 85, 247, 0.5)"
                />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Health News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-t-4 border-t-primary">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
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
                    const cardStyle = getMealTypeStyles(mealType); // Using the helper function here
                    
                    return (
                      <Card key={mealType} className={`overflow-hidden transition-all ${hasLogged ? `${cardStyle} shadow-sm` : 'border-dashed border-gray-200 opacity-70 hover:opacity-100'}`}>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm`}>
                                {hasLogged ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                  <span className="text-xl">{getMealIcon(mealType)}</span>
                                )}
                              </div>
                               <div>
                                <h4 className="font-semibold capitalize text-base">
                                  {mealType === 'snack2' ? 'Snack 2' : mealType}
                                </h4>
                                {hasLogged ? (
                                  <p className="text-sm font-medium text-foreground/80">{totalCalories} cal logged</p>
                                ) : (
                                  <p className="text-sm text-muted-foreground">Not logged yet</p>
                                )}
                              </div>
                            </div>
                            <Button 
                              size="sm"
                              variant={hasLogged ? "outline" : "default"}
                              onClick={() => handleLogMeal(mealType)}
                              className={hasLogged ? "bg-white hover:bg-gray-50" : ""}
                            >
                              {hasLogged ? 'Add More' : 'Log Meal'}
                            </Button>
                          </div>
                          
                          {mealsForType.length > 0 && (
                            <div className="space-y-2 pt-3 border-t border-gray-200/50">
                              {mealsForType.map((meal) => (
                                  <div key={meal.id} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="font-medium text-foreground">
                                        {meal.custom_meal_name || 'Logged Meal'}
                                      </span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold">{meal.calories} cal</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
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
