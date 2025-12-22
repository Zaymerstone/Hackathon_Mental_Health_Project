
-- 1. Modify existing students table to add new columns and remove array-based columns
ALTER TABLE public.students 
  ADD COLUMN IF NOT EXISTS current_level integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS cultural_background text,
  ADD COLUMN IF NOT EXISTS preferred_language text,
  ADD COLUMN IF NOT EXISTS availability_status boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS daily_session_limit integer DEFAULT 3,
  ADD COLUMN IF NOT EXISTS weekly_session_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_session_date timestamp with time zone;

-- Rename xp_points to xp for consistency (if it exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'xp_points') THEN
    ALTER TABLE public.students RENAME COLUMN xp_points TO xp;
  END IF;
END $$;

-- Drop the array-based columns that will be replaced by junction tables
ALTER TABLE public.students 
  DROP COLUMN IF EXISTS badges,
  DROP COLUMN IF EXISTS completed_modules;

-- 2. Create badges table
CREATE TABLE public.badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  required_xp integer DEFAULT 0,
  icon_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Badges are readable by all authenticated users
CREATE POLICY "Badges are viewable by authenticated users"
  ON public.badges FOR SELECT
  TO authenticated
  USING (true);

-- 3. Create student_badges junction table
CREATE TABLE public.student_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  awarded_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (student_id, badge_id)
);

ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own badges"
  ON public.student_badges FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert their own badges"
  ON public.student_badges FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- 4. Create milestones table
CREATE TABLE public.milestones (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  required_xp integer NOT NULL DEFAULT 0,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Milestones are viewable by authenticated users"
  ON public.milestones FOR SELECT
  TO authenticated
  USING (true);

-- 5. Create student_milestones junction table
CREATE TABLE public.student_milestones (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  milestone_id uuid NOT NULL REFERENCES public.milestones(id) ON DELETE CASCADE,
  achieved_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (student_id, milestone_id)
);

ALTER TABLE public.student_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own milestones"
  ON public.student_milestones FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert their own milestones"
  ON public.student_milestones FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- 6. Create reflections table
CREATE TABLE public.reflections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  conversation_id uuid, -- Placeholder for future FK to conversations table
  content text NOT NULL,
  what_learned text,
  challenges text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own reflections"
  ON public.reflections FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert their own reflections"
  ON public.reflections FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update their own reflections"
  ON public.reflections FOR UPDATE
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can delete their own reflections"
  ON public.reflections FOR DELETE
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- 7. Create training_modules table
CREATE TABLE public.training_modules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  content_url text,
  required boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Training modules are viewable by authenticated users"
  ON public.training_modules FOR SELECT
  TO authenticated
  USING (true);

-- 8. Create student_trainings table
CREATE TABLE public.student_trainings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  module_id uuid NOT NULL REFERENCES public.training_modules(id) ON DELETE CASCADE,
  completed_at timestamp with time zone,
  score integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (student_id, module_id)
);

ALTER TABLE public.student_trainings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own trainings"
  ON public.student_trainings FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert their own trainings"
  ON public.student_trainings FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update their own trainings"
  ON public.student_trainings FOR UPDATE
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- Create indexes for performance
CREATE INDEX idx_student_badges_student_id ON public.student_badges(student_id);
CREATE INDEX idx_student_badges_badge_id ON public.student_badges(badge_id);
CREATE INDEX idx_student_milestones_student_id ON public.student_milestones(student_id);
CREATE INDEX idx_student_milestones_milestone_id ON public.student_milestones(milestone_id);
CREATE INDEX idx_reflections_student_id ON public.reflections(student_id);
CREATE INDEX idx_reflections_conversation_id ON public.reflections(conversation_id);
CREATE INDEX idx_student_trainings_student_id ON public.student_trainings(student_id);
CREATE INDEX idx_student_trainings_module_id ON public.student_trainings(module_id);
