import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const Planner = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Mock meal plan data
  const mealPlan = {
    Monday: {
      breakfast: { name: "Greek Yogurt Parfait", calories: 310, protein: 24 },
      lunch: { name: "Grilled Chicken & Quinoa Bowl", calories: 485, protein: 42 },
      dinner: { name: "Salmon with Roasted Vegetables", calories: 520, protein: 38 },
      total: { calories: 1315, protein: 104 }
    },
    Tuesday: {
      breakfast: { name: "Protein Oatmeal", calories: 380, protein: 28 },
      lunch: { name: "Turkey & Sweet Potato Hash", calories: 450, protein: 35 },
      dinner: { name: "Beef Stir-Fry with Broccoli", calories: 495, protein: 40 },
      total: { calories: 1325, protein: 103 }
    },
    // Other days would be similar...
  };

  const weeklyTarget = { calories: 2200, protein: 165 };

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
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="text-center">
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <Calendar className="h-5 w-5 text-primary" />
                  Week of Jan 20 - Jan 26, 2025
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Target: {weeklyTarget.calories} kcal/day • {weeklyTarget.protein}g protein/day
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Meal Plan Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(mealPlan).map(([day, meals]) => (
              <Card key={day} className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{day}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span>{meals.total.calories} kcal</span>
                    <span>•</span>
                    <span>{meals.total.protein}g protein</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Breakfast */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                    <Badge variant="outline" className="mt-1">Breakfast</Badge>
                    <div className="flex-1">
                      <p className="font-medium">{meals.breakfast.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {meals.breakfast.calories} kcal • {meals.breakfast.protein}g protein
                      </p>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-secondary/5 to-transparent border border-secondary/10">
                    <Badge variant="outline" className="mt-1">Lunch</Badge>
                    <div className="flex-1">
                      <p className="font-medium">{meals.lunch.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {meals.lunch.calories} kcal • {meals.lunch.protein}g protein
                      </p>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/5 to-transparent border border-accent/10">
                    <Badge variant="outline" className="mt-1">Dinner</Badge>
                    <div className="flex-1">
                      <p className="font-medium">{meals.dinner.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {meals.dinner.calories} kcal • {meals.dinner.protein}g protein
                      </p>
                    </div>
                  </div>

                  {/* Daily Summary */}
                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <span className="text-sm font-medium">Daily Total:</span>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant={meals.total.calories <= weeklyTarget.calories ? "default" : "destructive"}>
                        {meals.total.calories} / {weeklyTarget.calories} kcal
                      </Badge>
                      <Badge variant="secondary">
                        {meals.total.protein}g protein
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for remaining days */}
          {daysOfWeek.slice(2).map((day) => (
            <Card key={day} className="border-dashed border-primary/30 mt-6">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">{day} - No meals planned yet</p>
                <Button variant="outline">Add Meals</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Planner;
