-- Add total_minutes_online column to students table for tracking logged-in time
ALTER TABLE public.students 
ADD COLUMN total_minutes_online integer DEFAULT 0;