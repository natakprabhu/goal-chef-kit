import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OnboardingFormProps {
  userId: string;
  onComplete: () => void;
}

const OnboardingForm = ({ userId, onComplete }: OnboardingFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("basic");

  // Basic Info
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bodyType, setBodyType] = useState("");

  // Medical Info
  const [thyroid, setThyroid] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [bloodPressure, setBloodPressure] = useState("normal");
  const [uricAcid, setUricAcid] = useState(false);
  const [allergies, setAllergies] = useState("");
  const [otherConditions, setOtherConditions] = useState("");

  // Goals
  const [goalType, setGoalType] = useState("");
  const [targetBodyType, setTargetBodyType] = useState("");
  const [targetWeight, setTargetWeight] = useState("");

  const calculateNutrition = (currentWeight: number, goal: string) => {
    const baseCalories = currentWeight * 24;
    let calories = baseCalories;
    let protein = currentWeight * 1.6;
    
    if (goal === "cutting") {
      calories = baseCalories * 0.8;
      protein = currentWeight * 2.0;
    } else if (goal === "gaining") {
      calories = baseCalories * 1.2;
      protein = currentWeight * 2.2;
    }

    return {
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round((calories * 0.4) / 4),
      fats: Math.round((calories * 0.3) / 9),
      fiber: 30,
      water: Math.round(currentWeight * 0.033),
    };
  };

  const handleSubmit = async () => {
    if (!fullName || !gender || !age || !weight || !height || !bodyType) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all basic information fields.",
      });
      return;
    }

    if (!goalType || !targetBodyType) {
      toast({
        variant: "destructive",
        title: "Missing Goals",
        description: "Please select your fitness goal and target body type.",
      });
      return;
    }

    setLoading(true);

    try {
      // Update user profile
      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
          gender,
          age: parseInt(age),
          weight: parseFloat(weight),
          height: parseFloat(height),
          body_type: bodyType,
          has_onboarded: true,
        })
        .eq("user_id", userId);

      if (profileError) throw profileError;

      // Insert medical info
      const allergiesArray = allergies.split(",").map(a => a.trim()).filter(Boolean);
      
      const { error: medicalError } = await supabase
        .from("user_medical")
        .upsert({
          user_id: userId,
          thyroid,
          diabetes,
          blood_pressure: bloodPressure,
          uric_acid: uricAcid,
          allergies: allergiesArray,
          other_conditions: otherConditions,
        });

      if (medicalError) throw medicalError;

      // Calculate timeline (simplified)
      const currentWeightNum = parseFloat(weight);
      const targetWeightNum = targetWeight ? parseFloat(targetWeight) : currentWeightNum;
      const weightDiff = Math.abs(targetWeightNum - currentWeightNum);
      const estimatedDays = Math.round((weightDiff / 0.5) * 7); // 0.5kg per week

      // Insert goals
      const { error: goalsError } = await supabase
        .from("user_goals")
        .upsert({
          user_id: userId,
          goal_type: goalType,
          target_body_type: targetBodyType,
          target_weight: targetWeight ? parseFloat(targetWeight) : null,
          estimated_timeline_days: estimatedDays,
        });

      if (goalsError) throw goalsError;

      // Calculate and insert nutrition summary
      const nutrition = calculateNutrition(currentWeightNum, goalType);
      
      const { error: nutritionError } = await supabase
        .from("user_nutrition_summary")
        .upsert({
          user_id: userId,
          daily_calories: nutrition.calories,
          daily_protein: nutrition.protein,
          daily_carbs: nutrition.carbs,
          daily_fats: nutrition.fats,
          daily_fiber: nutrition.fiber,
          daily_water: nutrition.water,
        });

      if (nutritionError) throw nutritionError;

      toast({
        title: "Profile Complete!",
        description: "Your health profile has been created successfully.",
      });

      onComplete();
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

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Welcome to GoalChef!</CardTitle>
        <CardDescription>Let's set up your personalized nutrition plan</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="health">Health Conditions</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyType">Current Body Type</Label>
                <Select value={bodyType} onValueChange={setBodyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
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
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setCurrentTab("health")}>Next: Health Conditions</Button>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="thyroid" checked={thyroid} onCheckedChange={(checked) => setThyroid(checked as boolean)} />
                <Label htmlFor="thyroid">Thyroid Issues</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="diabetes" checked={diabetes} onCheckedChange={(checked) => setDiabetes(checked as boolean)} />
                <Label htmlFor="diabetes">Diabetes</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Select value={bloodPressure} onValueChange={setBloodPressure}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="uricAcid" checked={uricAcid} onCheckedChange={(checked) => setUricAcid(checked as boolean)} />
                <Label htmlFor="uricAcid">High Uric Acid</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                <Input
                  id="allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="peanuts, shellfish, dairy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherConditions">Other Known Conditions</Label>
                <Textarea
                  id="otherConditions"
                  value={otherConditions}
                  onChange={(e) => setOtherConditions(e.target.value)}
                  placeholder="Any other health conditions..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentTab("basic")}>Back</Button>
              <Button onClick={() => setCurrentTab("goals")}>Next: Goals</Button>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalType">Fitness Goal</Label>
                <Select value={goalType} onValueChange={setGoalType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cutting">Cutting (Fat Loss)</SelectItem>
                    <SelectItem value="gaining">Gaining (Muscle Building)</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="healthy_lifestyle">Healthy Lifestyle</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetBodyType">Target Body Type</Label>
                <Select value={targetBodyType} onValueChange={setTargetBodyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target body type" />
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
                <Label htmlFor="targetWeight">Target Weight (kg) - Optional</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  step="0.1"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder="75"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentTab("health")}>Back</Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Complete Profile"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
