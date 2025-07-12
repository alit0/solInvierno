
import { MapPin, Phone, Mail, Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (path: string) => {
    const [pathname, hash] = path.split('#');

    const smoothScrollTo = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const header = document.querySelector('header');
        const headerHeight = header?.offsetHeight || 70; // Fallback height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    if (pathname !== location.pathname) {
      navigate(pathname, { state: { scrollTo: hash } });
    } else {
      if (hash) {
        smoothScrollTo(hash);
      }
    }
  };

  return (
    <footer className="bg-sage-green text-warm-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center">
                <Sun className="h-6 w-6 text-sage-green" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold">Sol de Invierno</h3>
                <p className="text-sm text-warm-white/80">Pedagogía Waldorf</p>
              </div>
            </div>
            <p className="text-sm text-warm-white/80 leading-relaxed">
              Escuela autogestionada con Pedagogía Waldorf en Mercedes, Buenos Aires. 
              Nutriendo el potencial único de cada infancia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">La Escuela</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleLinkClick('/la-escuela#propuesta-educativa')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">Propuesta Educativa</button></li>
              <li><button onClick={() => handleLinkClick('/niveles')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">Niveles</button></li>
              <li><button onClick={() => handleLinkClick('/la-escuela#pedagogia-waldorf')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">Pedagogía Waldorf</button></li>
              <li><button onClick={() => handleLinkClick('/la-escuela#nuestra-historia')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">Nuestra Historia</button></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleLinkClick('/impulsos')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">Impulsos</button></li>
              <li><button onClick={() => handleLinkClick('/la-tiendita')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">La Tiendita</button></li>
              <li><button onClick={() => handleLinkClick('/donaciones')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">Donaciones</button></li>
              <li><button onClick={() => handleLinkClick('/eventos')} className="text-warm-white/80 hover:text-warm-white transition-colors text-left">Eventos</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-warm-white/80 flex-shrink-0" />
                <span className="text-warm-white/80">Mercedes, Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-warm-white/80 flex-shrink-0" />
                <span className="text-warm-white/80">+54 11 xxxx-xxxx</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-warm-white/80 flex-shrink-0" />
                <span className="text-warm-white/80">info@soldeInvierno.edu.ar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-warm-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-warm-white/80">
            © 2024 Escuela Sol de Invierno. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;