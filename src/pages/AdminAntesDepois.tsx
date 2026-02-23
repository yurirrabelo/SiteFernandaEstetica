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
import { Plus, Pencil, Trash2, Save, ArrowLeft, Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

interface BeforeAfter {
  id: string;
  treatment: string;
  description: string;
  sessions: string;
  before_image_url: string | null;
  after_image_url: string | null;
  visible: boolean;
  sort_order: number;
}

const AdminAntesDepois = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<BeforeAfter[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BeforeAfter | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState<"before" | "after" | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => { if (isAdmin) fetchData(); }, [isAdmin]);

  const fetchData = async () => {
    const { data } = await supabase.from("before_after").select("*").order("sort_order");
    if (data) setItems(data as BeforeAfter[]);
    setLoading(false);
  };

  const openNew = () => {
    setEditing({ id: "", treatment: "", description: "", sessions: "1 sessão", before_image_url: null, after_image_url: null, visible: true, sort_order: items.length + 1 });
    setIsNew(true); setDialogOpen(true);
  };

  const openEdit = (t: BeforeAfter) => { setEditing({ ...t }); setIsNew(false); setDialogOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    const { id, created_at, updated_at, ...payload } = editing as any;
    if (isNew) {
      const { error } = await supabase.from("before_after").insert(payload);
      if (error) { toast.error("Erro ao criar"); return; }
      toast.success("Criado!");
    } else {
      const { error } = await supabase.from("before_after").update(payload).eq("id", editing.id);
      if (error) { toast.error("Erro ao salvar"); return; }
      toast.success("Atualizado!");
    }
    setDialogOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir?")) return;
    await supabase.from("before_after").delete().eq("id", id);
    toast.success("Excluído!"); fetchData();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "before" | "after") => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(type);
    const path = `ba-${type}-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("treatment-images").upload(path, file);
    if (error) { toast.error("Erro no upload"); setUploading(null); return; }
    const { data } = supabase.storage.from("treatment-images").getPublicUrl(path);
    const field = type === "before" ? "before_image_url" : "after_image_url";
    setEditing({ ...editing, [field]: data.publicUrl });
    setUploading(null); toast.success("Imagem enviada!");
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
                <h1 className="text-3xl font-display font-semibold text-foreground">Antes e Depois</h1>
                <p className="text-muted-foreground text-sm mt-1">Gerencie fotos de resultados</p>
              </div>
            </div>
            <Button onClick={openNew} className="gradient-primary shadow-primary"><Plus size={18} className="mr-2" />Novo</Button>
          </div>

          <div className="grid gap-4">
            {items.map(item => (
              <div key={item.id} className={`bg-card rounded-xl p-4 shadow-soft flex flex-col sm:flex-row items-start sm:items-center gap-4 ${!item.visible ? "opacity-50" : ""}`}>
                <div className="flex gap-2 flex-shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    {item.before_image_url ? <img src={item.before_image_url} alt="Antes" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Antes</div>}
                  </div>
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    {item.after_image_url ? <img src={item.after_image_url} alt="Depois" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Depois</div>}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground">{item.treatment}</h3>
                  <p className="text-sm text-muted-foreground">{item.sessions} · {item.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(item)}><Pencil size={14} /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-center text-muted-foreground py-12">Nenhum item cadastrado.</p>}
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">{isNew ? "Novo Antes e Depois" : "Editar"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4 mt-4">
              <div><Label>Tratamento</Label><Input value={editing.treatment} onChange={e => setEditing({ ...editing, treatment: e.target.value })} className="mt-1" /></div>
              <div><Label>Descrição</Label><Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} className="mt-1" rows={2} /></div>
              <div><Label>Sessões</Label><Input value={editing.sessions} onChange={e => setEditing({ ...editing, sessions: e.target.value })} placeholder="3 sessões" className="mt-1" /></div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Foto Antes</Label>
                  <div className="mt-1 space-y-2">
                    {editing.before_image_url && <img src={editing.before_image_url} alt="Antes" className="w-full h-32 object-cover rounded-lg" />}
                    <label className="flex items-center gap-2 cursor-pointer bg-muted hover:bg-muted/80 rounded-lg px-3 py-2 text-sm">
                      <Upload size={14} />{uploading === "before" ? "Enviando..." : "Upload"}
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "before")} className="hidden" disabled={!!uploading} />
                    </label>
                  </div>
                </div>
                <div>
                  <Label>Foto Depois</Label>
                  <div className="mt-1 space-y-2">
                    {editing.after_image_url && <img src={editing.after_image_url} alt="Depois" className="w-full h-32 object-cover rounded-lg" />}
                    <label className="flex items-center gap-2 cursor-pointer bg-muted hover:bg-muted/80 rounded-lg px-3 py-2 text-sm">
                      <Upload size={14} />{uploading === "after" ? "Enviando..." : "Upload"}
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "after")} className="hidden" disabled={!!uploading} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between"><Label>Visível</Label><Switch checked={editing.visible} onCheckedChange={v => setEditing({ ...editing, visible: v })} /></div>
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

export default AdminAntesDepois;
