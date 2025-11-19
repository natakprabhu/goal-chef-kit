export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      meal_logs: {
        Row: {
          calories: number
          carbs: number
          created_at: string | null
          custom_meal_ingredients: string | null
          custom_meal_name: string | null
          fats: number
          id: string
          log_date: string
          logged_at: string
          meal_type: string
          protein: number
          recipe_id: string | null
          user_id: string
        }
        Insert: {
          calories: number
          carbs: number
          created_at?: string | null
          custom_meal_ingredients?: string | null
          custom_meal_name?: string | null
          fats: number
          id?: string
          log_date?: string
          logged_at?: string
          meal_type: string
          protein: number
          recipe_id?: string | null
          user_id: string
        }
        Update: {
          calories?: number
          carbs?: number
          created_at?: string | null
          custom_meal_ingredients?: string | null
          custom_meal_name?: string | null
          fats?: number
          id?: string
          log_date?: string
          logged_at?: string
          meal_type?: string
          protein?: number
          recipe_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_logs_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_milestones: {
        Row: {
          completed_at: string
          created_at: string | null
          id: string
          meal_type: string | null
          milestone_date: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string | null
          id?: string
          meal_type?: string | null
          milestone_date: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string | null
          id?: string
          meal_type?: string | null
          milestone_date?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          created_at: string | null
          day_of_week: string
          id: string
          meal_type: Database["public"]["Enums"]["meal_type"]
          recipe_id: string
          servings: number
          updated_at: string | null
          user_id: string
          week_start_date: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: string
          id?: string
          meal_type: Database["public"]["Enums"]["meal_type"]
          recipe_id: string
          servings?: number
          updated_at?: string | null
          user_id: string
          week_start_date: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: string
          id?: string
          meal_type?: Database["public"]["Enums"]["meal_type"]
          recipe_id?: string
          servings?: number
          updated_at?: string | null
          user_id?: string
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          access_level: Database["public"]["Enums"]["access_level"]
          calories: number
          carbs: number
          cook_time: number | null
          created_at: string | null
          description: string | null
          diet_type: Database["public"]["Enums"]["diet_type"]
          difficulty: string | null
          fats: number
          fiber: number | null
          id: string
          image_url: string | null
          ingredients: Json
          instructions: Json
          meal_type: Database["public"]["Enums"]["meal_type"]
          prep_time: number | null
          protein: number
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["access_level"]
          calories: number
          carbs: number
          cook_time?: number | null
          created_at?: string | null
          description?: string | null
          diet_type: Database["public"]["Enums"]["diet_type"]
          difficulty?: string | null
          fats: number
          fiber?: number | null
          id?: string
          image_url?: string | null
          ingredients?: Json
          instructions?: Json
          meal_type: Database["public"]["Enums"]["meal_type"]
          prep_time?: number | null
          protein: number
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          access_level?: Database["public"]["Enums"]["access_level"]
          calories?: number
          carbs?: number
          cook_time?: number | null
          created_at?: string | null
          description?: string | null
          diet_type?: Database["public"]["Enums"]["diet_type"]
          difficulty?: string | null
          fats?: number
          fiber?: number | null
          id?: string
          image_url?: string | null
          ingredients?: Json
          instructions?: Json
          meal_type?: Database["public"]["Enums"]["meal_type"]
          prep_time?: number | null
          protein?: number
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          recipe_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          recipe_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_goals: {
        Row: {
          created_at: string | null
          estimated_timeline_days: number | null
          goal_type: string
          id: string
          target_body_type: string | null
          target_weight: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          estimated_timeline_days?: number | null
          goal_type: string
          id?: string
          target_body_type?: string | null
          target_weight?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          estimated_timeline_days?: number | null
          goal_type?: string
          id?: string
          target_body_type?: string | null
          target_weight?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_medical: {
        Row: {
          allergies: string[] | null
          blood_pressure: string | null
          created_at: string | null
          diabetes: boolean | null
          id: string
          other_conditions: string | null
          thyroid: boolean | null
          updated_at: string | null
          uric_acid: boolean | null
          user_id: string
        }
        Insert: {
          allergies?: string[] | null
          blood_pressure?: string | null
          created_at?: string | null
          diabetes?: boolean | null
          id?: string
          other_conditions?: string | null
          thyroid?: boolean | null
          updated_at?: string | null
          uric_acid?: boolean | null
          user_id: string
        }
        Update: {
          allergies?: string[] | null
          blood_pressure?: string | null
          created_at?: string | null
          diabetes?: boolean | null
          id?: string
          other_conditions?: string | null
          thyroid?: boolean | null
          updated_at?: string | null
          uric_acid?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      user_nutrition_summary: {
        Row: {
          created_at: string | null
          daily_calories: number | null
          daily_carbs: number | null
          daily_fats: number | null
          daily_fiber: number | null
          daily_protein: number | null
          daily_water: number | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          daily_calories?: number | null
          daily_carbs?: number | null
          daily_fats?: number | null
          daily_fiber?: number | null
          daily_protein?: number | null
          daily_water?: number | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          daily_calories?: number | null
          daily_carbs?: number | null
          daily_fats?: number | null
          daily_fiber?: number | null
          daily_protein?: number | null
          daily_water?: number | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          age: number | null
          body_type: string | null
          created_at: string | null
          full_name: string | null
          gender: string | null
          has_onboarded: boolean | null
          height: number | null
          id: string
          updated_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          body_type?: string | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          has_onboarded?: boolean | null
          height?: number | null
          id?: string
          updated_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          body_type?: string | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          has_onboarded?: boolean | null
          height?: number | null
          id?: string
          updated_at?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      user_progress_entries: {
        Row: {
          body_fat_percentage: number | null
          created_at: string | null
          entry_date: string
          id: string
          milestone_notes: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          body_fat_percentage?: number | null
          created_at?: string | null
          entry_date?: string
          id?: string
          milestone_notes?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          body_fat_percentage?: number | null
          created_at?: string | null
          entry_date?: string
          id?: string
          milestone_notes?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean
          start_date: string
          subscription_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string
          subscription_type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string
          subscription_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      access_level: "guest" | "logged_in" | "subscribed"
      diet_type: "veg" | "non_veg"
      meal_type: "breakfast" | "lunch" | "dinner" | "snack"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_level: ["guest", "logged_in", "subscribed"],
      diet_type: ["veg", "non_veg"],
      meal_type: ["breakfast", "lunch", "dinner", "snack"],
    },
  },
} as const
