import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Sparkles,
  MessageSquare,
  Image,
  ArrowRight,
  Repeat,
  Users,
  KeyRound,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const adminSections = [
  {
    title: "Tratamentos",
    description: "Adicione, edite ou oculte tratamentos do site",
    icon: Sparkles,
    path: "/admin/tratamentos",
    color: "from-primary to-primary/80",
  },
  {
    title: "Depoimentos",
    description: "Gerencie depoimentos, estrelas, nomes e tags",
    icon: MessageSquare,
    path: "/admin/depoimentos",
    color: "from-secondary to-secondary/80",
  },
  {
    title: "Antes e Depois",
    description: "Gerencie fotos e informações de antes e depois",
    icon: Repeat,
    path: "/admin/antes-depois",
    color: "from-accent to-accent/80",
  },
  {
    title: "Imagens do Site",
    description: "Altere as imagens do início, sobre nós e mais",
    icon: Image,
    path: "/admin/imagens",
    color: "from-primary to-secondary",
  },
  {
    title: "Contatos / Leads",
    description: "Veja as mensagens recebidas pelo formulário de contato",
    icon: Users,
    path: "/admin/contatos",
    color: "from-secondary to-primary",
  },
  {
    title: "Alterar Senha",
    description: "Mude sua senha de acesso ao painel",
    icon: KeyRound,
    path: "/admin/senha",
    color: "from-muted-foreground/50 to-muted-foreground/30",
  },
];

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-semibold text-foreground">
                Painel Admin
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Gerencie o conteúdo do seu site
              </p>
            </div>
            <Button variant="outline" onClick={() => { signOut(); navigate("/"); }}>
              <LogOut size={18} className="mr-2" />
              Sair
            </Button>
          </div>

          <div className="space-y-4">
            {adminSections.map((section, index) => (
              <motion.div
                key={section.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={section.path}
                  className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-soft hover:shadow-elevated transition-all group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}>
                    <section.icon size={24} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-lg">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {section.description}
                    </p>
                  </div>
                  <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
