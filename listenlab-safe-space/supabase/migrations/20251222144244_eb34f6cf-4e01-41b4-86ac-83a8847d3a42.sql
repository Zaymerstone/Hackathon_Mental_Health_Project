-- Make forum author/commenter display info self-contained so posts are visible without reading other students' private profiles

-- forum_posts: add author display fields
ALTER TABLE public.forum_posts
ADD COLUMN IF NOT EXISTS author_name text,
ADD COLUMN IF NOT EXISTS author_university text;

-- Backfill existing posts from students table
UPDATE public.forum_posts fp
SET author_name = COALESCE(fp.author_name, s.full_name, 'Anonymous'),
    author_university = COALESCE(fp.author_university, s.university_name)
FROM public.students s
WHERE s.id = fp.student_id;

-- Ensure non-null author_name (safe fallback)
UPDATE public.forum_posts
SET author_name = COALESCE(author_name, 'Anonymous')
WHERE author_name IS NULL;

ALTER TABLE public.forum_posts
ALTER COLUMN author_name SET DEFAULT 'Anonymous',
ALTER COLUMN author_name SET NOT NULL;


-- forum_comments: add commenter display fields
ALTER TABLE public.forum_comments
ADD COLUMN IF NOT EXISTS author_name text;

-- Backfill existing comments from students table
UPDATE public.forum_comments fc
SET author_name = COALESCE(fc.author_name, s.full_name, 'Anonymous')
FROM public.students s
WHERE s.id = fc.student_id;

UPDATE public.forum_comments
SET author_name = COALESCE(author_name, 'Anonymous')
WHERE author_name IS NULL;

ALTER TABLE public.forum_comments
ALTER COLUMN author_name SET DEFAULT 'Anonymous',
ALTER COLUMN author_name SET NOT NULL;