import { motion } from "framer-motion";
import { Shield, Award, Heart, Users, Sparkles, Clock } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Segurança",
    description: "Procedimentos seguros com protocolos rigorosos de higiene e qualidade.",
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Profissionais certificados e produtos de alta performance.",
  },
  {
    icon: Heart,
    title: "Cuidado Personalizado",
    description: "Cada tratamento é adaptado às suas necessidades únicas.",
  },
  {
    icon: Users,
    title: "Atendimento Humanizado",
    description: "Ambiente acolhedor e equipe dedicada ao seu bem-estar.",
  },
  {
    icon: Sparkles,
    title: "Resultados Reais",
    description: "Transformações visíveis com técnicas modernas e eficazes.",
  },
  {
    icon: Clock,
    title: "Flexibilidade",
    description: "Horários flexíveis que se adaptam à sua rotina.",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-secondary text-sm font-medium uppercase tracking-wider mb-4">
            <Award size={16} />
            Por que nos escolher
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Diferenciais que Fazem a Diferença
          </h2>
          <p className="text-muted-foreground">
            Compromisso em proporcionar uma experiência excepcional em cada visita.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-6 rounded-2xl bg-muted/30 hover:bg-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon size={24} className="text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
