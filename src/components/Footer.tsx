import React from 'react';
import { MapPin, Phone, Mail, Sun } from 'lucide-react';

const Footer = () => {
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
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Propuesta Educativa</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Niveles</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Pedagogía Waldorf</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Nuestra Historia</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Impulsos</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">La Tiendita</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Donaciones</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Eventos</a></li>
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