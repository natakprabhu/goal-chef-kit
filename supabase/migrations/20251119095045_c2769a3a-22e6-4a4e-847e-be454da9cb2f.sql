-- Add diet preference to user profiles
ALTER TABLE public.user_profiles 
ADD COLUMN diet_preference text CHECK (diet_preference IN ('veg', 'non_veg', 'both')) DEFAULT 'both';

COMMENT ON COLUMN public.user_profiles.diet_preference IS 'User dietary preference: veg, non_veg, or both';