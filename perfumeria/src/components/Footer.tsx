import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";

export function Footer() {
  return (
    <footer id="footer" className="bg-card pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-serif tracking-widest text-primary mb-6">ELIXIR</h2>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Una boutique de alta perfumeria dedicada a encontrar la esencia que define tu identidad.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-serif text-foreground mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Avenida Alvear 1234, Buenos Aires</li>
              <li>+54 11 1234-5678</li>
              <li>info@elixirperfumes.com</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-serif text-foreground mb-6">Seguinos</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-social-instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-social-whatsapp">
                <FaWhatsapp size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-social-facebook">
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center flex flex-col items-center">
          <p className="text-xs text-muted-foreground tracking-wider uppercase">
            &copy; 2025 ELIXIR Perfumeria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
