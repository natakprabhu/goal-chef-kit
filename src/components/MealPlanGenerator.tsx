import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, Loader2, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, startOfWeek } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Recipe } from "@/hooks/useRecipes";

interface UserProfile {
  diet_preference: string;
  weight?: number;
  height?: number;
  age?: number;
  gender?: string;
}

interface UserGoals {
  daily_calories?: number;
  daily_protein?: number;
  daily_carbs?: number;
  daily_fats?: number;
}

interface MealPlan {
  [day: string]: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snack?: Recipe;
  };
}

export const MealPlanGenerator = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const generateMealPlan = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to generate a meal plan.",
      });
      return;
    }

    setGenerating(true);

    try {
      // Fetch user profile and goals
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("diet_preference, weight, height, age, gender")
        .eq("user_id", user.id)
        .single();

      const { data: nutritionSummary } = await supabase
        .from("user_nutrition_summary")
        .select("daily_calories, daily_protein, daily_carbs, daily_fats")
        .eq("user_id", user.id)
        .maybeSingle();

      const dietPreference = profile?.diet_preference || "both";

      // Fetch recipes from database
      let recipesQuery = supabase.from("recipes").select("*");

      if (dietPreference !== "both") {
        recipesQuery = recipesQuery.eq("diet_type", dietPreference as "veg" | "non_veg");
      }

      const { data: recipes, error } = await recipesQuery;

      if (error) throw error;
      if (!recipes || recipes.length === 0) {
        toast({
          variant: "destructive",
          title: "No recipes available",
          description: "There are no recipes matching your preferences.",
        });
        return;
      }

      // Generate balanced meal plan
      const plan: MealPlan = {};
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      // Group recipes by meal type and cast to Recipe type
      const breakfasts = recipes.filter(r => r.meal_type === "breakfast") as Recipe[];
      const lunches = recipes.filter(r => r.meal_type === "lunch") as Recipe[];
      const dinners = recipes.filter(r => r.meal_type === "dinner") as Recipe[];
      const snacks = recipes.filter(r => r.meal_type === "snack") as Recipe[];

      // Shuffle arrays for variety
      const shuffle = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      const shuffledBreakfasts = shuffle(breakfasts);
      const shuffledLunches = shuffle(lunches);
      const shuffledDinners = shuffle(dinners);
      const shuffledSnacks = shuffle(snacks);

      // Assign meals to each day
      daysOfWeek.forEach((day, index) => {
        plan[day] = {
          breakfast: shuffledBreakfasts[index % shuffledBreakfasts.length],
          lunch: shuffledLunches[index % shuffledLunches.length],
          dinner: shuffledDinners[index % shuffledDinners.length],
          snack: shuffledSnacks[index % shuffledSnacks.length],
        };
      });

      setMealPlan(plan);

      // Save to database
      const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
      
      // Delete existing meal plans for this week
      await supabase
        .from("meal_plans")
        .delete()
        .eq("user_id", user.id)
        .eq("week_start_date", weekStart);

      // Insert new meal plans
      const mealPlansToInsert = daysOfWeek.flatMap((day) => {
        const dayMeals = plan[day];
        return Object.entries(dayMeals).map(([mealType, recipe]) => ({
          user_id: user.id,
          week_start_date: weekStart,
          day_of_week: day,
          meal_type: mealType as "breakfast" | "lunch" | "dinner" | "snack",
          recipe_id: recipe.id,
          servings: 1,
        }));
      });

      const { error: insertError } = await supabase
        .from("meal_plans")
        .insert(mealPlansToInsert);

      if (insertError) throw insertError;

      toast({
        title: "Meal plan generated!",
        description: "Your personalized weekly meal plan is ready.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error generating meal plan",
        description: error.message,
      });
    } finally {
      setGenerating(false);
    }
  };

  const downloadPDF = () => {
    if (!mealPlan) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Weekly Meal Plan", pageWidth / 2, 20, { align: "center" });

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    doc.text(`Week of ${format(weekStart, "MMMM d, yyyy")}`, pageWidth / 2, 28, { align: "center" });

    let yPos = 40;

    // Loop through each day
    Object.entries(mealPlan).forEach(([day, meals], dayIndex) => {
      if (dayIndex > 0 && yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Day header
      doc.setFontSize(14);
      doc.setTextColor(50, 50, 50);
      doc.text(day, 14, yPos);
      yPos += 8;

      // Meals table
      const tableData = Object.entries(meals).map(([mealType, recipe]) => [
        mealType.charAt(0).toUpperCase() + mealType.slice(1),
        recipe?.title || "N/A",
        `${recipe?.calories || 0} cal`,
        `${recipe?.protein || 0}g protein`,
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [["Meal", "Recipe", "Calories", "Protein"]],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [99, 102, 241], fontSize: 10 },
        styles: { fontSize: 9 },
        margin: { left: 14, right: 14 },
      });

      yPos = (doc as any).lastAutoTable.finalY + 10;
    });

    // Totals summary
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text("Weekly Nutritional Summary", 14, yPos);
    yPos += 8;

    const totalCalories = Object.values(mealPlan).reduce(
      (sum, day) =>
        sum +
        Object.values(day).reduce((daySum, recipe) => daySum + (recipe?.calories || 0), 0),
      0
    );
    const totalProtein = Object.values(mealPlan).reduce(
      (sum, day) =>
        sum +
        Object.values(day).reduce((daySum, recipe) => daySum + (recipe?.protein || 0), 0),
      0
    );

    autoTable(doc, {
      startY: yPos,
      head: [["Metric", "Weekly Total", "Daily Average"]],
      body: [
        ["Calories", `${totalCalories}`, `${Math.round(totalCalories / 7)}`],
        ["Protein", `${Math.round(totalProtein)}g`, `${Math.round(totalProtein / 7)}g`],
      ],
      theme: "grid",
      headStyles: { fillColor: [99, 102, 241], fontSize: 10 },
      styles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });

    doc.save(`meal-plan-${format(new Date(), "yyyy-MM-dd")}.pdf`);

    toast({
      title: "PDF downloaded!",
      description: "Your meal plan has been saved.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" />
          Generate Meal Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            AI Meal Plan Generator
          </DialogTitle>
          <DialogDescription>
            Generate a personalized weekly meal plan based on your diet preferences and nutritional goals
          </DialogDescription>
        </DialogHeader>

        {!mealPlan ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Sparkles className="h-16 w-16 text-primary animate-pulse" />
            <p className="text-muted-foreground text-center max-w-md">
              Click the button below to generate a balanced weekly meal plan tailored to your preferences
            </p>
            <Button onClick={generateMealPlan} disabled={generating} size="lg" className="gap-2">
              {generating && <Loader2 className="h-4 w-4 animate-spin" />}
              {generating ? "Generating..." : "Generate My Meal Plan"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end gap-2">
              <Button onClick={downloadPDF} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={generateMealPlan} disabled={generating} className="gap-2">
                {generating && <Loader2 className="h-4 w-4 animate-spin" />}
                Regenerate
              </Button>
            </div>

            {Object.entries(mealPlan).map(([day, meals]) => (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{day}</span>
                    <Badge variant="outline">
                      {Object.values(meals).reduce((sum, m) => sum + (m?.calories || 0), 0)} cal
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(meals).map(([mealType, recipe]) => (
                    <div key={mealType} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium capitalize">{mealType}</div>
                        <div className="text-sm text-muted-foreground">{recipe?.title}</div>
                      </div>
                      <div className="text-right text-sm">
                        <div>{recipe?.calories} cal</div>
                        <div className="text-muted-foreground">{recipe?.protein}g protein</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
