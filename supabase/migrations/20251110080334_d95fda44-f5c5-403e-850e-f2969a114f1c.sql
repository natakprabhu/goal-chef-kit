-- Create user_profiles table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  age INTEGER CHECK (age > 0 AND age < 150),
  weight DECIMAL(5,2) CHECK (weight > 0),
  height DECIMAL(5,2) CHECK (height > 0),
  body_type TEXT CHECK (body_type IN ('short', 'tall', 'lean', 'toned', 'muscular', 'large')),
  has_onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_medical table
CREATE TABLE public.user_medical (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  thyroid BOOLEAN DEFAULT FALSE,
  diabetes BOOLEAN DEFAULT FALSE,
  blood_pressure TEXT CHECK (blood_pressure IN ('normal', 'high', 'low')),
  uric_acid BOOLEAN DEFAULT FALSE,
  allergies TEXT[],
  other_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_goals table
CREATE TABLE public.user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  goal_type TEXT CHECK (goal_type IN ('cutting', 'gaining', 'maintenance', 'healthy_lifestyle', 'medical')) NOT NULL,
  target_body_type TEXT CHECK (target_body_type IN ('short', 'tall', 'lean', 'toned', 'muscular', 'large')),
  target_weight DECIMAL(5,2),
  estimated_timeline_days INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_nutrition_summary table
CREATE TABLE public.user_nutrition_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  daily_calories INTEGER CHECK (daily_calories > 0),
  daily_protein DECIMAL(6,2) CHECK (daily_protein >= 0),
  daily_carbs DECIMAL(6,2) CHECK (daily_carbs >= 0),
  daily_fats DECIMAL(6,2) CHECK (daily_fats >= 0),
  daily_fiber DECIMAL(6,2) CHECK (daily_fiber >= 0),
  daily_water DECIMAL(6,2) CHECK (daily_water >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress_entries table
CREATE TABLE public.user_progress_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight DECIMAL(5,2) CHECK (weight > 0),
  body_fat_percentage DECIMAL(4,2) CHECK (body_fat_percentage >= 0 AND body_fat_percentage <= 100),
  milestone_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, entry_date)
);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_medical ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_nutrition_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_medical
CREATE POLICY "Users can view their own medical data"
  ON public.user_medical FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medical data"
  ON public.user_medical FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medical data"
  ON public.user_medical FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_goals
CREATE POLICY "Users can view their own goals"
  ON public.user_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON public.user_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.user_goals FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_nutrition_summary
CREATE POLICY "Users can view their own nutrition summary"
  ON public.user_nutrition_summary FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nutrition summary"
  ON public.user_nutrition_summary FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutrition summary"
  ON public.user_nutrition_summary FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_progress_entries
CREATE POLICY "Users can view their own progress entries"
  ON public.user_progress_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress entries"
  ON public.user_progress_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress entries"
  ON public.user_progress_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress entries"
  ON public.user_progress_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_medical_updated_at
  BEFORE UPDATE ON public.user_medical
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_goals_updated_at
  BEFORE UPDATE ON public.user_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_nutrition_summary_updated_at
  BEFORE UPDATE ON public.user_nutrition_summary
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to automatically create user_profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();