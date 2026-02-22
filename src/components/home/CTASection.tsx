import { motion } from "framer-motion";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import treatmentRoom from "@/assets/treatment-room.jpg";

const CTASection = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de agendar um horário.");
    window.open(`https://wa.me/5547994458005?text=${message}`, "_blank");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={treatmentRoom}
          alt="Sala de tratamento"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/85" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-wider mb-4">
            <Calendar size={16} />
            Agende Agora
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-primary-foreground mb-6">
            Comece sua Jornada de{" "}
            <span className="text-primary-light">Transformação</span>
          </h2>

          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Agende sua avaliação e descubra os tratamentos ideais para
            você. Estou pronta para proporcionar uma experiência única de cuidado integral.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground shadow-lg group"
            >
              <MessageCircle size={20} className="mr-2" />
              Agendar via WhatsApp
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="tel:+5547994458005">
                <Phone size={20} className="mr-2" />
                (47) 99445-8005
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-primary-foreground/20"
          >
            {[
              "Avaliação Gratuita",
              "Sem Compromisso",
              "Atendimento Personalizado",
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-primary-foreground/70"
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm">{badge}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
