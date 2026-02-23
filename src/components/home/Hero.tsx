import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImageFallback from "@/assets/hero-spa.jpg";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [heroImage, setHeroImage] = useState<string>(heroImageFallback);

  useEffect(() => {
    supabase
      .from("site_images")
      .select("image_url")
      .eq("section", "hero")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.image_url) setHeroImage(data.image_url);
      });
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Vim pelo site e gostaria de saber mais sobre os tratamentos.");
    window.open(`https://wa.me/5547999445800?text=${message}`, "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Fernanda Concolatto - Estética & Holística" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      <div className="container relative mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Bem-vinda ao seu refúgio de beleza</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground leading-tight mb-6"
          >
            Desperte sua <span className="text-gradient-primary">beleza natural</span> e encontre o{" "}
            <span className="text-secondary">equilíbrio interior</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
          >
            Estética avançada com abordagem holística. Pós Operatório, Botox, Beleza Facial e Corporal, Terapias.
            Cuidado integral para corpo e alma.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button onClick={openWhatsApp} size="lg" className="gradient-primary shadow-primary group">
              Agende sua Consulta
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" asChild className="border-primary/30 hover:bg-primary/5">
              <a href="#tratamentos">Conheça nossos Tratamentos</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50"
          >
            {[
              { value: "100+", label: "Clientes Satisfeitas" },
              { value: "10+", label: "Tratamentos" },
              { value: "18", label: "Anos de Experiência" },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-display font-semibold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
};

export default Hero;
