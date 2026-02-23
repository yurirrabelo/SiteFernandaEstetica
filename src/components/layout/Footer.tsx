import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl font-semibold">Fernanda Concolatto</h3>
              <p className="text-sm text-primary-foreground/60 tracking-widest uppercase">Estética & Holística</p>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Há 12 anos transformando beleza, corpo e alma. Estética avançada com abordagem holística.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/fer.esteticaholistica/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/fer.esteticaholistica/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://wa.me/5547994458005"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-medium mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Início" },
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/tratamentos", label: "Tratamentos" },
                { href: "/depoimentos", label: "Depoimentos" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-medium mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Rua 248, 322, sala 205
                  <br />
                  Meia Praia - Itapema, SC, 88220-000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/5547999445800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm"
                >
                  (47) 99944-5800
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-medium mb-6">Horário de Atendimento</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/70 text-sm">
                  <p className="font-medium text-primary-foreground/90">Segunda a Sexta</p>
                  <p>Horário agendado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-sm text-center md:text-left">
              © {currentYear} Fernanda Concolatto. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
