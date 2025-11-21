import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export type Milestone = {
  id: string;
  user_id: string;
  milestone_date: string;
  meal_type?: "breakfast" | "lunch" | "dinner" | "snack" | "snack2";
  completed_at: string;
  notes?: string;
};

export const useMilestones = (date?: string) => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMilestones([]);
      setLoading(false);
      return;
    }

    fetchMilestones();
  }, [user, date]);

  const fetchMilestones = async () => {
    setLoading(true);
    let query = supabase
      .from("meal_milestones")
      .select("*")
      .eq("user_id", user!.id);

    if (date) {
      query = query.eq("milestone_date", date);
    }

    const { data, error } = await query.order("completed_at", { ascending: false });

    if (error) {
      console.error("Error fetching milestones:", error);
      toast.error("Failed to load milestones");
    } else {
      setMilestones(data as Milestone[] || []);
    }
    setLoading(false);
  };

  const addMilestone = async (
    date: string,
    mealType?: "breakfast" | "lunch" | "dinner" | "snack" | "snack2",
    notes?: string
  ) => {
    if (!user) {
      toast.error("Please sign in to track milestones");
      return;
    }

    const { error } = await supabase.from("meal_milestones").insert({
      user_id: user.id,
      milestone_date: date,
      meal_type: mealType,
      notes,
    });
 
    if (error) {
      console.error("Error adding milestone:", error, { date, mealType, notes });
      toast.error("Failed to add milestone");
    } else {
      console.log("Milestone added successfully", { date, mealType, notes });
      toast.success("Milestone tracked! Keep it up! 💪");
      fetchMilestones();
    }
  };

  const hasMilestone = (date: string, mealType?: string) => {
    return milestones.some(
      (m) => m.milestone_date === date && (!mealType || m.meal_type === mealType)
    );
  };

  return { milestones, loading, addMilestone, hasMilestone, refetch: fetchMilestones };
};