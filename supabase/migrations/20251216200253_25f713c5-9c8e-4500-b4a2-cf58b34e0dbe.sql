-- Create table for job poster accounts
CREATE TABLE public.job_posters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint on email
CREATE UNIQUE INDEX idx_job_posters_email ON public.job_posters(email);

-- Enable Row Level Security
ALTER TABLE public.job_posters ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can register as job poster)
CREATE POLICY "Anyone can create job poster account"
ON public.job_posters
FOR INSERT
WITH CHECK (true);

-- Only service role can view (for admin purposes)
CREATE POLICY "Service role can view job posters"
ON public.job_posters
FOR SELECT
USING (false);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_job_posters_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_job_posters_updated_at
BEFORE UPDATE ON public.job_posters
FOR EACH ROW
EXECUTE FUNCTION public.update_job_posters_updated_at();