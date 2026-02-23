import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Award, Leaf, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import clinicInteriorFallback from "@/assets/clinic-interior.jpg";
import treatmentRoomFallback from "@/assets/treatment-room.jpg";

const values = [
  { icon: Heart, title: "Cuidado", description: "Tratamos cada cliente com atenção e carinho únicos." },
  { icon: Award, title: "Excelência", description: "Buscamos sempre os melhores resultados com qualidade." },
  { icon: Leaf, title: "Harmonia", description: "Equilibramos saúde, beleza e bem-estar integral." },
  { icon: Users, title: "Humanização", description: "Valorizamos cada pessoa em sua individualidade." },
];

const Sobre = () => {
  const [siteImages, setSiteImages] = useState<Record<string, { url: string | null; position: string }>>({});

  useEffect(() => {
    supabase
      .from("site_images")
      .select("*")
      .then(({ data }) => {
        if (data) {
          const map: Record<string, { url: string | null; position: string }> = {};
          data.forEach((img: any) => {
            map[img.section] = { url: img.image_url, position: img.object_position || "center" };
          });
          setSiteImages(map);
        }
      });
  }, []);

  const historyImage = siteImages["about_history"]?.url || clinicInteriorFallback;
  const historyPosition = siteImages["about_history"]?.position || "center";
  const founderImage = siteImages["about_founder"]?.url || treatmentRoomFallback;
  const founderPosition = siteImages["about_founder"]?.position || "center";

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
              Sobre <span className="text-gradient-primary">Fernanda Concolatto</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Há 18 anos transformando beleza, corpo e alma. Estética avançada com abordagem holística e cuidado
              integral.
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
              <span className="text-primary text-sm font-medium uppercase tracking-wider">Nossa História</span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">Sou a Fer 💫</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Paranaense de alma curiosa e coração aquariano. Há 18 anos escolhi a estética como caminho, e desde
                  então sigo me aperfeiçoando com amor e propósito.
                </p>
                <p>
                  Comecei minha jornada em Curitiba, em clínicas de referência, e quando voltei para Santa Catarina,
                  senti que era hora de criar algo meu. Assim nasceu minha própria clínica, unindo conhecimento técnico
                  com o poder das terapias e do autodesenvolvimento 🌿💆‍♀️
                </p>
                <p>
                  Amo o que faço e acredito no cuidado integral — físico, emocional, mental e espiritual. Sou apaixonada
                  por animais (tenho uma cachorrinha chamada Loba 🐶), por plantas, cachoeiras e tudo que me conecta com
                  a natureza e a paz interior 🌺💧
                </p>
                <p>Dizem que tenho mãos de fada... mas o que me move mesmo é o coração 💚</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={historyImage}
                alt="Interior do Espaço Harmonia"
                className="rounded-3xl shadow-floating w-full max-h-[500px] object-cover"
                style={{ objectPosition: historyPosition }}
              />
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-2xl shadow-elevated max-w-xs">
                <div className="text-3xl font-display font-semibold text-primary mb-1">18 Anos</div>
                <p className="text-muted-foreground text-sm">Transformando beleza, corpo e alma</p>
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
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Valores</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-4">O que nos Move</h2>
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
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
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
                src={founderImage}
                alt="Sala de Tratamento"
                className="rounded-3xl shadow-floating w-full max-h-[500px] object-cover"
                style={{ objectPosition: founderPosition }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Nossa Fundadora</span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
                Fernanda Tagliari Concolatto
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Esteticista há 18 anos, com especializações em estética avançada e terapias holísticas. Sua paixão
                  pelo cuidado integral a levou a criar um espaço único em Itapema.
                </p>
                <p>
                  "Acredito no cuidado integral — físico, emocional, mental e espiritual. Cada tratamento é uma
                  oportunidade de reconexão consigo mesma." ✨
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium">
                  Pós Operatório
                </div>
                <div className="bg-secondary/10 px-4 py-2 rounded-full text-secondary text-sm font-medium">Botox</div>
                <div className="bg-accent/10 px-4 py-2 rounded-full text-accent text-sm font-medium">
                  Beleza Facial e Corporal
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium">Terapias</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
