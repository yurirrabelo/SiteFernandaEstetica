import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Tratamentos from "./pages/Tratamentos";
import Depoimentos from "./pages/Depoimentos";
import AntesDepois from "./pages/AntesDepois";
import Contato from "./pages/Contato";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminTratamentos from "./pages/AdminTratamentos";
import AdminDepoimentos from "./pages/AdminDepoimentos";
import AdminAntesDepois from "./pages/AdminAntesDepois";
import AdminImagens from "./pages/AdminImagens";
import AdminContatos from "./pages/AdminContatos";
import AdminSenha from "./pages/AdminSenha";
import AdminResetPassword from "./pages/AdminResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="fer-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/tratamentos" element={<Tratamentos />} />
              <Route path="/depoimentos" element={<Depoimentos />} />
              <Route path="/antes-depois" element={<AntesDepois />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/tratamentos" element={<AdminTratamentos />} />
              <Route path="/admin/depoimentos" element={<AdminDepoimentos />} />
              <Route path="/admin/antes-depois" element={<AdminAntesDepois />} />
              <Route path="/admin/imagens" element={<AdminImagens />} />
              <Route path="/admin/contatos" element={<AdminContatos />} />
              <Route path="/admin/senha" element={<AdminSenha />} />
              <Route path="/admin/reset-password" element={<AdminResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
