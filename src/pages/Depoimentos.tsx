import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  treatment: string;
  avatar: string;
}

const Depoimentos = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    supabase.from("testimonials").select("*").eq("visible", true).order("sort_order").then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data as Testimonial[]);
    });
  }, []);

  const next = () => setCurrentIndex(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) {
    return (
      <Layout>
        <section className="pt-32 pb-16 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">Depoimentos</h1>
              <p className="text-lg text-muted-foreground">Em breve teremos depoimentos para mostrar!</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">O que Nossas <span className="text-gradient-primary">Clientes</span> Dizem</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">A satisfação de nossas clientes é nossa maior recompensa.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-card rounded-3xl p-8 md:p-12 shadow-floating relative">
                <Quote size={64} className="absolute top-8 right-8 text-primary/10" />
                <div className="flex gap-1 mb-6">{Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => <Star key={i} size={24} className="fill-accent text-accent" />)}</div>
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-display">"{testimonials[currentIndex].content}"</blockquote>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">{testimonials[currentIndex].avatar || testimonials[currentIndex].name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                    <div>
                      <div className="font-display font-semibold text-foreground text-lg">{testimonials[currentIndex].name}</div>
                      <div className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</div>
                    </div>
                  </div>
                  {testimonials[currentIndex].treatment && <div className="bg-secondary/10 px-4 py-2 rounded-full text-secondary text-sm font-medium">{testimonials[currentIndex].treatment}</div>}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prev} className="rounded-full border-primary/30"><ChevronLeft size={20} /></Button>
              <div className="flex gap-2">{testimonials.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "bg-primary/30 hover:bg-primary/50"}`} />)}</div>
              <Button variant="outline" size="icon" onClick={next} className="rounded-full border-primary/30"><ChevronRight size={20} /></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-display font-semibold text-foreground">Mais Depoimentos</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-2xl p-6 shadow-elevated">
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}</div>
                <p className="text-foreground mb-4 line-clamp-4">"{t.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center text-secondary-foreground font-medium text-sm">{t.avatar || t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.treatment}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Depoimentos;
