import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
  whatsapp: z
    .string()
    .trim()
    .min(10, "WhatsApp inválido")
    .max(20, "WhatsApp muito longo")
    .regex(/^[\d\s()+-]+$/, "Formato de telefone inválido"),
  message: z
    .string()
    .trim()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Endereço",
    content: "Rua 248, 322, sala 205\nAndorinha - Itapema, SC, 88220",
    action: null,
  },
  {
    icon: Phone,
    title: "WhatsApp",
    content: "(47) 99445-8005",
    action: "https://wa.me/5547994458005",
  },
  {
    icon: Clock,
    title: "Horário",
    content: "Segunda a Sexta\nHorário agendado",
    action: null,
  },
];

const Contato = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Build WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `Olá! Sou ${data.name}.\n\n` +
        `E-mail: ${data.email}\n` +
        `WhatsApp: ${data.whatsapp}\n\n` +
        `Mensagem: ${data.message}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/5547994458005?text=${whatsappMessage}`, "_blank");

    setIsSubmitted(true);
    toast({
      title: "Mensagem enviada!",
      description: "Você será redirecionado para o WhatsApp.",
    });

    // Reset after a delay
    setTimeout(() => {
      form.reset();
      setIsSubmitted(false);
    }, 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de mais informações.");
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
              Entre em <span className="text-gradient-primary">Contato</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estamos prontos para atender você. Entre em contato pelo WhatsApp,
              telefone ou preencha o formulário abaixo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                Envie sua Mensagem
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-secondary/10 rounded-2xl p-8 text-center"
                >
                  <CheckCircle size={48} className="text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-muted-foreground">
                    Você será redirecionado para o WhatsApp.
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu nome"
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="seu@email.com"
                                {...field}
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(11) 99999-9999"
                                {...field}
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Como podemos ajudar?"
                              {...field}
                              className="min-h-[120px] resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-primary shadow-primary"
                    >
                      <Send size={18} className="mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                Informações de Contato
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <info.icon size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {info.title}
                      </h3>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground whitespace-pre-line">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick WhatsApp */}
              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-3">
                  Atendimento Rápido
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Prefere falar diretamente conosco? Clique no botão abaixo para
                  iniciar uma conversa no WhatsApp.
                </p>
                <Button
                  onClick={openWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A]"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Conversar no WhatsApp
                </Button>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Redes Sociais
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/fer.esteticaholistica/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
                  >
                    <Instagram size={22} />
                  </a>
                  <a
                    href="https://www.facebook.com/fer.esteticaholistica/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
                  >
                    <Facebook size={22} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Nossa Localização
            </h2>
          </motion.div>

          <div className="bg-card rounded-2xl overflow-hidden shadow-elevated h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.0!2d-48.6150!3d-27.0900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSXRhcGVtYQ!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Espaço Harmonia"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
