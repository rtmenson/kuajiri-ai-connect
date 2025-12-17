-- Add name and email columns to salary_submissions table for unlocking reports
ALTER TABLE public.salary_submissions 
ADD COLUMN full_name text,
ADD COLUMN email text;