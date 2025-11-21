-- Allow snack2 in meal_milestones.meal_type check constraint
ALTER TABLE public.meal_milestones
  DROP CONSTRAINT IF EXISTS meal_milestones_meal_type_check;

ALTER TABLE public.meal_milestones
  ADD CONSTRAINT meal_milestones_meal_type_check
  CHECK (meal_type IS NULL OR meal_type IN ('breakfast','lunch','dinner','snack','snack2'));

-- Ensure meal_logs.meal_type also accepts snack2
ALTER TABLE public.meal_logs
  DROP CONSTRAINT IF EXISTS meal_logs_meal_type_check;

ALTER TABLE public.meal_logs
  ADD CONSTRAINT meal_logs_meal_type_check
  CHECK (meal_type IN ('breakfast','lunch','dinner','snack','snack2'));