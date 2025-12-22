-- Create skills table
CREATE TABLE public.skills (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Skills are viewable by authenticated users
CREATE POLICY "Skills are viewable by authenticated users"
ON public.skills
FOR SELECT
USING (true);

-- Create student_skills junction table for tracking unlocked skills
CREATE TABLE public.student_skills (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(student_id, skill_id)
);

-- Enable RLS on student_skills
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;

-- Students can view their own skills
CREATE POLICY "Students can view their own skills"
ON public.student_skills
FOR SELECT
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Students can insert their own skills
CREATE POLICY "Students can insert their own skills"
ON public.student_skills
FOR INSERT
WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));