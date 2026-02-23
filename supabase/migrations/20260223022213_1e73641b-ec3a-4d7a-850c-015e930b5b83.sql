
-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Cliente',
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  treatment TEXT NOT NULL DEFAULT '',
  avatar TEXT NOT NULL DEFAULT '',
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible testimonials" ON public.testimonials FOR SELECT USING (visible = true);
CREATE POLICY "Admins can view all testimonials" ON public.testimonials FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update testimonials" ON public.testimonials FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete testimonials" ON public.testimonials FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Before/After table
CREATE TABLE public.before_after (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  treatment TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sessions TEXT NOT NULL DEFAULT '1 sessão',
  before_image_url TEXT,
  after_image_url TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible before_after" ON public.before_after FOR SELECT USING (visible = true);
CREATE POLICY "Admins can view all before_after" ON public.before_after FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert before_after" ON public.before_after FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update before_after" ON public.before_after FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete before_after" ON public.before_after FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_before_after_updated_at BEFORE UPDATE ON public.before_after FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Site Images table (for hero, about, etc.)
CREATE TABLE public.site_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  alt_text TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site_images" ON public.site_images FOR SELECT USING (true);
CREATE POLICY "Admins can insert site_images" ON public.site_images FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update site_images" ON public.site_images FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete site_images" ON public.site_images FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_site_images_updated_at BEFORE UPDATE ON public.site_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial site_images for existing sections
INSERT INTO public.site_images (section, label, alt_text, sort_order) VALUES
  ('hero', 'Imagem Principal', 'Fernanda Concolatto - Estética & Holística', 1),
  ('about_history', 'Interior da Clínica', 'Interior do Espaço Harmonia', 1),
  ('about_founder', 'Sala de Tratamento', 'Sala de Tratamento', 1);
