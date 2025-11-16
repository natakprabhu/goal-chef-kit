import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Database } from "@/integrations/supabase/types";

export type Recipe = Database["public"]["Tables"]["recipes"]["Row"] & {
  ingredients: any[];
  instructions: any[];
};

export const useRecipes = (dietType?: "veg" | "non_veg", mealType?: "breakfast" | "lunch" | "dinner" | "snack") => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      let query = supabase.from("recipes").select("*");

      if (dietType) {
        query = query.eq("diet_type", dietType);
      }

      if (mealType) {
        query = query.eq("meal_type", mealType);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setRecipes(data as Recipe[] || []);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [user, dietType, mealType]);

  return { recipes, loading, error };
};

export const useRecipe = (recipeId: string | undefined) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipe = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", recipeId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setRecipe(data as Recipe);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [recipeId]);

  return { recipe, loading, error };
};
