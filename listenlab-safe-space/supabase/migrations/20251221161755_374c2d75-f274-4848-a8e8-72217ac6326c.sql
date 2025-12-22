-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  -- Training progress
  xp_points INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  completed_modules TEXT[] DEFAULT '{}',
  is_certified BOOLEAN DEFAULT FALSE,
  -- University affiliation
  university_name TEXT,
  student_id TEXT,
  professor_name TEXT,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create help_seekers table
CREATE TABLE public.help_seekers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  -- Preferences
  preferred_topics TEXT[] DEFAULT '{}',
  preferred_language TEXT DEFAULT 'en',
  availability_times JSONB,
  -- Session history tracking
  total_sessions INTEGER DEFAULT 0,
  last_session_at TIMESTAMP WITH TIME ZONE,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.help_seekers ENABLE ROW LEVEL SECURITY;

-- RLS policies for students
CREATE POLICY "Students can view their own profile"
  ON public.students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own profile"
  ON public.students FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile"
  ON public.students FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS policies for help_seekers
CREATE POLICY "Help seekers can view their own profile"
  ON public.help_seekers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Help seekers can insert their own profile"
  ON public.help_seekers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Help seekers can update their own profile"
  ON public.help_seekers FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_help_seekers_updated_at
  BEFORE UPDATE ON public.help_seekers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();