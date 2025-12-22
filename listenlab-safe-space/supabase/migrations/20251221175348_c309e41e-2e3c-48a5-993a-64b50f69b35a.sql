-- Drop the restrictive SELECT policy on students
DROP POLICY IF EXISTS "Students can view their own profile" ON public.students;

-- Create a new policy that allows all authenticated users to view all student profiles
-- This is needed for forum posts to show author info from other students
CREATE POLICY "Students can view all student profiles"
ON public.students
FOR SELECT
TO authenticated
USING (true);