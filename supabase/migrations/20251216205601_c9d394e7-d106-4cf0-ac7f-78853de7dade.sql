-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can submit to waitlist" ON public.waitlist_submissions;

-- Create permissive INSERT policy
CREATE POLICY "Anyone can submit to waitlist" 
ON public.waitlist_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);