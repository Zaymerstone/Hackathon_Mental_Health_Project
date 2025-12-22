-- Allow students to remove a seeker from the queue only after they have been matched in an active session.
-- This prevents stale queue entries (students previously could not delete seeker entries due to RLS).

CREATE POLICY "Students can delete matched seekers from queue"
ON public.chat_queue
FOR DELETE
TO authenticated
USING (
  chat_queue.user_type = 'seeker'
  AND EXISTS (
    SELECT 1
    FROM public.help_seekers hs
    JOIN public.chat_sessions cs
      ON cs.seeker_id = hs.id
    WHERE hs.user_id = chat_queue.user_id
      AND cs.status = 'active'
      AND cs.student_id IN (
        SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()
      )
  )
);
