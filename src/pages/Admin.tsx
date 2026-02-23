import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Pencil,
  Eye,
  EyeOff,
  Trash2,
  LogOut,
  Upload,
  Save,
  ArrowLeft,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

interface Treatment {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  benefits: string[];
  icon: string;
  image_url: string | null;
  visible: boolean;
  sort_order: number;
}

const emptyTreatment: Omit<Treatment, "id"> = {
  title: "",
  description: "",
  category: "facial",
  duration: "60 min",
  benefits: [],
  icon: "Sparkles",
  image_url: null,
  visible: true,
  sort_order: 0,
};

const iconOptions = ["Sparkles", "Sun", "Droplets", "Flower2", "Heart", "Leaf"];
const categoryLabels: Record<string, string> = {
  facial: "Facial",
  corporal: "Corporal",
  holistico: "Holístico",
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [benefitsText, setBenefitsText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchTreatments();
  }, [isAdmin]);

  const fetchTreatments = async () => {
    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .order("sort_order");
    if (!error && data) setTreatments(data as Treatment[]);
    setLoading(false);
  };

  const openEdit = (treatment: Treatment) => {
    setEditingTreatment({ ...treatment });
    setBenefitsText(treatment.benefits.join(", "));
    setIsNew(false);
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditingTreatment({ id: "", ...emptyTreatment, sort_order: treatments.length + 1 });
    setBenefitsText("");
    setIsNew(true);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingTreatment) return;

    const benefits = benefitsText.split(",").map((b) => b.trim()).filter(Boolean);
    const payload = {
      title: editingTreatment.title,
      description: editingTreatment.description,
      category: editingTreatment.category,
      duration: editingTreatment.duration,
      benefits,
      icon: editingTreatment.icon,
      image_url: editingTreatment.image_url,
      visible: editingTreatment.visible,
      sort_order: editingTreatment.sort_order,
    };

    if (isNew) {
      const { error } = await supabase.from("treatments").insert(payload);
      if (error) {
        toast.error("Erro ao criar tratamento");
        return;
      }
      toast.success("Tratamento criado!");
    } else {
      const { error } = await supabase
        .from("treatments")
        .update(payload)
        .eq("id", editingTreatment.id);
      if (error) {
        toast.error("Erro ao salvar");
        return;
      }
      toast.success("Tratamento atualizado!");
    }

    setDialogOpen(false);
    fetchTreatments();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este tratamento?")) return;
    const { error } = await supabase.from("treatments").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir");
      return;
    }
    toast.success("Tratamento excluído!");
    fetchTreatments();
  };

  const toggleVisibility = async (treatment: Treatment) => {
    const { error } = await supabase
      .from("treatments")
      .update({ visible: !treatment.visible })
      .eq("id", treatment.id);
    if (!error) {
      toast.success(treatment.visible ? "Tratamento oculto" : "Tratamento visível");
      fetchTreatments();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingTreatment) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("treatment-images")
      .upload(path, file);

    if (uploadError) {
      toast.error("Erro no upload da imagem");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("treatment-images").getPublicUrl(path);
    setEditingTreatment({ ...editingTreatment, image_url: data.publicUrl });
    setUploading(false);
    toast.success("Imagem enviada!");
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

  const filtered = filterCategory === "all"
    ? treatments
    : treatments.filter((t) => t.category === filterCategory);

  return (
    <Layout>
      <section className="pt-28 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-semibold text-foreground">
                Gerenciar Tratamentos
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Adicione, edite ou oculte tratamentos do site
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={openNew} className="gradient-primary shadow-primary">
                <Plus size={18} className="mr-2" />
                Novo Tratamento
              </Button>
              <Button variant="outline" onClick={() => { signOut(); navigate("/"); }}>
                <LogOut size={18} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[{ id: "all", label: "Todos" }, ...Object.entries(categoryLabels).map(([id, label]) => ({ id, label }))].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterCategory === cat.id
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Treatments List */}
          <div className="grid gap-4">
            {filtered.map((treatment) => (
              <div
                key={treatment.id}
                className={`bg-card rounded-xl p-4 sm:p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-opacity ${
                  !treatment.visible ? "opacity-50" : ""
                }`}
              >
                {/* Image */}
                <div className="w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {treatment.image_url ? (
                    <img src={treatment.image_url} alt={treatment.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      Sem imagem
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-foreground truncate">
                      {treatment.title}
                    </h3>
                    {!treatment.visible && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        Oculto
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {categoryLabels[treatment.category]} · {treatment.duration}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button size="sm" variant="outline" onClick={() => openEdit(treatment)} className="flex-1 sm:flex-none">
                    <Pencil size={14} className="mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleVisibility(treatment)}
                    className="flex-1 sm:flex-none"
                  >
                    {treatment.visible ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
                    {treatment.visible ? "Ocultar" : "Mostrar"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(treatment.id)} className="flex-1 sm:flex-none">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {isNew ? "Novo Tratamento" : "Editar Tratamento"}
            </DialogTitle>
          </DialogHeader>

          {editingTreatment && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={editingTreatment.title}
                  onChange={(e) => setEditingTreatment({ ...editingTreatment, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={editingTreatment.description}
                  onChange={(e) => setEditingTreatment({ ...editingTreatment, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
                  <Select
                    value={editingTreatment.category}
                    onValueChange={(v) => setEditingTreatment({ ...editingTreatment, category: v })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facial">Facial</SelectItem>
                      <SelectItem value="corporal">Corporal</SelectItem>
                      <SelectItem value="holistico">Holístico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Duração</Label>
                  <Input
                    value={editingTreatment.duration}
                    onChange={(e) => setEditingTreatment({ ...editingTreatment, duration: e.target.value })}
                    placeholder="60 min"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Ícone</Label>
                <Select
                  value={editingTreatment.icon}
                  onValueChange={(v) => setEditingTreatment({ ...editingTreatment, icon: v })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Benefícios (separados por vírgula)</Label>
                <Input
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder="Pele renovada, Poros desobstruídos, Textura uniforme"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Imagem</Label>
                <div className="mt-1 space-y-2">
                  {editingTreatment.image_url && (
                    <img
                      src={editingTreatment.image_url}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}
                  <label className="flex items-center gap-2 cursor-pointer bg-muted hover:bg-muted/80 transition-colors rounded-lg px-4 py-3 text-sm">
                    <Upload size={16} />
                    {uploading ? "Enviando..." : "Enviar imagem"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Visível no site</Label>
                <Switch
                  checked={editingTreatment.visible}
                  onCheckedChange={(v) => setEditingTreatment({ ...editingTreatment, visible: v })}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} className="flex-1 gradient-primary shadow-primary">
                  <Save size={16} className="mr-2" />
                  Salvar
                </Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
