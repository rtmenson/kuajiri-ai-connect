-- Create table for salary submissions (crowdsourced data)
CREATE TABLE public.salary_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  years_experience INTEGER NOT NULL,
  location TEXT NOT NULL,
  current_salary DECIMAL(12, 2),
  expected_salary DECIMAL(12, 2),
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.salary_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit salary data)
CREATE POLICY "Anyone can submit salary data"
ON public.salary_submissions
FOR INSERT
WITH CHECK (true);

-- Allow public reads for aggregated data (needed for salary comparisons)
CREATE POLICY "Anyone can view salary data"
ON public.salary_submissions
FOR SELECT
USING (true);

-- Create indexes for common queries
CREATE INDEX idx_salary_job_title ON public.salary_submissions(job_title);
CREATE INDEX idx_salary_location ON public.salary_submissions(location);
CREATE INDEX idx_salary_experience ON public.salary_submissions(years_experience);