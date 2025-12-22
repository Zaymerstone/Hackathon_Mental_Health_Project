-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Participants can send messages in their sessions" ON public.chat_messages;

-- Create a corrected INSERT policy that properly validates the sender
CREATE POLICY "Participants can send messages in their sessions"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (
  -- sender_id must be the current user's auth ID
  auth.uid() = sender_id
  AND
  -- Session must be active and user must be a participant
  session_id IN (
    SELECT cs.id
    FROM chat_sessions cs
    WHERE cs.status = 'active'
      AND (
        -- User is the student in this session
        (cs.student_id IN (SELECT s.id FROM students s WHERE s.user_id = auth.uid()))
        OR
        -- User is the seeker in this session
        (cs.seeker_id IN (SELECT hs.id FROM help_seekers hs WHERE hs.user_id = auth.uid()))
      )
  )
);