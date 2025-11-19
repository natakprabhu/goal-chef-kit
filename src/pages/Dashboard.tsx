import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import YouTubeModal from "@/components/YouTubeModal";
import HealthNews from "@/components/HealthNews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, Heart, ChefHat, Play } from "lucide-react";

const Dashboard = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  // Mock data - will be replaced with real data later
  const dailyCalories = { consumed: 1420, target: 2200 };
  const macros = {
    protein: { consumed: 95, target: 165 },
    carbs: { consumed: 160, target: 248 },
    fats: { consumed: 45, target: 73 }
  };

  const calorieProgress = (dailyCalories.consumed / dailyCalories.target) * 100;

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
                <Link to="/planner">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Meal Plan
                  </Button>
                </Link>
                <Link to="/recipes">
                  <Button className="w-full justify-start" variant="outline">
                    <ChefHat className="mr-2 h-4 w-4" />
                    Browse Recipes
                  </Button>
                </Link>
                <Link to="/favorites">
                  <Button className="w-full justify-start" variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
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
                <CardTitle>Today's Meals</CardTitle>
                <CardDescription>Track what you've eaten today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No meals logged yet. Start by browsing our <Link to="/recipes" className="text-primary hover:underline">recipe collection</Link>.
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
    </div>
  );
};

export default Dashboard;
