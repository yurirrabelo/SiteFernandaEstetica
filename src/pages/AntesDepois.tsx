import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface BeforeAfterItem {
  id: string;
  treatment: string;
  description: string;
  sessions: string;
  before_image_url: string | null;
  after_image_url: string | null;
}

const AntesDepois = () => {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.from("before_after").select("*").eq("visible", true).order("sort_order").then(({ data }) => {
      if (data) {
        setItems(data as BeforeAfterItem[]);
        setSliderPositions(data.reduce((acc, item) => ({ ...acc, [item.id]: 50 }), {}));
      }
    });
  }, []);

  const openWhatsApp = (treatmentName: string) => {
    const message = encodeURIComponent(`Olá! Vim pelo site e gostaria de saber mais sobre os tratamentos. Vi os resultados de: ${treatmentName}`);
    window.open(`https://wa.me/5547999445800?text=${message}`, "_blank");
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider mb-4"><Sparkles size={16} />Resultados Reais</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">Antes e <span className="text-gradient-primary">Depois</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Veja as transformações reais de nossas clientes.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Em breve teremos resultados para mostrar!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-2xl overflow-hidden shadow-elevated">
                  <div className="relative aspect-square overflow-hidden">
                    {item.before_image_url ? (
                      <img src={item.before_image_url} alt="Antes" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center"><span className="text-muted-foreground/50 font-display text-xl">Antes</span></div>
                    )}
                    <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - (sliderPositions[item.id] || 50)}% 0 0)` }}>
                      {item.after_image_url ? (
                        <img src={item.after_image_url} alt="Depois" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-light via-secondary-light to-accent-light flex items-center justify-center"><span className="text-foreground/70 font-display text-xl">Depois</span></div>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 bg-card/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">Antes</div>
                    <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">Depois</div>
                    <div className="absolute top-0 bottom-0 w-0.5 bg-card shadow-lg z-10" style={{ left: `${sliderPositions[item.id] || 50}%` }}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card shadow-lg flex items-center justify-center">
                        <div className="flex gap-0.5"><div className="w-0.5 h-3 bg-primary rounded-full" /><div className="w-0.5 h-3 bg-primary rounded-full" /></div>
                      </div>
                    </div>
                    <input type="range" min="0" max="100" value={sliderPositions[item.id] || 50} onChange={e => setSliderPositions(prev => ({ ...prev, [item.id]: Number(e.target.value) }))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-semibold text-foreground">{item.treatment}</h3>
                      <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full whitespace-nowrap">{item.sessions}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <Button onClick={() => openWhatsApp(item.treatment)} variant="outline" size="sm" className="w-full border-primary/30">Quero esse Resultado<ArrowRight size={14} className="ml-2" /></Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AntesDepois;
