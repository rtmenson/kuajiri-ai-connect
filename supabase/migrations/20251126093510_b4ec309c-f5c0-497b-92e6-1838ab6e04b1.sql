-- Create waitlist_submissions table
CREATE TABLE public.waitlist_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_type TEXT NOT NULL CHECK (user_type IN ('jobseeker', 'jobposter')),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit to waitlist (public form)
CREATE POLICY "Anyone can submit to waitlist"
ON public.waitlist_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Prevent public reading for privacy
CREATE POLICY "Only service role can view waitlist"
ON public.waitlist_submissions
FOR SELECT
USING (false);

-- Create indexes for performance
CREATE INDEX idx_waitlist_email ON public.waitlist_submissions(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist_submissions(created_at DESC);