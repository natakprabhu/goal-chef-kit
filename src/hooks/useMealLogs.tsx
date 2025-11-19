import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export type MealLog = {
  id: string;
  user_id: string;
  log_date: string;
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  recipe_id?: string;
  custom_meal_name?: string;
  custom_meal_ingredients?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  logged_at: string;
};

export const useMealLogs = (date?: string) => {
  const { user } = useAuth();
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMealLogs([]);
      setLoading(false);
      return;
    }

    fetchMealLogs();
  }, [user, date]);

  const fetchMealLogs = async () => {
    setLoading(true);
    let query = supabase
      .from("meal_logs")
      .select("*")
      .eq("user_id", user!.id);

    if (date) {
      query = query.eq("log_date", date);
    }

    const { data, error } = await query.order("logged_at", { ascending: true });

    if (error) {
      console.error("Error fetching meal logs:", error);
      toast.error("Failed to load meal logs");
    } else {
      setMealLogs(data as MealLog[] || []);
    }
    setLoading(false);
  };

  const addMealLog = async (mealLog: Omit<MealLog, "id" | "user_id" | "logged_at">) => {
    if (!user) {
      toast.error("Please sign in to log meals");
      return;
    }

    const { error } = await supabase.from("meal_logs").insert({
      ...mealLog,
      user_id: user.id,
    });

    if (error) {
      console.error("Error adding meal log:", error);
      toast.error("Failed to log meal");
    } else {
      toast.success("Meal logged successfully!");
      fetchMealLogs();
    }
  };

  const deleteMealLog = async (id: string) => {
    const { error } = await supabase.from("meal_logs").delete().eq("id", id);

    if (error) {
      console.error("Error deleting meal log:", error);
      toast.error("Failed to delete meal log");
    } else {
      toast.success("Meal log deleted");
      fetchMealLogs();
    }
  };

  return { mealLogs, loading, addMealLog, deleteMealLog, refetch: fetchMealLogs };
};