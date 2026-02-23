import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const AdminSenha = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authLoading && (!user || !isAdmin)) {
    navigate("/admin/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "A senha deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "As senhas não coincidem", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast({ title: "Erro ao alterar senha", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha alterada com sucesso!" });
      setPassword("");
      setConfirm("");
    }
  };

  return (
    <Layout>
      <section className="pt-28 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-md">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-display font-semibold text-foreground">
              Alterar Senha
            </h1>
          </div>

          <div className="bg-card rounded-2xl shadow-soft p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password">Nova Senha</Label>
                <div className="relative mt-1">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirm">Confirmar Senha</Label>
                <div className="relative mt-1">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repita a senha"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full gradient-primary shadow-primary h-12">
                <CheckCircle size={18} className="mr-2" />
                {loading ? "Salvando..." : "Alterar Senha"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminSenha;
