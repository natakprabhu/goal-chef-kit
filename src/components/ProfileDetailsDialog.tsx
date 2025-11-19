import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Target, Utensils, Edit, Save, X } from "lucide-react";

interface ProfileDetailsDialogProps {
  userId: string;
  onUpdate: () => void;
}

const ProfileDetailsDialog = ({ userId, onUpdate }: ProfileDetailsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    full_name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    body_type: "",
    diet_preference: "both"
  });

  const [goalData, setGoalData] = useState({
    goal_type: "",
    target_body_type: "",
    target_weight: "",
    estimated_timeline_days: ""
  });

  const [nutritionData, setNutritionData] = useState({
    daily_calories: "",
    daily_protein: "",
    daily_carbs: "",
    daily_fats: "",
    daily_fiber: "",
    daily_water: ""
  });

  useEffect(() => {
    if (open) {
      loadAllData();
    }
  }, [open]);

  const loadAllData = async () => {
    setLoading(true);
    
    // Load profile
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profile) {
      setProfileData({
        full_name: profile.full_name || "",
        age: profile.age?.toString() || "",
        gender: profile.gender || "",
        height: profile.height?.toString() || "",
        weight: profile.weight?.toString() || "",
        body_type: profile.body_type || "",
        diet_preference: profile.diet_preference || "both"
      });
    }

    // Load goals
    const { data: goal } = await supabase
      .from("user_goals")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (goal) {
      setGoalData({
        goal_type: goal.goal_type || "",
        target_body_type: goal.target_body_type || "",
        target_weight: goal.target_weight?.toString() || "",
        estimated_timeline_days: goal.estimated_timeline_days?.toString() || ""
      });
    }

    // Load nutrition
    const { data: nutrition } = await supabase
      .from("user_nutrition_summary")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (nutrition) {
      setNutritionData({
        daily_calories: nutrition.daily_calories?.toString() || "",
        daily_protein: nutrition.daily_protein?.toString() || "",
        daily_carbs: nutrition.daily_carbs?.toString() || "",
        daily_fats: nutrition.daily_fats?.toString() || "",
        daily_fiber: nutrition.daily_fiber?.toString() || "",
        daily_water: nutrition.daily_water?.toString() || ""
      });
    }

    setLoading(false);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: profileData.full_name,
        age: parseInt(profileData.age) || null,
        gender: profileData.gender || null,
        height: parseFloat(profileData.height) || null,
        weight: parseFloat(profileData.weight) || null,
        body_type: profileData.body_type || null,
        diet_preference: profileData.diet_preference
      })
      .eq("user_id", userId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error.message,
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your personal information has been updated.",
      });
      setEditingSection(null);
      onUpdate();
    }
    setLoading(false);
  };

  const handleSaveGoals = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("user_goals")
      .upsert({
        user_id: userId,
        goal_type: goalData.goal_type,
        target_body_type: goalData.target_body_type || null,
        target_weight: parseFloat(goalData.target_weight) || null,
        estimated_timeline_days: parseInt(goalData.estimated_timeline_days) || null
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating goals",
        description: error.message,
      });
    } else {
      toast({
        title: "Goals updated",
        description: "Your transformation goals have been updated.",
      });
      setEditingSection(null);
      onUpdate();
    }
    setLoading(false);
  };

  const handleSaveNutrition = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("user_nutrition_summary")
      .upsert({
        user_id: userId,
        daily_calories: parseInt(nutritionData.daily_calories) || null,
        daily_protein: parseFloat(nutritionData.daily_protein) || null,
        daily_carbs: parseFloat(nutritionData.daily_carbs) || null,
        daily_fats: parseFloat(nutritionData.daily_fats) || null,
        daily_fiber: parseFloat(nutritionData.daily_fiber) || null,
        daily_water: parseFloat(nutritionData.daily_water) || null
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating nutrition",
        description: error.message,
      });
    } else {
      toast({
        title: "Nutrition targets updated",
        description: "Your daily nutritional targets have been updated.",
      });
      setEditingSection(null);
      onUpdate();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          View Profile Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profile & Goals</DialogTitle>
          <DialogDescription>
            View and edit your personal information, goals, and nutrition targets
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Target className="h-4 w-4 mr-2" />
              Transformation
            </TabsTrigger>
            <TabsTrigger value="nutrition">
              <Utensils className="h-4 w-4 mr-2" />
              Nutrition
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  {editingSection !== "personal" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingSection("personal")}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingSection(null)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSaveProfile}
                        disabled={loading}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingSection === "personal" ? (
                  <>
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          type="number"
                          value={profileData.age}
                          onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select value={profileData.gender} onValueChange={(value) => setProfileData({ ...profileData, gender: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Height (cm)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={profileData.height}
                          onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Weight (kg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={profileData.weight}
                          onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Body Type</Label>
                      <Select value={profileData.body_type} onValueChange={(value) => setProfileData({ ...profileData, body_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="tall">Tall</SelectItem>
                          <SelectItem value="lean">Lean</SelectItem>
                          <SelectItem value="toned">Toned</SelectItem>
                          <SelectItem value="muscular">Muscular</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Food Preference</Label>
                      <Select value={profileData.diet_preference} onValueChange={(value) => setProfileData({ ...profileData, diet_preference: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veg">🥗 Vegetarian Only</SelectItem>
                          <SelectItem value="non_veg">🍗 Non-Vegetarian</SelectItem>
                          <SelectItem value="both">🍽️ Both (No Preference)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{profileData.full_name || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-medium">{profileData.age || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="font-medium capitalize">{profileData.gender || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Height:</span>
                      <span className="font-medium">{profileData.height ? `${profileData.height} cm` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{profileData.weight ? `${profileData.weight} kg` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Body Type:</span>
                      <span className="font-medium capitalize">{profileData.body_type || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Food Preference:</span>
                      <span className="font-medium capitalize">{profileData.diet_preference || "—"}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Body Transformation Journey */}
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Body Transformation Journey</CardTitle>
                  {editingSection !== "goals" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingSection("goals")}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingSection(null)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSaveGoals}
                        disabled={loading}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingSection === "goals" ? (
                  <>
                    <div className="space-y-2">
                      <Label>Goal Type</Label>
                      <Select value={goalData.goal_type} onValueChange={(value) => setGoalData({ ...goalData, goal_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cutting">Weight Loss (Cutting)</SelectItem>
                          <SelectItem value="maintaining">Maintain Weight</SelectItem>
                          <SelectItem value="gaining">Weight Gain (Bulking)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Body Type</Label>
                      <Select value={goalData.target_body_type} onValueChange={(value) => setGoalData({ ...goalData, target_body_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="tall">Tall</SelectItem>
                          <SelectItem value="lean">Lean</SelectItem>
                          <SelectItem value="toned">Toned</SelectItem>
                          <SelectItem value="muscular">Muscular</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Weight (kg)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={goalData.target_weight}
                        onChange={(e) => setGoalData({ ...goalData, target_weight: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timeline (days)</Label>
                      <Input
                        type="number"
                        value={goalData.estimated_timeline_days}
                        onChange={(e) => setGoalData({ ...goalData, estimated_timeline_days: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Goal Type:</span>
                      <span className="font-medium capitalize">{goalData.goal_type || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Target Body Type:</span>
                      <span className="font-medium capitalize">{goalData.target_body_type || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Target Weight:</span>
                      <span className="font-medium">{goalData.target_weight ? `${goalData.target_weight} kg` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-medium">{goalData.estimated_timeline_days ? `${goalData.estimated_timeline_days} days` : "—"}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Daily Nutritional Targets */}
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Daily Nutritional Targets</CardTitle>
                  {editingSection !== "nutrition" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingSection("nutrition")}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingSection(null)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSaveNutrition}
                        disabled={loading}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingSection === "nutrition" ? (
                  <>
                    <div className="space-y-2">
                      <Label>Daily Calories (kcal)</Label>
                      <Input
                        type="number"
                        value={nutritionData.daily_calories}
                        onChange={(e) => setNutritionData({ ...nutritionData, daily_calories: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Protein (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={nutritionData.daily_protein}
                          onChange={(e) => setNutritionData({ ...nutritionData, daily_protein: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Carbs (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={nutritionData.daily_carbs}
                          onChange={(e) => setNutritionData({ ...nutritionData, daily_carbs: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fats (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={nutritionData.daily_fats}
                          onChange={(e) => setNutritionData({ ...nutritionData, daily_fats: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Fiber (g)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={nutritionData.daily_fiber}
                          onChange={(e) => setNutritionData({ ...nutritionData, daily_fiber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Water (liters)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={nutritionData.daily_water}
                          onChange={(e) => setNutritionData({ ...nutritionData, daily_water: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Daily Calories:</span>
                      <span className="font-medium">{nutritionData.daily_calories ? `${nutritionData.daily_calories} kcal` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="font-medium">{nutritionData.daily_protein ? `${nutritionData.daily_protein}g` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Carbs:</span>
                      <span className="font-medium">{nutritionData.daily_carbs ? `${nutritionData.daily_carbs}g` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Fats:</span>
                      <span className="font-medium">{nutritionData.daily_fats ? `${nutritionData.daily_fats}g` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Fiber:</span>
                      <span className="font-medium">{nutritionData.daily_fiber ? `${nutritionData.daily_fiber}g` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Water:</span>
                      <span className="font-medium">{nutritionData.daily_water ? `${nutritionData.daily_water}L` : "—"}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetailsDialog;
