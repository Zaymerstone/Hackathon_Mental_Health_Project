-- Create levels table with XP thresholds
CREATE TABLE public.levels (
  level integer PRIMARY KEY,
  required_xp integer NOT NULL,
  name text NOT NULL,
  description text
);

-- Enable RLS
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;

-- Everyone can read levels
CREATE POLICY "Levels are viewable by everyone"
ON public.levels FOR SELECT
USING (true);

-- Insert level data with geometric progression
INSERT INTO public.levels (level, required_xp, name, description) VALUES
(1, 0, 'Newcomer', 'Just starting your journey'),
(2, 50, 'Beginner', 'Taking first steps'),
(3, 125, 'Learner', 'Building foundations'),
(4, 240, 'Explorer', 'Discovering new paths'),
(5, 420, 'Helper', 'Making a difference'),
(6, 750, 'Supporter', 'Reliable peer support'),
(7, 1250, 'Mentor', 'Guiding others'),
(8, 2100, 'Champion', 'Leading by example'),
(9, 3500, 'Expert', 'Mastering the craft'),
(10, 5800, 'Legend', 'Inspiring the community');

-- Function to calculate level from XP
CREATE OR REPLACE FUNCTION public.calculate_level_from_xp(xp_amount integer)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT level FROM public.levels WHERE required_xp <= xp_amount ORDER BY level DESC LIMIT 1),
    1
  );
$$;

-- Trigger function to auto-update current_level when xp changes
CREATE OR REPLACE FUNCTION public.update_student_level()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.current_level := public.calculate_level_from_xp(COALESCE(NEW.xp, 0));
  RETURN NEW;
END;
$$;

-- Create trigger on students table
CREATE TRIGGER on_student_xp_change
  BEFORE INSERT OR UPDATE OF xp ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_student_level();

-- Update existing students to have correct level based on their XP
UPDATE public.students 
SET current_level = public.calculate_level_from_xp(COALESCE(xp, 0));