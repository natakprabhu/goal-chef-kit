import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Database } from "@/integrations/supabase/types";

export type ProgressEntry = Database["public"]["Tables"]["user_progress_entries"]["Row"];

export const useProgressEntries = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("user_progress_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("entry_date", { ascending: false });

    if (!error && data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const getLatestEntry = () => {
    return entries.length > 0 ? entries[0] : null;
  };

  const getWeightChange = () => {
    if (entries.length < 2) return 0;
    const latest = entries[0].weight || 0;
    const oldest = entries[entries.length - 1].weight || 0;
    return latest - oldest;
  };

  return { entries, loading, refetch: fetchEntries, getLatestEntry, getWeightChange };
};
