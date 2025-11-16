import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useSubscription = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState<string>("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setIsSubscribed(false);
        setSubscriptionType("free");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (!error && data) {
        const isActive =
          data.is_active &&
          (!data.end_date || new Date(data.end_date) > new Date());
        setIsSubscribed(isActive && data.subscription_type !== "free");
        setSubscriptionType(data.subscription_type);
      } else {
        setIsSubscribed(false);
        setSubscriptionType("free");
      }
      setLoading(false);
    };

    fetchSubscription();
  }, [user]);

  return { isSubscribed, subscriptionType, loading };
};
