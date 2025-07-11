import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLaEscuelaOpen, setIsLaEscuelaOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (path: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    
    // Cerrar el menú móvil si está abierto
    setIsMenuOpen(false);
    
    // Si es un enlace a una sección (contiene #)
    if (path.includes('#')) {
      const [pathname, hash] = path.split('#');
      
      // Navegar a la ruta si no estamos ya en ella
      if (pathname && pathname !== location.pathname) {
        navigate(pathname, { state: { scrollTo: hash } });
      } else if (hash) {
        // Si ya estamos en la ruta, solo hacer scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Para rutas normales
      if (path !== location.pathname) {
        navigate(path);
      }
      // Hacer scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Efecto para manejar el scroll cuando se carga la página con un hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-warm-white border-b border-sage-green/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sage-green rounded-full flex items-center justify-center">
              <Sun className="h-6 w-6 text-warm-white" />
            </div>
            <div>
              <h1 className="text-lg font-heading font-semibold text-sage-green">
                Sol de Invierno
              </h1>
              <p className="text-xs text-sage-green/70 hidden sm:block">
                Pedagogía Waldorf
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button 
                className={`flex items-center text-sage-green hover:text-accent-purple transition-colors font-medium ${
                  isActive('/la-escuela') ? 'text-accent-purple' : ''
                }`}
                onMouseEnter={() => setIsLaEscuelaOpen(true)}
                onMouseLeave={() => setIsLaEscuelaOpen(false)}
              >
                La Escuela
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-200 ${
                  isLaEscuelaOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsLaEscuelaOpen(true)}
                onMouseLeave={() => setIsLaEscuelaOpen(false)}
              >
                <a 
                  href="/la-escuela" 
                  onClick={(e) => scrollToSection('/la-escuela', e)}
                  className="block px-4 py-3 text-sage-green hover:text-accent-purple hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  La Escuela
                </a>
                <a 
                  href="/niveles" 
                  onClick={(e) => scrollToSection('/niveles', e)}
                  className="block px-4 py-3 text-sage-green hover:text-accent-purple hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Niveles
                </a>
                <a 
                  href="/la-escuela#pedagogia-waldorf" 
                  onClick={(e) => scrollToSection('/la-escuela#pedagogia-waldorf', e)}
                  className="block px-4 py-3 text-sage-green hover:text-accent-purple hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Pedagogía Waldorf
                </a>
              </div>
            </div>
            
            <a 
              href="/impulsos" 
              onClick={(e) => scrollToSection('/impulsos', e)}
              className={`text-sage-green hover:text-accent-purple transition-colors font-medium cursor-pointer ${
                isActive('/impulsos') ? 'text-accent-purple' : ''
              }`}
            >
              Impulsos
            </a>
            <a 
              href="/la-tiendita" 
              onClick={(e) => scrollToSection('/la-tiendita', e)}
              className={`text-sage-green hover:text-accent-purple transition-colors font-medium cursor-pointer ${
                isActive('/la-tiendita') ? 'text-accent-purple' : ''
              }`}
            >
              La Tiendita
            </a>
            <a 
              href="/inscripciones" 
              onClick={(e) => scrollToSection('/inscripciones', e)}
              className={`text-sage-green hover:text-accent-purple transition-colors font-medium cursor-pointer ${
                isActive('/inscripciones') ? 'text-accent-purple' : ''
              }`}
            >
              Inscripciones
            </a>
            <Link 
              to="/donaciones" 
              className={`text-sage-green hover:text-accent-purple transition-colors font-medium ${
                isActive('/donaciones') ? 'text-accent-purple' : ''
              }`}
            >
              Donaciones
            </Link>
            <Link 
              to="/contacto" 
              className={`text-sage-green hover:text-accent-purple transition-colors font-medium ${
                isActive('/contacto') ? 'text-accent-purple' : ''
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-sage-green/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-sage-green" />
            ) : (
              <Menu className="h-6 w-6 text-sage-green" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-sage-green/10 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/la-escuela" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                La Escuela
              </Link>
              <Link 
                to="/niveles" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2 pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Niveles
              </Link>
              <Link 
                to="/la-escuela#pedagogia-waldorf" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2 pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Pedagogía Waldorf
              </Link>
              <Link 
                to="/impulsos" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Impulsos
              </Link>
              <Link 
                to="/la-tiendita" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                La Tiendita
              </Link>
              <Link 
                to="/inscripciones" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscripciones
              </Link>
              <Link 
                to="/donaciones" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Donaciones
              </Link>
              <Link 
                to="/contacto" 
                className="text-sage-green hover:text-accent-purple transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;