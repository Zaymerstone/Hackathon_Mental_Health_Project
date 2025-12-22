-- Drop the existing restrictive SELECT policy
DROP POLICY IF EXISTS "Students can view all forum posts" ON public.forum_posts;

-- Create a permissive SELECT policy for all authenticated students
CREATE POLICY "Students can view all forum posts"
ON public.forum_posts
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM students WHERE students.user_id = auth.uid()
  )
);

-- Also fix the forum_comments SELECT policy if it has the same issue
DROP POLICY IF EXISTS "Students can view all forum comments" ON public.forum_comments;

CREATE POLICY "Students can view all forum comments"
ON public.forum_comments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM students WHERE students.user_id = auth.uid()
  )
);