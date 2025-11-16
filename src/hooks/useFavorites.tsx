import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites(new Set());
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_favorites")
        .select("recipe_id")
        .eq("user_id", user.id);

      if (!error && data) {
        setFavorites(new Set(data.map((fav) => fav.recipe_id)));
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (recipeId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "Please sign in to save favorites",
      });
      return;
    }

    const isFavorite = favorites.has(recipeId);

    if (isFavorite) {
      const { error } = await supabase
        .from("user_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("recipe_id", recipeId);

      if (!error) {
        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(recipeId);
          return newSet;
        });
        toast({
          title: "Removed from favorites",
        });
      }
    } else {
      const { error } = await supabase
        .from("user_favorites")
        .insert({ user_id: user.id, recipe_id: recipeId });

      if (!error) {
        setFavorites((prev) => new Set(prev).add(recipeId));
        toast({
          title: "Added to favorites",
        });
      }
    }
  };

  return { favorites, loading, toggleFavorite, isFavorite: (id: string) => favorites.has(id) };
};
