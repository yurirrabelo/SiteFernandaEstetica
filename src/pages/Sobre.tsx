import { motion } from "framer-motion";
import { Heart, Award, Leaf, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import clinicInterior from "@/assets/clinic-interior.jpg";
import treatmentRoom from "@/assets/treatment-room.jpg";

const values = [
  {
    icon: Heart,
    title: "Cuidado",
    description: "Tratamos cada cliente com atenção e carinho únicos.",
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Buscamos sempre os melhores resultados com qualidade.",
  },
  {
    icon: Leaf,
    title: "Harmonia",
    description: "Equilibramos saúde, beleza e bem-estar integral.",
  },
  {
    icon: Users,
    title: "Humanização",
    description: "Valorizamos cada pessoa em sua individualidade.",
  },
];

const Sobre = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
              Sobre o <span className="text-gradient-primary">Espaço Harmonia</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Há 8 anos transformando vidas através do cuidado com a beleza e o
              bem-estar. Nossa missão é proporcionar experiências que elevem sua
              autoestima e qualidade de vida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Nossa História
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
                Uma Jornada de Paixão pelo Cuidado
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  O Espaço Harmonia nasceu do sonho de criar um ambiente onde a
                  estética e as terapias holísticas se complementassem para
                  oferecer um cuidado verdadeiramente integral.
                </p>
                <p>
                  Fundada em 2016 pela Dra. Ana Paula Mendes, especialista em
                  estética e terapeuta holística, nossa clínica se tornou
                  referência em tratamentos que unem o melhor da ciência com a
                  sabedoria das práticas ancestrais.
                </p>
                <p>
                  Hoje, contamos com uma equipe multidisciplinar comprometida em
                  proporcionar experiências transformadoras, sempre com
                  acolhimento, profissionalismo e resultados excepcionais.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={clinicInterior}
                alt="Interior do Espaço Harmonia"
                className="rounded-3xl shadow-floating w-full"
              />
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-2xl shadow-elevated max-w-xs">
                <div className="text-3xl font-display font-semibold text-primary mb-1">
                  8 Anos
                </div>
                <p className="text-muted-foreground text-sm">
                  Cuidando da beleza e bem-estar de nossas clientes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">
              Nossos Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-4">
              O que nos Move
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-4">
                  <value.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Founder Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img
                src={treatmentRoom}
                alt="Sala de Tratamento"
                className="rounded-3xl shadow-floating w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Nossa Fundadora
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
                Dra. Ana Paula Mendes
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Esteticista formada há 15 anos, com especializações em
                  Dermocosmetologia, Massoterapia e Terapias Holísticas. Sua
                  paixão pelo cuidado integral a levou a criar um espaço único.
                </p>
                <p>
                  "Acredito que a verdadeira beleza nasce quando cuidamos do
                  corpo e da alma em harmonia. Cada tratamento que oferecemos é
                  uma oportunidade de reconexão consigo mesma."
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium">
                  Dermocosmetologia
                </div>
                <div className="bg-secondary/10 px-4 py-2 rounded-full text-secondary text-sm font-medium">
                  Massoterapia
                </div>
                <div className="bg-accent/10 px-4 py-2 rounded-full text-accent text-sm font-medium">
                  Terapias Holísticas
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
