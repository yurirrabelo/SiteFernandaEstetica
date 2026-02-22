import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const beforeAfterItems = [
  {
    id: 1,
    treatment: "Limpeza de Pele Profunda",
    description: "Remoção de comedões e impurezas com resultado imediato.",
    sessions: "1 sessão",
  },
  {
    id: 2,
    treatment: "Peeling Químico",
    description: "Renovação celular e clareamento de manchas.",
    sessions: "4 sessões",
  },
  {
    id: 3,
    treatment: "Microagulhamento",
    description: "Estímulo de colágeno para rejuvenescimento.",
    sessions: "3 sessões",
  },
  {
    id: 4,
    treatment: "Tratamento Anti-Acne",
    description: "Controle da oleosidade e redução de lesões.",
    sessions: "6 sessões",
  },
  {
    id: 5,
    treatment: "Rejuvenescimento Facial",
    description: "Protocolo completo para pele mais jovem.",
    sessions: "8 sessões",
  },
  {
    id: 6,
    treatment: "Modelagem Corporal",
    description: "Redução de medidas e definição de contornos.",
    sessions: "10 sessões",
  },
];

const AntesDepois = () => {
  const [sliderPositions, setSliderPositions] = useState<{ [key: number]: number }>(
    beforeAfterItems.reduce((acc, item) => ({ ...acc, [item.id]: 50 }), {})
  );

  const handleSliderChange = (id: number, value: number) => {
    setSliderPositions((prev) => ({ ...prev, [id]: value }));
  };

  const openWhatsApp = (treatmentName: string) => {
    const message = encodeURIComponent(
      `Olá! Vi os resultados do tratamento "${treatmentName}" e gostaria de saber mais.`
    );
    window.open(`https://wa.me/5547994458005?text=${message}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider mb-4">
              <Sparkles size={16} />
              Resultados Reais
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
              Antes e <span className="text-gradient-primary">Depois</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Veja as transformações reais de nossas clientes. Deslize para
              revelar os resultados impressionantes dos nossos tratamentos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow-elevated"
              >
                {/* Before/After Slider */}
                <div className="relative aspect-square overflow-hidden">
                  {/* Before layer (gray/muted) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center">
                    <span className="text-muted-foreground/50 font-display text-xl">
                      Antes
                    </span>
                  </div>

                  {/* After layer (beautiful gradient) */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary-light via-secondary-light to-accent-light flex items-center justify-center"
                    style={{
                      clipPath: `inset(0 ${100 - sliderPositions[item.id]}% 0 0)`,
                    }}
                  >
                    <span className="text-foreground/70 font-display text-xl">
                      Depois
                    </span>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-3 left-3 bg-card/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    Antes
                  </div>
                  <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    Depois
                  </div>

                  {/* Slider line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-card shadow-lg z-10"
                    style={{ left: `${sliderPositions[item.id]}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card shadow-lg flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-3 bg-primary rounded-full" />
                        <div className="w-0.5 h-3 bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Range input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPositions[item.id]}
                    onChange={(e) =>
                      handleSliderChange(item.id, Number(e.target.value))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold text-foreground">
                      {item.treatment}
                    </h3>
                    <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      {item.sessions}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>
                  <Button
                    onClick={() => openWhatsApp(item.treatment)}
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30"
                  >
                    Quero esse Resultado
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Quer Resultados como Esses?
            </h2>
            <p className="text-muted-foreground mb-8">
              Agende sua avaliação gratuita e descubra o tratamento ideal para
              você. Nossa equipe vai criar um protocolo personalizado para suas
              necessidades.
            </p>
            <Button
              onClick={() => {
                const message = encodeURIComponent(
                  "Olá! Gostaria de agendar uma avaliação para conhecer os tratamentos."
                );
                window.open(`https://wa.me/5547994458005?text=${message}`, "_blank");
              }}
              size="lg"
              className="gradient-primary shadow-primary"
            >
              Agendar Avaliação Gratuita
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AntesDepois;
