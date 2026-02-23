import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Save, ArrowLeft, Upload, Move } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

interface SiteImage {
  id: string;
  section: string;
  label: string;
  image_url: string | null;
  alt_text: string;
  sort_order: number;
  object_position: string;
}

const sectionLabels: Record<string, string> = {
  hero: "Página Inicial - Hero",
  about_history: "Sobre Nós - Nossa História",
  about_founder: "Sobre Nós - Fundadora",
  servicos_facial: "Nossos Serviços - Tratamentos Faciais",
  servicos_corporal: "Nossos Serviços - Tratamentos Corporais",
  servicos_holistico: "Nossos Serviços - Terapias Holísticas",
};
// Parse "X% Y%" back to numbers
const parsePosition = (pos: string): { x: number; y: number } => {
  const match = pos.match(/([\d.]+)%\s+([\d.]+)%/);
  if (match) return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
  // Handle named positions
  const map: Record<string, { x: number; y: number }> = {
    "top left": { x: 0, y: 0 }, top: { x: 50, y: 0 }, "top right": { x: 100, y: 0 },
    left: { x: 0, y: 50 }, center: { x: 50, y: 50 }, right: { x: 100, y: 50 },
    "bottom left": { x: 0, y: 100 }, bottom: { x: 50, y: 100 }, "bottom right": { x: 100, y: 100 },
  };
  return map[pos] || { x: 50, y: 50 };
};

const FocalPointPicker = ({ imageUrl, position, onChange }: { imageUrl: string; position: string; onChange: (pos: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const point = parsePosition(position);

  const updatePosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    onChange(`${x.toFixed(0)}% ${y.toFixed(0)}%`);
  }, [onChange]);

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    updatePosition(e);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragging) updatePosition(e);
  };

  const handlePointerUp = () => setDragging(false);

  return (
    <div className="space-y-2">
      {/* Full image with focal point marker */}
      <div
        ref={containerRef}
        className="relative w-full rounded-lg overflow-hidden cursor-crosshair border border-border select-none"
        style={{ maxHeight: "300px" }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <img src={imageUrl} alt="Ajustar posição" className="w-full object-contain" draggable={false} />
        {/* Focal point indicator */}
        <div
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary bg-primary/30 shadow-lg" />
          <div className="absolute inset-0 w-full h-full rounded-full animate-ping border border-primary opacity-50" />
        </div>
        {/* Crosshair lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ left: `${point.x}%` }}>
          <div className="absolute w-px h-full bg-primary/30" style={{ left: 0 }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ top: `${point.y}%` }}>
          <div className="absolute w-full h-px bg-primary/30" style={{ top: 0 }} />
        </div>
      </div>
      {/* Preview of how it will look cropped */}
      <div>
        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Move size={12} /> Preview do enquadramento no site:</p>
        <img src={imageUrl} alt="Preview enquadramento" className="w-full h-32 object-cover rounded-lg border border-border" style={{ objectPosition: position }} />
      </div>
    </div>
  );
};

const AdminImagens = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SiteImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => { if (isAdmin) fetchData(); }, [isAdmin]);

  const fetchData = async () => {
    const { data } = await supabase.from("site_images").select("*").order("sort_order");
    if (data) setItems(data as SiteImage[]);
    setLoading(false);
  };

  const openEdit = (item: SiteImage) => { setEditing({ ...item }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    const { error } = await supabase.from("site_images").update({
      image_url: editing.image_url,
      alt_text: editing.alt_text,
      label: editing.label,
      object_position: editing.object_position,
    }).eq("id", editing.id);
    if (error) { toast.error("Erro ao salvar"); return; }
    toast.success("Imagem atualizada!"); setDialogOpen(false); fetchData();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const path = `site-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("treatment-images").upload(path, file);
    if (error) { toast.error("Erro no upload"); setUploading(false); return; }
    const { data } = supabase.storage.from("treatment-images").getPublicUrl(path);
    setEditing({ ...editing, image_url: data.publicUrl });
    setUploading(false); toast.success("Imagem enviada!");
  };

  if (authLoading || loading) {
    return <Layout><div className="pt-32 pb-16 min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div></Layout>;
  }

  return (
    <Layout>
      <section className="pt-28 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}><ArrowLeft size={20} /></Button>
            <div>
              <h1 className="text-3xl font-display font-semibold text-foreground">Imagens do Site</h1>
              <p className="text-muted-foreground text-sm mt-1">Altere as imagens das páginas</p>
            </div>
          </div>

          <div className="grid gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-card rounded-xl p-4 sm:p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {item.image_url ? <img src={item.image_url} alt={item.alt_text} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">Sem imagem</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground">{sectionLabels[item.section] || item.section}</h3>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => openEdit(item)}><Pencil size={14} className="mr-1" />Alterar</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-display">Alterar Imagem</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">{sectionLabels[editing.section] || editing.section}</p>
              <div>
                <Label>Label</Label>
                <Input value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Texto alternativo</Label>
                <Input value={editing.alt_text} onChange={e => setEditing({ ...editing, alt_text: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Imagem <span className="text-muted-foreground font-normal text-xs ml-1">— clique ou arraste na imagem para ajustar o enquadramento</span></Label>
                <div className="mt-1 space-y-2">
                  {editing.image_url && (
                    <FocalPointPicker
                      imageUrl={editing.image_url}
                      position={editing.object_position}
                      onChange={(pos) => setEditing({ ...editing, object_position: pos })}
                    />
                  )}
                  <label className="flex items-center gap-2 cursor-pointer bg-muted hover:bg-muted/80 rounded-lg px-4 py-3 text-sm">
                    <Upload size={16} />{uploading ? "Enviando..." : "Enviar nova imagem"}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                </div>
              </div>
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

export default AdminImagens;
