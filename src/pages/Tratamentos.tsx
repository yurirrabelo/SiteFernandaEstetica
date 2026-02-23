import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Leaf,
  Heart,
  Sun,
  Droplets,
  Flower2,
  ArrowRight,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import facialImage from "@/assets/facial-treatment.jpg";
import holisticImage from "@/assets/holistic-therapy.jpg";
import bodyImage from "@/assets/body-treatment.jpg";

const categories = [
  { id: "all", label: "Todos" },
  { id: "facial", label: "Faciais" },
  { id: "corporal", label: "Corporais" },
  { id: "holistico", label: "Holísticos" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Sparkles,
  Sun,
  Droplets,
  Flower2,
  Heart,
  Leaf,
};

const fallbackImages: Record<string, string> = {
  facial: facialImage,
  corporal: bodyImage,
  holistico: holisticImage,
};

interface Treatment {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  benefits: string[];
  icon: string;
  image_url: string | null;
  visible: boolean;
  sort_order: number;
}

const Tratamentos = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatments = async () => {
      const { data } = await supabase
        .from("treatments")
        .select("*")
        .eq("visible", true)
        .order("sort_order");
      if (data) setTreatments(data as Treatment[]);
      setLoading(false);
    };
    fetchTreatments();
  }, []);

  const filteredTreatments =
    activeCategory === "all"
      ? treatments
      : treatments.filter((t) => t.category === activeCategory);

  const openWhatsApp = (treatmentName: string) => {
    const message = encodeURIComponent(
      `Olá! Vim pelo site e gostaria de saber mais sobre os tratamentos. Tratamento: ${treatmentName}`
    );
    window.open(`https://wa.me/5547999445800?text=${message}`, "_blank");
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
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
              Nossos <span className="text-gradient-primary">Tratamentos</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conheça nossa linha completa de tratamentos estéticos e terapias
              holísticas, desenvolvidos para cuidar da sua beleza e bem-estar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "gradient-primary text-primary-foreground shadow-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-muted-foreground py-12">Carregando tratamentos...</div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredTreatments.map((treatment) => {
                  const IconComponent = iconMap[treatment.icon] || Sparkles;
                  const image = treatment.image_url || fallbackImages[treatment.category] || facialImage;

                  return (
                    <motion.div
                      key={treatment.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-card rounded-2xl overflow-hidden shadow-elevated hover:shadow-floating transition-all"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={image}
                          alt={treatment.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              treatment.category === "facial"
                                ? "bg-primary/90 text-primary-foreground"
                                : treatment.category === "corporal"
                                ? "bg-secondary/90 text-secondary-foreground"
                                : "bg-accent/90 text-accent-foreground"
                            }`}
                          >
                            <IconComponent size={20} />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Clock size={12} />
                          {treatment.duration}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                          {treatment.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {treatment.description}
                        </p>

                        {/* Benefits */}
                        <div className="space-y-2 mb-4">
                          {treatment.benefits.map((benefit, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Check size={14} className="text-secondary" />
                              {benefit}
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => openWhatsApp(treatment.title)}
                          className="w-full gradient-primary shadow-primary"
                        >
                          Agendar Consulta
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Tratamentos;
