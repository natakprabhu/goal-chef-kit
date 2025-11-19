import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OnboardingForm from "@/components/OnboardingForm";
import HealthCard from "@/components/HealthCard";
import EditProfileDialog from "@/components/EditProfileDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProgressEntries } from "@/hooks/useProgressEntries";

const ProgressUnified = () => {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userGoal, setUserGoal] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { entries, getLatestEntry, getWeightChange } = useProgressEntries();

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
