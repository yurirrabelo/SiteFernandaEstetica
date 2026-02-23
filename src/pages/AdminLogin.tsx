import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import Layout from "@/components/layout/Layout";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Map username to email
    const loginEmail = email.includes("@") ? email : `${email}@admin.com`;
    const { error: err } = await signIn(loginEmail, password);

    if (err) {
      setError("Usuário ou senha incorretos");
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

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
                  Área Administrativa
                </h1>
                <p className="text-muted-foreground text-sm mt-2">
                  Acesso restrito para gerenciamento do site
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Usuário</Label>
                  <div className="relative mt-1">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu usuário"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative mt-1">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                  <a
                    href="mailto:fertoconcolatto@gmail.com?subject=Recuperação de senha - Site Fernanda Estética&body=Olá, preciso recuperar minha senha de acesso ao painel administrativo do site."
                    className="text-sm text-primary hover:underline block text-right mt-1"
                  >
                    Esqueci minha senha
                  </a>
                </div>

                {error && (
                  <p className="text-destructive text-sm text-center">{error}</p>
                )}

                <Button type="submit" disabled={loading} className="w-full gradient-primary shadow-primary h-12">
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
