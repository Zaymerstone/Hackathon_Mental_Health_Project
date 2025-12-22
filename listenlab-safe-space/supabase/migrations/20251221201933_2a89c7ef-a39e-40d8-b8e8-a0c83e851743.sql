-- Add parent_comment_id column to forum_comments for nested replies
ALTER TABLE public.forum_comments 
ADD COLUMN parent_comment_id uuid REFERENCES public.forum_comments(id) ON DELETE CASCADE;

-- Create index for faster queries on parent comments
CREATE INDEX idx_forum_comments_parent ON public.forum_comments(parent_comment_id);

-- Add UPDATE policy so users can edit their comments (optional but good to have)
CREATE POLICY "Students can update their own forum comments"
ON public.forum_comments
FOR UPDATE
TO authenticated
USING (student_id IN (SELECT students.id FROM students WHERE students.user_id = auth.uid()))
WITH CHECK (student_id IN (SELECT students.id FROM students WHERE students.user_id = auth.uid()));