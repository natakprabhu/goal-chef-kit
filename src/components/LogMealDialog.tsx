import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { useMealLogs } from "@/hooks/useMealLogs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

type LogMealDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  date: string;
  onMealLogged?: () => void;
};

export const LogMealDialog = ({ open, onOpenChange, mealType, date, onMealLogged }: LogMealDialogProps) => {
  const { recipes, loading: recipesLoading } = useRecipes();
  const { addMealLog } = useMealLogs(date);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [customIngredients, setCustomIngredients] = useState("");
  const [calculating, setCalculating] = useState(false);

  const handleLogRecipe = async () => {
    const recipe = recipes.find((r) => r.id === selectedRecipeId);
    if (!recipe) return;

    await addMealLog({
      log_date: date,
      meal_type: mealType,
      recipe_id: recipe.id,
      calories: recipe.calories,
      protein: Number(recipe.protein),
      carbs: Number(recipe.carbs),
      fats: Number(recipe.fats),
    });

    onMealLogged?.();
    onOpenChange(false);
    setSelectedRecipeId("");
  };

  const handleCalculateCalories = async () => {
    if (!customIngredients.trim()) {
      toast.error("Please enter ingredients");
      return;
    }

    setCalculating(true);
    try {
      const { data, error } = await supabase.functions.invoke("calculate-calories", {
        body: { ingredients: customIngredients },
      });

      if (error) throw error;

      await addMealLog({
        log_date: date,
        meal_type: mealType,
        custom_meal_name: data.mealName,
        custom_meal_ingredients: customIngredients,
        calories: Math.round(data.calories),
        protein: Number(data.protein.toFixed(1)),
        carbs: Number(data.carbs.toFixed(1)),
        fats: Number(data.fats.toFixed(1)),
      });

      onMealLogged?.();
      onOpenChange(false);
      setCustomIngredients("");
    } catch (error) {
      console.error("Error calculating calories:", error);
      toast.error("Failed to calculate calories");
    } finally {
      setCalculating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</DialogTitle>
          <DialogDescription>
            Choose from your recipe collection or use AI to calculate calories
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recipes">From Recipes</TabsTrigger>
            <TabsTrigger value="ai">AI Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="space-y-4">
            {recipesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Select Recipe</Label>
                  <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a recipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipes
                        .filter((r) => r.meal_type === mealType)
                        .map((recipe) => (
                          <SelectItem key={recipe.id} value={recipe.id}>
                            {recipe.title} ({recipe.calories} kcal)
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleLogRecipe} disabled={!selectedRecipeId} className="w-full">
                  Log Meal
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-2">
              <Label>Ingredients with Quantities</Label>
              <Textarea
                placeholder="e.g., 100g chicken breast, 50g rice, 1 tablespoon olive oil, 200g broccoli"
                value={customIngredients}
                onChange={(e) => setCustomIngredients(e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Include weights (grams/ml) for accurate calorie calculation
              </p>
            </div>
            <Button
              onClick={handleCalculateCalories}
              disabled={calculating || !customIngredients.trim()}
              className="w-full gap-2"
            >
              {calculating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Calculate & Log with AI
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};