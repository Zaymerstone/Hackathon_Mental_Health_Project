-- Create forum_posts table
CREATE TABLE public.forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum_comments table (for counting, functionality later)
CREATE TABLE public.forum_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;

-- Forum posts policies: All authenticated students can view all posts
CREATE POLICY "Students can view all forum posts"
ON public.forum_posts
FOR SELECT
TO authenticated
USING (true);

-- Students can create their own posts
CREATE POLICY "Students can create their own forum posts"
ON public.forum_posts
FOR INSERT
TO authenticated
WITH CHECK (student_id IN (
  SELECT id FROM public.students WHERE user_id = auth.uid()
));

-- Students can delete their own posts
CREATE POLICY "Students can delete their own forum posts"
ON public.forum_posts
FOR DELETE
TO authenticated
USING (student_id IN (
  SELECT id FROM public.students WHERE user_id = auth.uid()
));

-- Forum comments policies: All authenticated students can view all comments
CREATE POLICY "Students can view all forum comments"
ON public.forum_comments
FOR SELECT
TO authenticated
USING (true);

-- Students can create their own comments
CREATE POLICY "Students can create their own forum comments"
ON public.forum_comments
FOR INSERT
TO authenticated
WITH CHECK (student_id IN (
  SELECT id FROM public.students WHERE user_id = auth.uid()
));

-- Students can delete their own comments
CREATE POLICY "Students can delete their own forum comments"
ON public.forum_comments
FOR DELETE
TO authenticated
USING (student_id IN (
  SELECT id FROM public.students WHERE user_id = auth.uid()
));

-- Add trigger for updated_at on forum_posts
CREATE TRIGGER update_forum_posts_updated_at
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for forum posts
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_posts;