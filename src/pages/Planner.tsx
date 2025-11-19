import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Eye } from "lucide-react";
import { useMilestones } from "@/hooks/useMilestones";
import { MilestoneDialog } from "@/components/MilestoneDialog";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock detailed meal data - replace with real data from database
const getMealData = (id: string) => {
  const meals: any = {
    "1": { name: "Greek Yogurt Parfait", description: "Creamy Greek yogurt with berries", ingredients: ["200g Greek yogurt", "50g granola"], instructions: ["Layer ingredients"], prep_time: 5, difficulty: "easy" },
    // Add all 21 meals here with full details
  };
  return meals[id];
};

const Planner = () => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<{ date: string; mealType?: string; mealName?: string }>();
  const [showVeg, setShowVeg] = useState(true);
  const [showNonVeg, setShowNonVeg] = useState(true);
  
  const { addMilestone, hasMilestone } = useMilestones();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const allMeals: any = {
    Monday: {
      breakfast: { name: "Greek Yogurt Parfait", calories: 310, protein: 24, type: "veg", id: "1" },
      lunch: { name: "Grilled Chicken Bowl", calories: 485, protein: 42, type: "non_veg", id: "2" },
      dinner: { name: "Salmon with Vegetables", calories: 520, protein: 38, type: "non_veg", id: "3" },
    },
    // Add other days...
  };

  const day = daysOfWeek[currentDayIndex];
  const dayDate = format(addDays(currentWeek, currentDayIndex), "yyyy-MM-dd");
  const meals = allMeals[day] || {};
  
  const filteredMeals = Object.entries(meals).reduce((acc: any, [mealType, meal]: any) => {
    if ((showVeg && meal.type === "veg") || (showNonVeg && meal.type === "non_veg")) {
      acc[mealType] = meal;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">AI Meal Planner</h1>
          
          {/* Day Carousel */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setCurrentDayIndex(Math.max(0, currentDayIndex - 1))}>
              <ChevronLeft />
            </Button>
            <div className="flex gap-2">
              {daysOfWeek.map((d, i) => (
                <button key={d} onClick={() => setCurrentDayIndex(i)} className={i === currentDayIndex ? "bg-primary text-white px-4 py-2 rounded" : "px-4 py-2"}>
                  {d.slice(0, 3)}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setCurrentDayIndex(Math.min(6, currentDayIndex + 1))}>
              <ChevronRight />
            </Button>
          </div>

          {/* Day Card with filters */}
          <Card>
            <CardHeader>
              <CardTitle>{day}</CardTitle>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Switch checked={showVeg} onCheckedChange={setShowVeg} />
                  <Label>🥗 Veg</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={showNonVeg} onCheckedChange={setShowNonVeg} />
                  <Label>🍗 Non-Veg</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(filteredMeals).map(([mealType, meal]: any) => (
                <div key={mealType} className="p-4 border rounded">
                  <h4>{meal.name}</h4>
                  <Link to={`/recipe/${meal.id}`}>
                    <Button size="sm" variant="secondary"><Eye className="h-3 w-3 mr-1" />View Recipe</Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <MilestoneDialog open={milestoneDialogOpen} onOpenChange={setMilestoneDialogOpen} onConfirm={() => {}} />
    </div>
  );
};

export default Planner;
