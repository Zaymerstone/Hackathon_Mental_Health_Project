-- Create a function to look up seeker email by username (SECURITY DEFINER to bypass RLS)
CREATE OR REPLACE FUNCTION public.get_seeker_email_by_username(username text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM help_seekers 
  WHERE LOWER(display_name) = LOWER(username)
  LIMIT 1;
$$;