import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const beforeAfterItems = [
  {
    id: 1,
    treatment: "Limpeza de Pele Profunda",
    beforeLabel: "Antes",
    afterLabel: "Depois",
  },
  {
    id: 2,
    treatment: "Rejuvenescimento Facial",
    beforeLabel: "Antes",
    afterLabel: "Depois",
  },
  {
    id: 3,
    treatment: "Tratamento para Manchas",
    beforeLabel: "Antes",
    afterLabel: "Depois",
  },
];

const BeforeAfterPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section ref={containerRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider mb-4">
            <Sparkles size={16} />
            Resultados Reais
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Antes e Depois
          </h2>
          <p className="text-muted-foreground">
            Veja as transformações reais de nossas clientes. Resultados que falam por si.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Before/After */}
          <motion.div
            style={{ y }}
            className="relative aspect-square max-w-md mx-auto w-full rounded-3xl overflow-hidden shadow-floating"
          >
            {/* Placeholder for before/after images - using gradient demonstration */}
            <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted/50">
              {/* After layer */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-primary-light to-secondary-light"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              />
              
              {/* Labels */}
              <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                Antes
              </div>
              <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                Depois
              </div>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-foreground/70 text-sm mb-2">
                    Deslize para revelar
                  </p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {beforeAfterItems[activeIndex].treatment}
                  </p>
                </div>
              </div>

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-card shadow-lg"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-4 bg-primary rounded-full" />
                    <div className="w-0.5 h-4 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Range input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </motion.div>

          {/* Treatment selector */}
          <div className="space-y-6">
            <div className="space-y-4">
              {beforeAfterItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    activeIndex === index
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.treatment}</span>
                    <ArrowRight
                      size={18}
                      className={activeIndex === index ? "opacity-100" : "opacity-0"}
                    />
                  </div>
                </motion.button>
              ))}
            </div>

            <Button asChild size="lg" className="w-full gradient-primary shadow-primary">
              <Link to="/antes-depois">
                Ver Galeria Completa
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterPreview;
