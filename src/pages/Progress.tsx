import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react";

const Progress = () => {
  // Mock progress data
  const stats = {
    currentWeight: 82.5,
    startWeight: 88.0,
    goalWeight: 75.0,
    weightChange: -5.5,
    daysActive: 42,
    mealsLogged: 126,
    calorieStreak: 7
  };

  const weeklyData = [
    { week: "Week 1", weight: 88.0, avgCalories: 2150 },
    { week: "Week 2", weight: 87.2, avgCalories: 2100 },
    { week: "Week 3", weight: 86.5, avgCalories: 2180 },
    { week: "Week 4", weight: 85.8, avgCalories: 2120 },
    { week: "Week 5", weight: 84.9, avgCalories: 2090 },
    { week: "Week 6", weight: 82.5, avgCalories: 2140 }
  ];

  const achievements = [
    { title: "7-Day Streak", description: "Hit your calorie target 7 days in a row", unlocked: true },
    { title: "First 5kg Lost", description: "Lost your first 5 kilograms", unlocked: true },
    { title: "30-Day Journey", description: "Stayed consistent for 30 days", unlocked: true },
    { title: "Meal Prep Master", description: "Log 100 meals", unlocked: true },
    { title: "10kg Milestone", description: "Lose 10 kilograms", unlocked: false },
    { title: "90-Day Warrior", description: "Stay active for 90 days", unlocked: false }
  ];

  const progressPercentage = ((stats.startWeight - stats.currentWeight) / (stats.startWeight - stats.goalWeight)) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <SEO 
        title="My Progress - GoalChef"
        description="Track your fitness journey with detailed progress metrics, weight tracking, and achievement milestones."
        url="https://goalchef.vercel.app/my-progress"
        noindex={true}
      />
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Your Progress
            </h1>
            <p className="text-muted-foreground">Track your fitness journey and celebrate achievements</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="pb-2">
                <CardDescription>Current Weight</CardDescription>
                <CardTitle className="text-4xl">{stats.currentWeight} kg</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <TrendingDown className="h-4 w-4" />
                  {Math.abs(stats.weightChange)} kg lost
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader className="pb-2">
                <CardDescription>Goal Weight</CardDescription>
                <CardTitle className="text-4xl">{stats.goalWeight} kg</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  {(stats.currentWeight - stats.goalWeight).toFixed(1)} kg to go
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader className="pb-2">
                <CardDescription>Progress</CardDescription>
                <CardTitle className="text-4xl">{progressPercentage.toFixed(0)}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  On track to goal
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary-light/20">
              <CardHeader className="pb-2">
                <CardDescription>Current Streak</CardDescription>
                <CardTitle className="text-4xl">{stats.calorieStreak}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  days on target
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts & Details */}
          <Tabs defaultValue="weight" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="calories">Calories</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="weight" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Your weight trend over the past 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                        <div>
                          <p className="font-medium">{data.week}</p>
                          <p className="text-2xl font-bold text-primary">{data.weight} kg</p>
                        </div>
                        {index > 0 && (
                          <Badge variant={weeklyData[index - 1].weight > data.weight ? "default" : "secondary"}>
                            {weeklyData[index - 1].weight > data.weight ? '-' : '+'}{Math.abs(weeklyData[index - 1].weight - data.weight).toFixed(1)} kg
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calorie Tracking</CardTitle>
                  <CardDescription>Average daily calories over the past 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-secondary/5 to-transparent border border-secondary/10">
                        <div>
                          <p className="font-medium">{data.week}</p>
                          <p className="text-2xl font-bold text-secondary">{data.avgCalories} kcal</p>
                        </div>
                        <Badge variant={data.avgCalories <= 2200 ? "default" : "outline"}>
                          {data.avgCalories <= 2200 ? 'On Target' : 'Above Target'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones you've reached on your journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-primary/10 to-transparent border-primary/30' 
                            : 'bg-muted/30 border-muted'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                            <Award className={`h-5 w-5 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${!achievement.unlocked && 'text-muted-foreground'}`}>
                              {achievement.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                            {achievement.unlocked && (
                              <Badge variant="default" className="mt-2">Unlocked</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Progress;
