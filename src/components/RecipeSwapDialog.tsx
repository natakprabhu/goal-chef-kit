import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Clock } from "lucide-react";
import { useRecipes, type Recipe } from "@/hooks/useRecipes";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface RecipeSwapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRecipe: Recipe;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  day: string;
  weekStartDate: string;
  onSwapComplete: () => void;
}

const RecipeSwapDialog = ({
  open,
  onOpenChange,
  currentRecipe,
  mealType,
  day,
  weekStartDate,
  onSwapComplete
}: RecipeSwapDialogProps) => {
  const { user } = useAuth();
  const { recipes, loading } = useRecipes(undefined, mealType, true);

  // Filter out the current recipe
  const availableRecipes = recipes.filter(r => r.id !== currentRecipe.id);

  const handleSwap = async (newRecipe: Recipe) => {
    if (!user) return;

    try {
      // Find the existing meal plan entry
      const { data: existingPlan, error: fetchError } = await supabase
        .from("meal_plans")
        .select("id")
        .eq("user_id", user.id)
        .eq("week_start_date", weekStartDate)
        .eq("day_of_week", day)
        .eq("meal_type", mealType)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingPlan) {
        // Update existing entry
        const { error: updateError } = await supabase
          .from("meal_plans")
          .update({ recipe_id: newRecipe.id })
          .eq("id", existingPlan.id);

        if (updateError) throw updateError;
      } else {
        // Insert new entry
        const { error: insertError } = await supabase
          .from("meal_plans")
          .insert({
            user_id: user.id,
            week_start_date: weekStartDate,
            day_of_week: day,
            meal_type: mealType,
            recipe_id: newRecipe.id,
            servings: 1
          });

        if (insertError) throw insertError;
      }

      toast.success(`Swapped to ${newRecipe.title}`);
      onSwapComplete();
      onOpenChange(false);
    } catch (error) {
      console.error("Error swapping recipe:", error);
      toast.error("Failed to swap recipe");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Swap Recipe</DialogTitle>
          <DialogDescription>
            Choose a different {mealType} recipe to replace <span className="font-semibold">{currentRecipe.title}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : availableRecipes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No alternative recipes available for this meal type.
            </div>
          ) : (
            availableRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => handleSwap(recipe)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{recipe.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{recipe.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {recipe.diet_type === "veg" ? "🥬 Veg" : "🍖 Non-Veg"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">{recipe.calories} cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{recipe.cook_time || 30} min</span>
                    </div>
                    <div className="flex gap-3 ml-auto">
                      <span className="text-xs">
                        <span className="font-semibold">{recipe.protein}g</span> protein
                      </span>
                      <span className="text-xs">
                        <span className="font-semibold">{recipe.carbs}g</span> carbs
                      </span>
                      <span className="text-xs">
                        <span className="font-semibold">{recipe.fats}g</span> fats
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-3">
                    Select This Recipe
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeSwapDialog;
