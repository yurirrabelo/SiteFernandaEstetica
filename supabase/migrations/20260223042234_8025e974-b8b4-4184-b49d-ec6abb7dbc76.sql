
-- Create contacts/leads table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Anyone can insert contacts"
ON public.contacts
FOR INSERT
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view contacts"
ON public.contacts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update (mark as read)
CREATE POLICY "Admins can update contacts"
ON public.contacts
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete contacts"
ON public.contacts
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
