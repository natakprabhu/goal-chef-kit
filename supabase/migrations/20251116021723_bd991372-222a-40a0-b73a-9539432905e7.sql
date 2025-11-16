-- Create enum for access levels
CREATE TYPE public.access_level AS ENUM ('guest', 'logged_in', 'subscribed');

-- Create enum for meal types
CREATE TYPE public.meal_type AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');

-- Create enum for diet types
CREATE TYPE public.diet_type AS ENUM ('veg', 'non_veg');

-- Create recipes table
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  diet_type public.diet_type NOT NULL,
  meal_type public.meal_type NOT NULL,
  access_level public.access_level NOT NULL DEFAULT 'guest',
  cook_time INTEGER, -- in minutes
  prep_time INTEGER, -- in minutes
  difficulty TEXT,
  calories INTEGER NOT NULL,
  protein NUMERIC NOT NULL,
  carbs NUMERIC NOT NULL,
  fats NUMERIC NOT NULL,
  fiber NUMERIC,
  ingredients JSONB NOT NULL DEFAULT '[]', -- [{name, amount, unit, substitutable}]
  instructions JSONB NOT NULL DEFAULT '[]', -- [step1, step2, ...]
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_type TEXT NOT NULL DEFAULT 'free', -- free, premium, pro
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- Create meal_plans table
CREATE TABLE public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL, -- Monday, Tuesday, etc.
  meal_type public.meal_type NOT NULL,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  servings INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, day_of_week, meal_type, week_start_date)
);

-- Enable RLS on all tables
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for recipes (based on access level)
CREATE POLICY "Anyone can view guest recipes"
  ON public.recipes FOR SELECT
  USING (access_level = 'guest');

CREATE POLICY "Logged in users can view logged_in recipes"
  ON public.recipes FOR SELECT
  TO authenticated
  USING (access_level IN ('guest', 'logged_in'));

CREATE POLICY "Subscribed users can view all recipes"
  ON public.recipes FOR SELECT
  TO authenticated
  USING (
    access_level IN ('guest', 'logged_in') OR 
    (access_level = 'subscribed' AND 
     EXISTS (
       SELECT 1 FROM public.user_subscriptions 
       WHERE user_id = auth.uid() 
       AND is_active = true 
       AND (end_date IS NULL OR end_date > NOW())
     ))
  );

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription"
  ON public.user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
  ON public.user_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON public.user_subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for user_favorites
CREATE POLICY "Users can view their own favorites"
  ON public.user_favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON public.user_favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON public.user_favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for meal_plans
CREATE POLICY "Users can view their own meal plans"
  ON public.meal_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meal plans"
  ON public.meal_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meal plans"
  ON public.meal_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meal plans"
  ON public.meal_plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at
  BEFORE UPDATE ON public.meal_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_recipes_diet_type ON public.recipes(diet_type);
CREATE INDEX idx_recipes_meal_type ON public.recipes(meal_type);
CREATE INDEX idx_recipes_access_level ON public.recipes(access_level);
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX idx_meal_plans_user_id_week ON public.meal_plans(user_id, week_start_date);