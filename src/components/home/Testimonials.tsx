import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("visible", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setTestimonials(data as Testimonial[]);
      });
  }, []);

  if (testimonials.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-wider mb-4">
            <Star size={16} className="fill-accent" />
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            O que os clientes dizem
          </h2>
          <p className="text-muted-foreground">
            A satisfação das clientes é a maior recompensa.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated relative"
            >
              <Quote size={48} className="absolute top-6 right-6 text-primary/10" />

              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium">
                "{testimonials[current].content}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonials[current].avatar || testimonials[current].name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full border-primary/30 hover:bg-primary/5">
              <ChevronLeft size={20} />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? "w-8 bg-primary" : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full border-primary/30 hover:bg-primary/5">
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
