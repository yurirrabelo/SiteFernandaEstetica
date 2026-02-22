import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
import facialImage from "@/assets/facial-treatment.jpg";
import holisticImage from "@/assets/holistic-therapy.jpg";
import bodyImage from "@/assets/body-treatment.jpg";

const categories = [
  { id: "all", label: "Todos" },
  { id: "facial", label: "Faciais" },
  { id: "corporal", label: "Corporais" },
  { id: "holistico", label: "Holísticos" },
];

const treatments = [
  {
    id: 1,
    category: "facial",
    icon: Sparkles,
    title: "Limpeza de Pele Profunda",
    description:
      "Tratamento completo para remoção de impurezas, comedões e células mortas.",
    duration: "90 min",
    benefits: ["Pele renovada", "Poros desobstruídos", "Textura uniforme"],
    image: facialImage,
  },
  {
    id: 2,
    category: "facial",
    icon: Sun,
    title: "Peeling Químico",
    description:
      "Renovação celular para tratamento de manchas, rugas finas e cicatrizes de acne.",
    duration: "60 min",
    benefits: ["Clareamento", "Rejuvenescimento", "Textura melhorada"],
    image: facialImage,
  },
  {
    id: 3,
    category: "facial",
    icon: Droplets,
    title: "Microagulhamento",
    description:
      "Estímulo à produção de colágeno para rejuvenescimento e tratamento de cicatrizes.",
    duration: "75 min",
    benefits: ["Firmeza", "Redução de rugas", "Pele luminosa"],
    image: facialImage,
  },
  {
    id: 4,
    category: "facial",
    icon: Flower2,
    title: "Hidratação Intensiva",
    description:
      "Protocolo de hidratação profunda com ativos de alta performance.",
    duration: "60 min",
    benefits: ["Pele nutrida", "Viço renovado", "Elasticidade"],
    image: facialImage,
  },
  {
    id: 5,
    category: "corporal",
    icon: Heart,
    title: "Drenagem Linfática",
    description:
      "Técnica de massagem para eliminação de toxinas e redução de retenção de líquidos.",
    duration: "60 min",
    benefits: ["Redução de inchaço", "Detox", "Leveza corporal"],
    image: bodyImage,
  },
  {
    id: 6,
    category: "corporal",
    icon: Heart,
    title: "Modelagem Corporal",
    description:
      "Tratamento para redução de medidas e gordura localizada com tecnologia avançada.",
    duration: "90 min",
    benefits: ["Redução de medidas", "Contorno definido", "Firmeza"],
    image: bodyImage,
  },
  {
    id: 7,
    category: "corporal",
    icon: Heart,
    title: "Massagem Redutora",
    description:
      "Massagem vigorosa para ativar a circulação e auxiliar na quebra de gordura.",
    duration: "60 min",
    benefits: ["Circulação ativa", "Eliminação de toxinas", "Modelagem"],
    image: bodyImage,
  },
  {
    id: 8,
    category: "holistico",
    icon: Leaf,
    title: "Massoterapia Relaxante",
    description:
      "Massagem terapêutica para alívio de tensões e relaxamento profundo.",
    duration: "60 min",
    benefits: ["Relaxamento", "Alívio de dores", "Bem-estar"],
    image: holisticImage,
  },
  {
    id: 9,
    category: "holistico",
    icon: Leaf,
    title: "Massagem com Pedras Quentes",
    description:
      "Técnica que combina massagem com o calor das pedras para relaxamento muscular.",
    duration: "75 min",
    benefits: ["Relaxamento muscular", "Equilíbrio energético", "Calma"],
    image: holisticImage,
  },
  {
    id: 10,
    category: "holistico",
    icon: Leaf,
    title: "Reflexologia Podal",
    description:
      "Estímulo de pontos reflexos nos pés para equilibrar o corpo como um todo.",
    duration: "45 min",
    benefits: ["Equilíbrio", "Relaxamento", "Harmonia corporal"],
    image: holisticImage,
  },
  {
    id: 11,
    category: "holistico",
    icon: Leaf,
    title: "Aromaterapia",
    description:
      "Uso de óleos essenciais para promover equilíbrio físico e emocional.",
    duration: "60 min",
    benefits: ["Equilíbrio emocional", "Relaxamento", "Clareza mental"],
    image: holisticImage,
  },
  {
    id: 12,
    category: "holistico",
    icon: Leaf,
    title: "Reiki",
    description:
      "Técnica de canalização de energia para harmonização dos chakras e bem-estar.",
    duration: "45 min",
    benefits: ["Paz interior", "Energia equilibrada", "Cura energética"],
    image: holisticImage,
  },
];

const Tratamentos = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null);

  const filteredTreatments =
    activeCategory === "all"
      ? treatments
      : treatments.filter((t) => t.category === activeCategory);

  const openWhatsApp = (treatmentName: string) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre o tratamento: ${treatmentName}`
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
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment) => (
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
                      src={treatment.image}
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
                        <treatment.icon size={20} />
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
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Tratamentos;
