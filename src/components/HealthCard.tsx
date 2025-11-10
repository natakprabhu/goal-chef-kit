import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HealthCardProps {
  userId: string;
}

interface UserData {
  profile: any;
  medical: any;
  goals: any;
  nutrition: any;
}

const HealthCard = ({ userId }: HealthCardProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const [profileRes, medicalRes, goalsRes, nutritionRes] = await Promise.all([
        supabase.from("user_profiles").select("*").eq("user_id", userId).single(),
        supabase.from("user_medical").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("user_goals").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("user_nutrition_summary").select("*").eq("user_id", userId).maybeSingle(),
      ]);

      if (profileRes.error) throw profileRes.error;

      setUserData({
        profile: profileRes.data,
        medical: medicalRes.data,
        goals: goalsRes.data,
        nutrition: nutritionRes.data,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading data",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (!userData) return null;

  const { profile, goals, nutrition } = userData;

  const getBodyTypeEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      short: "🧍",
      tall: "🧍‍♂️",
      lean: "🏃",
      toned: "💪",
      muscular: "🏋️",
      large: "🧍‍♀️",
    };
    return emojis[type] || "👤";
  };

  const getGoalLabel = (type: string) => {
    const labels: Record<string, string> = {
      cutting: "Fat Loss (Cutting)",
      gaining: "Muscle Building (Gaining)",
      maintenance: "Weight Maintenance",
      healthy_lifestyle: "Healthy Lifestyle",
      medical: "Medical/Health Recovery",
    };
    return labels[type] || type;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-2">
            Your Health Profile
          </h1>
          <p className="text-muted-foreground">Track your progress and manage your nutrition goals</p>
        </div>
        <Button variant="outline" size="lg">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Body Type Visualization */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Body Transformation Journey</CardTitle>
            <CardDescription>Your current and target body type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8 py-8">
              <div className="text-center">
                <div className="text-6xl mb-2">{getBodyTypeEmoji(profile.body_type)}</div>
                <p className="font-semibold capitalize">{profile.body_type}</p>
                <p className="text-sm text-muted-foreground">Current</p>
              </div>
              <ArrowRight className="h-12 w-12 text-primary" />
              <div className="text-center">
                <div className="text-6xl mb-2">{getBodyTypeEmoji(goals?.target_body_type)}</div>
                <p className="font-semibold capitalize">{goals?.target_body_type}</p>
                <p className="text-sm text-muted-foreground">Target</p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4 mt-4">
              <p className="text-sm"><strong>Goal:</strong> {getGoalLabel(goals?.goal_type)}</p>
              {goals?.estimated_timeline_days && (
                <p className="text-sm mt-2">
                  <strong>Estimated Timeline:</strong> {Math.round(goals.estimated_timeline_days / 7)} weeks
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Nutritional Targets */}
        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle>Daily Nutritional Targets</CardTitle>
            <CardDescription>Your personalized daily requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                <span className="font-medium">Calories</span>
                <span className="text-2xl font-bold text-primary">{nutrition?.daily_calories || 0} kcal</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-xl font-bold">{nutrition?.daily_protein || 0}g</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-xl font-bold">{nutrition?.daily_carbs || 0}g</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Fats</p>
                  <p className="text-xl font-bold">{nutrition?.daily_fats || 0}g</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Fiber</p>
                  <p className="text-xl font-bold">{nutrition?.daily_fiber || 0}g</p>
                </div>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Water Intake</p>
                <p className="text-xl font-bold">{nutrition?.daily_water || 0}L / day</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Basic Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold">{profile.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-semibold capitalize">{profile.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-semibold">{profile.age} years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-semibold">{profile.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-semibold">{profile.height} cm</p>
            </div>
            {goals?.target_weight && (
              <div>
                <p className="text-sm text-muted-foreground">Target Weight</p>
                <p className="font-semibold">{goals.target_weight} kg</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthCard;
