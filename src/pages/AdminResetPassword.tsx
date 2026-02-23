import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const AdminResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from the magic link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    // Also check hash for type=recovery
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

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
      navigate("/admin/login");
    }
  };

  if (!isRecovery) {
    return (
      <Layout>
        <section className="pt-32 pb-16 min-h-screen gradient-hero">
          <div className="container mx-auto px-4 max-w-md text-center">
            <h1 className="text-2xl font-display font-semibold text-foreground mb-4">
              Link inválido ou expirado
            </h1>
            <p className="text-muted-foreground mb-6">
              Solicite um novo link de recuperação na tela de login.
            </p>
            <Button onClick={() => navigate("/admin/login")} className="gradient-primary shadow-primary">
              Voltar ao Login
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 min-h-screen gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-2xl shadow-elevated p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-primary-foreground" size={28} />
                </div>
                <h1 className="text-2xl font-display font-semibold text-foreground">
                  Nova Senha
                </h1>
                <p className="text-muted-foreground text-sm mt-2">
                  Defina sua nova senha de acesso
                </p>
              </div>

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
                  {loading ? "Salvando..." : "Definir Nova Senha"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminResetPassword;
