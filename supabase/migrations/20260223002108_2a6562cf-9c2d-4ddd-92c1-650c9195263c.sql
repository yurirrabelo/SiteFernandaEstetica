
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: only admins can read roles
CREATE POLICY "Admins can view roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Treatments table
CREATE TABLE public.treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('facial', 'corporal', 'holistico')),
  duration TEXT NOT NULL DEFAULT '60 min',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  image_url TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

-- Anyone can read visible treatments
CREATE POLICY "Anyone can view visible treatments"
ON public.treatments FOR SELECT
USING (visible = true);

-- Admins can view all treatments (including hidden)
CREATE POLICY "Admins can view all treatments"
ON public.treatments FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert treatments
CREATE POLICY "Admins can insert treatments"
ON public.treatments FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update treatments
CREATE POLICY "Admins can update treatments"
ON public.treatments FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete treatments
CREATE POLICY "Admins can delete treatments"
ON public.treatments FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_treatments_updated_at
BEFORE UPDATE ON public.treatments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for treatment images
INSERT INTO storage.buckets (id, name, public) VALUES ('treatment-images', 'treatment-images', true);

-- Anyone can view treatment images
CREATE POLICY "Public can view treatment images"
ON storage.objects FOR SELECT
USING (bucket_id = 'treatment-images');

-- Admins can upload treatment images
CREATE POLICY "Admins can upload treatment images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'treatment-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins can update treatment images
CREATE POLICY "Admins can update treatment images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'treatment-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete treatment images
CREATE POLICY "Admins can delete treatment images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'treatment-images' AND public.has_role(auth.uid(), 'admin'));
