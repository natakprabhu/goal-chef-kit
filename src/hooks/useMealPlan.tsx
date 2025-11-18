import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Recipe } from "./useRecipes";

export type MealPlanEntry = {
  id: string;
  day_of_week: string;
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  recipe: Recipe;
  servings: number;
};

export const useMealPlan = (weekStartDate: string) => {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (!user) {
        setMealPlan([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("meal_plans")
        .select(`
          id,
          day_of_week,
          meal_type,
          servings,
          recipe:recipes(*)
        `)
        .eq("user_id", user.id)
        .eq("week_start_date", weekStartDate);

      if (!error && data) {
        setMealPlan(data as any);
      }
      setLoading(false);
    };

    fetchMealPlan();
  }, [user, weekStartDate]);

  return { mealPlan, loading };
};
