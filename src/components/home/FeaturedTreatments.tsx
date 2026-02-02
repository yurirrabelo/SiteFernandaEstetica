import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Leaf, Heart, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import facialImage from "@/assets/facial-treatment.jpg";
import holisticImage from "@/assets/holistic-therapy.jpg";
import bodyImage from "@/assets/body-treatment.jpg";

const treatments = [
  {
    icon: Sparkles,
    title: "Tratamentos Faciais",
    description:
      "Limpeza de pele, peeling, microagulhamento e protocolos anti-idade para uma pele radiante.",
    image: facialImage,
    color: "primary",
  },
  {
    icon: Heart,
    title: "Tratamentos Corporais",
    description:
      "Modelagem corporal, drenagem linfática e procedimentos para redução de medidas.",
    image: bodyImage,
    color: "secondary",
  },
  {
    icon: Leaf,
    title: "Terapias Holísticas",
    description:
      "Massoterapia, reflexologia, aromaterapia e técnicas de equilíbrio energético.",
    image: holisticImage,
    color: "accent",
  },
];

const FeaturedTreatments = () => {
  return (
    <section id="tratamentos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider mb-4">
            <Sun size={16} />
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Tratamentos que Transformam
          </h2>
          <p className="text-muted-foreground">
            Oferecemos uma combinação única de estética avançada e terapias
            holísticas para cuidar de você por completo.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-elevated hover:shadow-floating transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                    treatment.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : treatment.color === "secondary"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <treatment.icon size={24} />
                </div>

                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {treatment.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {treatment.description}
                </p>

                <Link
                  to="/tratamentos"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors group/link"
                >
                  Saiba mais
                  <ArrowRight
                    size={16}
                    className="ml-1 group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="border-primary/30">
            <Link to="/tratamentos">
              Ver Todos os Tratamentos
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTreatments;
