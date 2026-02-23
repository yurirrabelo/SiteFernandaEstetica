import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Trash2, Eye, EyeOff } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  read: boolean;
  created_at: string;
}

const AdminContatos = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchContacts = async () => {
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setContacts((data as Contact[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) fetchContacts();
  }, [user, isAdmin]);

  const toggleRead = async (contact: Contact) => {
    await supabase.from("contacts").update({ read: !contact.read }).eq("id", contact.id);
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, read: !c.read } : c))
    );
  };

  const deleteContact = async (id: string) => {
    await supabase.from("contacts").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Contato removido" });
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </Layout>
    );
  }

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <Layout>
      <section className="pt-28 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground">
                Contatos / Leads
              </h1>
              <p className="text-muted-foreground text-sm">
                {contacts.length} contato(s) • {unreadCount} não lido(s)
              </p>
            </div>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              Nenhum contato recebido ainda.
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-card rounded-2xl p-5 shadow-soft border-l-4 ${
                    contact.read ? "border-l-muted" : "border-l-primary"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-foreground">
                          {contact.name}
                        </h3>
                        {!contact.read && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            Novo
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Mail size={14} /> {contact.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={14} /> {contact.whatsapp}
                        </span>
                      </div>
                      <p className="text-foreground/80 text-sm">{contact.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(contact.created_at).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRead(contact)}
                        title={contact.read ? "Marcar como não lido" : "Marcar como lido"}
                      >
                        {contact.read ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteContact(contact.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
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

export default AdminContatos;
