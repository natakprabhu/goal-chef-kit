import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Eye } from "lucide-react";
import { useMilestones } from "@/hooks/useMilestones";
import { MilestoneDialog } from "@/components/MilestoneDialog";
import { format, addDays, startOfWeek } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Planner = () => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<{ date: string; mealType?: string; mealName?: string }>();
  const [showVeg, setShowVeg] = useState(true);
  const [showNonVeg, setShowNonVeg] = useState(true);
  
  const { addMilestone, hasMilestone } = useMilestones();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Mock meal plan data for all 7 days
  const allMeals = {
    Monday: {
      breakfast: { name: "Greek Yogurt Parfait", calories: 310, protein: 24, type: "veg", id: "1" },
      lunch: { name: "Grilled Chicken & Quinoa Bowl", calories: 485, protein: 42, type: "non_veg", id: "2" },
      dinner: { name: "Salmon with Roasted Vegetables", calories: 520, protein: 38, type: "non_veg", id: "3" },
    },
    Tuesday: {
      breakfast: { name: "Protein Oatmeal", calories: 380, protein: 28, type: "veg", id: "4" },
      lunch: { name: "Turkey & Sweet Potato Hash", calories: 450, protein: 35, type: "non_veg", id: "5" },
      dinner: { name: "Beef Stir-Fry with Broccoli", calories: 495, protein: 40, type: "non_veg", id: "6" },
    },
    Wednesday: {
      breakfast: { name: "Veggie Omelette", calories: 320, protein: 22, type: "veg", id: "7" },
      lunch: { name: "Lentil Curry with Brown Rice", calories: 420, protein: 18, type: "veg", id: "8" },
      dinner: { name: "Grilled Fish with Asparagus", calories: 480, protein: 42, type: "non_veg", id: "9" },
    },
    Thursday: {
      breakfast: { name: "Smoothie Bowl", calories: 340, protein: 20, type: "veg", id: "10" },
      lunch: { name: "Chicken Caesar Salad", calories: 460, protein: 38, type: "non_veg", id: "11" },
      dinner: { name: "Tofu Stir-Fry", calories: 390, protein: 25, type: "veg", id: "12" },
    },
    Friday: {
      breakfast: { name: "Avocado Toast with Eggs", calories: 360, protein: 18, type: "veg", id: "13" },
      lunch: { name: "Shrimp & Veggie Bowl", calories: 440, protein: 36, type: "non_veg", id: "14" },
      dinner: { name: "Vegetable Lasagna", calories: 520, protein: 22, type: "veg", id: "15" },
    },
    Saturday: {
      breakfast: { name: "Protein Pancakes", calories: 380, protein: 26, type: "veg", id: "16" },
      lunch: { name: "Grilled Steak with Vegetables", calories: 550, protein: 45, type: "non_veg", id: "17" },
      dinner: { name: "Chickpea Curry", calories: 420, protein: 16, type: "veg", id: "18" },
    },
    Sunday: {
      breakfast: { name: "French Toast", calories: 400, protein: 20, type: "veg", id: "19" },
      lunch: { name: "Grilled Chicken Wrap", calories: 480, protein: 40, type: "non_veg", id: "20" },
      dinner: { name: "Baked Cod with Quinoa", calories: 460, protein: 38, type: "non_veg", id: "21" },
    },
  };

  const filteredMealPlan = useMemo(() => {
    const filtered: any = {};
    Object.entries(allMeals).forEach(([day, meals]) => {
      filtered[day] = {};
      Object.entries(meals).forEach(([mealType, meal]) => {
        if ((showVeg && meal.type === "veg") || (showNonVeg && meal.type === "non_veg")) {
          filtered[day][mealType] = meal;
        }
      });
      
      const dayMeals = Object.values(filtered[day]) as any[];
      filtered[day].total = {
        calories: dayMeals.reduce((sum, m) => sum + m.calories, 0),
        protein: dayMeals.reduce((sum, m) => sum + m.protein, 0),
      };
    });
    return filtered;
  }, [showVeg, showNonVeg]);

  const weeklyTarget = { calories: 2200, protein: 165 };

  const handleMilestoneClick = (date: string, mealType?: string, mealName?: string) => {
    setSelectedMilestone({ date, mealType, mealName });
    setMilestoneDialogOpen(true);
  };

  const handleMilestoneConfirm = (notes?: string) => {
    if (selectedMilestone) {
      addMilestone(selectedMilestone.date, selectedMilestone.mealType as any, notes);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                AI Meal Planner
              </h1>
              <p className="text-muted-foreground">Your personalized weekly meal plan</p>
            </div>
            <Button size="lg" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Generate New Week
            </Button>
          </div>

          {/* Week Navigation */}
          <Card className="mb-8 border-primary/20">
            <CardContent className="flex items-center justify-between py-6">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="text-center">
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <Calendar className="h-5 w-5 text-primary" />
                  Week of {format(currentWeek, "MMM d")} - {format(addDays(currentWeek, 6), "MMM d, yyyy")}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Target: {weeklyTarget.calories} kcal/day • {weeklyTarget.protein}g protein/day
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Diet Filter */}
          <Card className="mb-6 border-accent/20">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center space-x-2">
                  <Switch id="veg" checked={showVeg} onCheckedChange={setShowVeg} />
                  <Label htmlFor="veg" className="cursor-pointer">🥗 Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="non-veg" checked={showNonVeg} onCheckedChange={setShowNonVeg} />
                  <Label htmlFor="non-veg" className="cursor-pointer">🍗 Non-Vegetarian</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Plan Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {daysOfWeek.map((day, index) => {
              const dayDate = format(addDays(currentWeek, index), "yyyy-MM-dd");
              const meals = filteredMealPlan[day];
              const hasDayMilestone = hasMilestone(dayDate);
              
              return (
                <Card key={day} className="border-primary/20 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{day}</CardTitle>
                        {meals && (
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span>{meals.total?.calories || 0} kcal</span>
                            <span>•</span>
                            <span>{meals.total?.protein || 0}g protein</span>
                          </CardDescription>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant={hasDayMilestone ? "default" : "outline"}
                        onClick={() => handleMilestoneClick(dayDate)}
                        className="gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {hasDayMilestone ? "Completed" : "Mark Day"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {meals && Object.keys(meals).length > 1 ? (
                      <>
                        {["breakfast", "lunch", "dinner"].map((mealType) => {
                          const meal = meals[mealType];
                          if (!meal) return null;
                          
                          const hasMealMilestone = hasMilestone(dayDate, mealType);
                          
                          return (
                            <div
                              key={mealType}
                              className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10"
                            >
                              <Badge 
                                variant="outline" 
                                className={`mt-1 ${meal.type === "veg" ? "bg-green-500/10" : "bg-red-500/10"}`}
                              >
                                {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                              </Badge>
                              <div className="flex-1">
                                <h4 className="font-semibold">{meal.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {meal.calories} kcal • {meal.protein}g protein
                                </p>
                                <div className="flex gap-2 mt-2">
                                  <Link to={`/recipe/${meal.id}`}>
                                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                                      <Eye className="h-3 w-3" />
                                      View Recipe
                                    </Button>
                                  </Link>
                                  <Button
                                    size="sm"
                                    variant={hasMealMilestone ? "default" : "ghost"}
                                    className="h-7 text-xs gap-1"
                                    onClick={() => handleMilestoneClick(dayDate, mealType, meal.name)}
                                  >
                                    <CheckCircle2 className="h-3 w-3" />
                                    {hasMealMilestone ? "Done" : "Mark"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No meals match your current filter
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      
      <MilestoneDialog
        open={milestoneDialogOpen}
        onOpenChange={setMilestoneDialogOpen}
        onConfirm={handleMilestoneConfirm}
        mealName={selectedMilestone?.mealName}
      />
    </div>
  );
};

export default Planner;