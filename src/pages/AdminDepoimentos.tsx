import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Save, ArrowLeft, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  treatment: string;
  avatar: string;
  visible: boolean;
  sort_order: number;
}

const AdminDepoimentos = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => { if (isAdmin) fetch(); }, [isAdmin]);

  const fetch = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    if (data) setItems(data as Testimonial[]);
    setLoading(false);
  };

  const openNew = () => {
    setEditing({ id: "", name: "", role: "Cliente há 1 ano", content: "", rating: 5, treatment: "", avatar: "", visible: true, sort_order: items.length + 1 });
    setIsNew(true); setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => { setEditing({ ...t }); setIsNew(false); setDialogOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    const { id, created_at, updated_at, ...payload } = editing as any;
    if (isNew) {
      const { error } = await supabase.from("testimonials").insert(payload);
      if (error) { toast.error("Erro ao criar"); return; }
      toast.success("Depoimento criado!");
    } else {
      const { error } = await supabase.from("testimonials").update(payload).eq("id", editing.id);
      if (error) { toast.error("Erro ao salvar"); return; }
      toast.success("Depoimento atualizado!");
    }
    setDialogOpen(false); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este depoimento?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast.success("Excluído!"); fetch();
  };

  if (authLoading || loading) {
    return <Layout><div className="pt-32 pb-16 min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div></Layout>;
  }

  return (
    <Layout>
      <section className="pt-28 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}><ArrowLeft size={20} /></Button>
              <div>
                <h1 className="text-3xl font-display font-semibold text-foreground">Depoimentos</h1>
                <p className="text-muted-foreground text-sm mt-1">Gerencie depoimentos de clientes</p>
              </div>
            </div>
            <Button onClick={openNew} className="gradient-primary shadow-primary"><Plus size={18} className="mr-2" />Novo</Button>
          </div>

          <div className="grid gap-4">
            {items.map(t => (
              <div key={t.id} className={`bg-card rounded-xl p-5 shadow-soft transition-opacity ${!t.visible ? "opacity-50" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">{t.avatar || t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{t.name}</h3>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 my-2">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="fill-accent text-accent" />)}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2">"{t.content}"</p>
                    {t.treatment && <span className="inline-block mt-2 bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">{t.treatment}</span>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => openEdit(t)}><Pencil size={14} /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}><Trash2 size={14} /></Button>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-center text-muted-foreground py-12">Nenhum depoimento cadastrado. Clique em "Novo" para adicionar.</p>}
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">{isNew ? "Novo Depoimento" : "Editar Depoimento"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4 mt-4">
              <div><Label>Nome</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="mt-1" /></div>
              <div><Label>Tempo como cliente (ex: "Cliente há 2 anos")</Label><Input value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} className="mt-1" /></div>
              <div><Label>Depoimento</Label><Textarea value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} className="mt-1" rows={4} /></div>
              <div>
                <Label>Estrelas ({editing.rating})</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setEditing({ ...editing, rating: star })} className="p-1">
                      <Star size={24} className={star <= editing.rating ? "fill-accent text-accent" : "text-muted-foreground"} />
                    </button>
                  ))}
                </div>
              </div>
              <div><Label>Tag de tratamento</Label><Input value={editing.treatment} onChange={e => setEditing({ ...editing, treatment: e.target.value })} placeholder="Ex: Tratamentos Faciais" className="mt-1" /></div>
              <div><Label>Iniciais (avatar)</Label><Input value={editing.avatar} onChange={e => setEditing({ ...editing, avatar: e.target.value })} placeholder="Ex: MS" className="mt-1" maxLength={3} /></div>
              <div className="flex items-center justify-between"><Label>Visível no site</Label><Switch checked={editing.visible} onCheckedChange={v => setEditing({ ...editing, visible: v })} /></div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} className="flex-1 gradient-primary shadow-primary"><Save size={16} className="mr-2" />Salvar</Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">Cancelar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminDepoimentos;
