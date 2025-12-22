-- Fix 1: Allow students to read seeker profiles (needed for chat session creation)
CREATE POLICY "Students can view seeker profiles for chat matching"
ON public.help_seekers
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM students WHERE students.user_id = auth.uid()
  )
);

-- Fix 2: Restrict students table - only allow viewing own profile (security fix)
DROP POLICY IF EXISTS "Students can view all student profiles" ON public.students;

CREATE POLICY "Students can view their own profile"
ON public.students
FOR SELECT
USING (auth.uid() = user_id);