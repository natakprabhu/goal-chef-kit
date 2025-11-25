import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Recipe } from "./useRecipes";

export const useRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [userGoalCategory, setUserGoalCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserGoalAndPreferences = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user's goal
        const { data: goalData } = await supabase
          .from("user_goals")
          .select("goal_type")
          .eq("user_id", user.id)
          .maybeSingle();

        // Fetch user's diet preference
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("diet_preference")
          .eq("user_id", user.id)
          .maybeSingle();

        // Map goal_type to goal_category
        let goalCategory = "maintenance";
        if (goalData?.goal_type) {
          if (goalData.goal_type.toLowerCase().includes("gain") || 
              goalData.goal_type.toLowerCase().includes("bulk")) {
            goalCategory = "weight_gain";
          } else if (goalData.goal_type.toLowerCase().includes("loss") || 
                     goalData.goal_type.toLowerCase().includes("cut") ||
                     goalData.goal_type.toLowerCase().includes("lose")) {
            goalCategory = "weight_loss";
          }
        }

        setUserGoalCategory(goalCategory);

        // Fetch recommended recipes
        let query = supabase
          .from("recipes")
          .select("*")
          .eq("goal_category", goalCategory);

        // Filter by diet preference if not "both"
        if (profileData?.diet_preference && profileData.diet_preference !== "both") {
          query = query.eq("diet_type", profileData.diet_preference as "veg" | "non_veg");
        }

        const { data: recipesData } = await query
          .order("created_at", { ascending: false })
          .limit(12);

        setRecommendations((recipesData as Recipe[]) || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGoalAndPreferences();
  }, [user]);

  return { recommendations, loading, userGoalCategory };
};
