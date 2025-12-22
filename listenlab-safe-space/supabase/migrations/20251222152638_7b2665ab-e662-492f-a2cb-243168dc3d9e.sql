-- Ensure student levels update automatically whenever XP changes
DROP TRIGGER IF EXISTS trg_update_student_level ON public.students;

CREATE TRIGGER trg_update_student_level
BEFORE INSERT OR UPDATE OF xp
ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_student_level();

-- Backfill: normalize null XP to 0 and force trigger recalculation
UPDATE public.students
SET xp = COALESCE(xp, 0);