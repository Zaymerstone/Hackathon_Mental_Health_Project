-- Chat queue for users waiting to be matched
CREATE TABLE public.chat_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('student', 'seeker')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Chat sessions between student and help-seeker
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  seeker_id UUID NOT NULL REFERENCES public.help_seekers(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Chat messages within a session
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('student', 'seeker')),
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat queue policies
CREATE POLICY "Users can insert themselves into queue"
ON public.chat_queue FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete themselves from queue"
ON public.chat_queue FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Students can view seekers in queue"
ON public.chat_queue FOR SELECT
USING (
  user_type = 'seeker' AND 
  EXISTS (SELECT 1 FROM students WHERE user_id = auth.uid())
);

CREATE POLICY "Users can view their own queue entry"
ON public.chat_queue FOR SELECT
USING (auth.uid() = user_id);

-- Chat sessions policies
CREATE POLICY "Participants can view their sessions"
ON public.chat_sessions FOR SELECT
USING (
  student_id IN (SELECT id FROM students WHERE user_id = auth.uid()) OR
  seeker_id IN (SELECT id FROM help_seekers WHERE user_id = auth.uid())
);

CREATE POLICY "Students can create sessions"
ON public.chat_sessions FOR INSERT
WITH CHECK (
  student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
);

CREATE POLICY "Participants can update their sessions"
ON public.chat_sessions FOR UPDATE
USING (
  student_id IN (SELECT id FROM students WHERE user_id = auth.uid()) OR
  seeker_id IN (SELECT id FROM help_seekers WHERE user_id = auth.uid())
);

-- Chat messages policies
CREATE POLICY "Participants can view messages in their sessions"
ON public.chat_messages FOR SELECT
USING (
  session_id IN (
    SELECT id FROM chat_sessions 
    WHERE student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
    OR seeker_id IN (SELECT id FROM help_seekers WHERE user_id = auth.uid())
  )
);

CREATE POLICY "Participants can send messages in their sessions"
ON public.chat_messages FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  session_id IN (
    SELECT id FROM chat_sessions 
    WHERE status = 'active' AND (
      student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
      OR seeker_id IN (SELECT id FROM help_seekers WHERE user_id = auth.uid())
    )
  )
);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_queue;

-- Create index for faster queue queries
CREATE INDEX idx_chat_queue_user_type ON public.chat_queue(user_type, joined_at);
CREATE INDEX idx_chat_messages_session ON public.chat_messages(session_id, created_at);
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(status);