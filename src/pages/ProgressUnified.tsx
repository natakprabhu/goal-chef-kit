import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OnboardingForm from "@/components/OnboardingForm";
import HealthCard from "@/components/HealthCard";
import EditProfileDialog from "@/components/EditProfileDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Target, Award, Scale, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProgressEntries } from "@/hooks/useProgressEntries";
import { useMealLogs } from "@/hooks/useMealLogs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, subDays, startOfWeek, endOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProgressUnified = () => {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userGoal, setUserGoal] = useState<any>(null);
  const [dateRange, setDateRange] = useState("30"); // days
  const navigate = useNavigate();
  const { toast } = useToast();
  const { entries, getLatestEntry, getWeightChange } = useProgressEntries();
  const { mealLogs } = useMealLogs();

  useEffect(() => {
    checkAuthAndOnboarding();
  }, []);

  const checkAuthAndOnboarding = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/sign-in");
        return;
      }

      setUserId(user.id);

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      setUserProfile(profile);
      setHasOnboarded(profile?.has_onboarded || false);

      // Fetch user goal
      if (profile?.has_onboarded) {
        const { data: goal } = await supabase
          .from("user_goals")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        setUserGoal(goal);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    checkAuthAndOnboarding();
  };

  const handleProfileUpdate = () => {
    checkAuthAndOnboarding();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const latestEntry = getLatestEntry();
  const weightChange = getWeightChange();
  const currentWeight = latestEntry?.weight || userProfile?.weight || 0;
  const targetWeight = userGoal?.target_weight || 0;
  const startWeight = entries.length > 0 ? entries[entries.length - 1].weight || currentWeight : currentWeight;
  const progressPercentage = targetWeight && startWeight !== currentWeight 
    ? ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100 
    : 0;

  // Calculate BMI
  const height = userProfile?.height || 170; // cm
  const heightInMeters = height / 100;
  const bmi = currentWeight && height ? currentWeight / (heightInMeters * heightInMeters) : 0;

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600", bgColor: "bg-blue-500/20" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600", bgColor: "bg-green-500/20" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600", bgColor: "bg-yellow-500/20" };
    return { category: "Obese", color: "text-red-600", bgColor: "bg-red-500/20" };
  };

  const bmiStatus = getBMICategory(bmi);

  // Weight chart data
  const weightChartData = useMemo(() => {
    const days = parseInt(dateRange);
    const filteredEntries = entries
      .filter(entry => {
        const entryDate = new Date(entry.entry_date);
        const cutoffDate = subDays(new Date(), days);
        return entryDate >= cutoffDate;
      })
      .sort((a, b) => new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime())
      .map(entry => ({
        date: format(new Date(entry.entry_date), "MMM d"),
        weight: entry.weight,
        bodyFat: entry.body_fat_percentage || null
      }));

    return filteredEntries;
  }, [entries, dateRange]);

  // Daily macros from today's meals
  const todayMacros = useMemo(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayMeals = mealLogs.filter(log => log.log_date === today);
    
    return todayMeals.reduce(
      (acc, log) => ({
        protein: acc.protein + Number(log.protein),
        carbs: acc.carbs + Number(log.carbs),
        fats: acc.fats + Number(log.fats),
        calories: acc.calories + log.calories
      }),
      { protein: 0, carbs: 0, fats: 0, calories: 0 }
    );
  }, [mealLogs]);

  // Weekly macros
  const weeklyMacros = useMemo(() => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
    
    const weekMeals = mealLogs.filter(log => {
      const logDate = new Date(log.log_date);
      return logDate >= startDate && logDate <= endDate;
    });

    return weekMeals.reduce(
      (acc, log) => ({
        protein: acc.protein + Number(log.protein),
        carbs: acc.carbs + Number(log.carbs),
        fats: acc.fats + Number(log.fats),
        calories: acc.calories + log.calories
      }),
      { protein: 0, carbs: 0, fats: 0, calories: 0 }
    );
  }, [mealLogs]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  const dailyMacrosPieData = [
    { name: 'Protein', value: Math.round(todayMacros.protein), color: COLORS[0] },
    { name: 'Carbs', value: Math.round(todayMacros.carbs), color: COLORS[1] },
    { name: 'Fats', value: Math.round(todayMacros.fats), color: COLORS[2] }
  ].filter(item => item.value > 0);

  const weeklyMacrosPieData = [
    { name: 'Protein', value: Math.round(weeklyMacros.protein), color: COLORS[0] },
    { name: 'Carbs', value: Math.round(weeklyMacros.carbs), color: COLORS[1] },
    { name: 'Fats', value: Math.round(weeklyMacros.fats), color: COLORS[2] }
  ].filter(item => item.value > 0);

  const achievements = [
    { title: "First Weigh-In", description: "Logged your first weight", unlocked: entries.length > 0 },
    { title: "7-Day Streak", description: "Logged weight for 7 consecutive days", unlocked: entries.length >= 7 },
    { title: "First Milestone", description: "Lost your first 2kg", unlocked: Math.abs(weightChange) >= 2 },
    { title: "30-Day Journey", description: "Tracked progress for 30 days", unlocked: entries.length >= 30 },
    { title: "5kg Achievement", description: "Lost 5 kilograms", unlocked: Math.abs(weightChange) >= 5 },
    { title: "Goal Achieved", description: "Reached your target weight", unlocked: targetWeight && currentWeight <= targetWeight }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {!hasOnboarded ? (
          <OnboardingForm userId={userId!} onComplete={handleOnboardingComplete} />
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                  Your Health Progress
                </h1>
                <p className="text-muted-foreground">Track your fitness journey and celebrate achievements</p>
              </div>
              <EditProfileDialog userId={userId!} onUpdate={handleProfileUpdate} />
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardHeader className="pb-2">
                  <CardDescription>Current Weight</CardDescription>
                  <CardTitle className="text-4xl">{currentWeight.toFixed(1)} kg</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    {weightChange < 0 ? (
                      <>
                        <TrendingDown className="h-4 w-4" />
                        {Math.abs(weightChange).toFixed(1)} kg lost
                      </>
                    ) : weightChange > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4" />
                        {weightChange.toFixed(1)} kg gained
                      </>
                    ) : (
                      <span>No change yet</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader className="pb-2">
                  <CardDescription>Goal Weight</CardDescription>
                  <CardTitle className="text-4xl">{targetWeight || '—'} kg</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    {targetWeight ? `${Math.abs(currentWeight - targetWeight).toFixed(1)} kg to go` : 'Set a goal'}
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
                    {progressPercentage > 0 ? 'On track to goal' : 'Keep going!'}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="pb-2">
                  <CardDescription>Entries Logged</CardDescription>
                  <CardTitle className="text-4xl">{entries.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    Keep tracking!
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Card */}
            <div className="mb-8">
              <HealthCard userId={userId!} />
            </div>

            {/* Charts and Analytics Tabs */}
            <Tabs defaultValue="weight" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weight">Weight Trends</TabsTrigger>
                <TabsTrigger value="bmi">BMI & Body Comp</TabsTrigger>
                <TabsTrigger value="macros">Macro Distribution</TabsTrigger>
              </TabsList>

              {/* Weight Progress Chart */}
              <TabsContent value="weight" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Scale className="h-5 w-5 text-primary" />
                          Weight Progress
                        </CardTitle>
                        <CardDescription>Track your weight changes over time</CardDescription>
                      </div>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="90">Last 90 days</SelectItem>
                          <SelectItem value="365">Last year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {weightChartData.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No weight data available for this period</p>
                        <p className="text-sm mt-2">Start logging your weight to see trends</p>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weightChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="weight" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            name="Weight (kg)"
                            dot={{ fill: '#3b82f6', r: 4 }}
                          />
                          {weightChartData.some(d => d.bodyFat !== null) && (
                            <Line 
                              type="monotone" 
                              dataKey="bodyFat" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              name="Body Fat %"
                              dot={{ fill: '#10b981', r: 4 }}
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* BMI and Body Composition */}
              <TabsContent value="bmi" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        BMI Calculator
                      </CardTitle>
                      <CardDescription>Body Mass Index and category</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center py-6">
                        <div className="text-6xl font-bold mb-2">{bmi.toFixed(1)}</div>
                        <Badge className={`${bmiStatus.bgColor} ${bmiStatus.color} text-lg px-4 py-1`}>
                          {bmiStatus.category}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Current Weight:</span>
                          <span className="font-semibold">{currentWeight.toFixed(1)} kg</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Height:</span>
                          <span className="font-semibold">{height} cm</span>
                        </div>
                        {latestEntry?.body_fat_percentage && (
                          <div className="flex items-center justify-between text-sm">
                            <span>Body Fat:</span>
                            <span className="font-semibold">{latestEntry.body_fat_percentage}%</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>BMI Categories</CardTitle>
                      <CardDescription>Understanding your BMI range</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className={`p-3 rounded-lg border ${bmi < 18.5 ? 'bg-blue-500/10 border-blue-500/20' : 'bg-muted/30'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Underweight</span>
                          <span className="text-sm text-muted-foreground">&lt; 18.5</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg border ${bmi >= 18.5 && bmi < 25 ? 'bg-green-500/10 border-green-500/20' : 'bg-muted/30'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Normal Weight</span>
                          <span className="text-sm text-muted-foreground">18.5 - 24.9</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg border ${bmi >= 25 && bmi < 30 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-muted/30'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Overweight</span>
                          <span className="text-sm text-muted-foreground">25 - 29.9</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg border ${bmi >= 30 ? 'bg-red-500/10 border-red-500/20' : 'bg-muted/30'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Obese</span>
                          <span className="text-sm text-muted-foreground">&ge; 30</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Macro Distribution */}
              <TabsContent value="macros" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Daily Macros */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Macros</CardTitle>
                      <CardDescription>Daily macro distribution from logged meals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {todayMacros.calories === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>No meals logged today</p>
                          <p className="text-sm mt-2">Log meals to see macro breakdown</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-2">{todayMacros.calories}</div>
                            <div className="text-sm text-muted-foreground">Total Calories</div>
                          </div>

                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={dailyMacrosPieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}g`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {dailyMacrosPieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span className="text-sm">Protein</span>
                              </div>
                              <span className="font-semibold">{Math.round(todayMacros.protein)}g</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-sm">Carbs</span>
                              </div>
                              <span className="font-semibold">{Math.round(todayMacros.carbs)}g</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span className="text-sm">Fats</span>
                              </div>
                              <span className="font-semibold">{Math.round(todayMacros.fats)}g</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Weekly Macros */}
                  <Card>
                    <CardHeader>
                      <CardTitle>This Week's Macros</CardTitle>
                      <CardDescription>Weekly macro distribution summary</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {weeklyMacros.calories === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>No meals logged this week</p>
                          <p className="text-sm mt-2">Log meals to see weekly trends</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-2">{weeklyMacros.calories}</div>
                            <div className="text-sm text-muted-foreground">Total Calories</div>
                          </div>

                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={weeklyMacrosPieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}g`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {weeklyMacrosPieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span className="text-sm">Protein</span>
                              </div>
                              <span className="font-semibold">{Math.round(weeklyMacros.protein)}g</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-sm">Carbs</span>
                              </div>
                              <span className="font-semibold">{Math.round(weeklyMacros.carbs)}g</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span className="text-sm">Fats</span>
                              </div>
                              <span className="font-semibold">{Math.round(weeklyMacros.fats)}g</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Achievements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Achievements
                </CardTitle>
                <CardDescription>Milestones you've reached on your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all ${
                        achievement.unlocked
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/30 border-border opacity-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.unlocked ? "bg-primary/20" : "bg-muted"
                          }`}
                        >
                          <Award
                            className={`h-5 w-5 ${
                              achievement.unlocked ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="mt-2" variant="secondary">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Weight Entries */}
            {entries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Weight Entries</CardTitle>
                  <CardDescription>Your latest weight logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {entries.slice(0, 10).map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{entry.weight} kg</p>
                          <p className="text-sm text-muted-foreground">{entry.entry_date}</p>
                          {entry.milestone_notes && (
                            <p className="text-sm text-muted-foreground mt-1">{entry.milestone_notes}</p>
                          )}
                        </div>
                        {entry.body_fat_percentage && (
                          <Badge variant="outline">{entry.body_fat_percentage}% body fat</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProgressUnified;
