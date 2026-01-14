-- Lock down salary_submissions: remove public read access to PII/salary data

-- Ensure RLS is enabled (safe if already enabled)
ALTER TABLE public.salary_submissions ENABLE ROW LEVEL SECURITY;

-- Remove the public-readable policy
DROP POLICY IF EXISTS "Anyone can view salary data" ON public.salary_submissions;

-- Explicitly deny SELECTs for all non-privileged roles (backend service role bypasses RLS)
CREATE POLICY "Only backend can view salary submissions"
ON public.salary_submissions
AS RESTRICTIVE
FOR SELECT
USING (false);
