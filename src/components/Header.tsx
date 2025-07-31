import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, ChevronDown, UserCircle, LogOut } from 'lucide-react';
import { supabase } from '../config/supabase';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLaEscuelaOpen, setIsLaEscuelaOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);

  // Verificar si el administrador está autenticado con Supabase
  useEffect(() => {
    const checkAdminAuth = async () => {
      // Obtener sesión actual de Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Si hay sesión, verificar si el usuario es admin
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setIsAdminAuthenticated(profileData?.role === 'admin');
      } else {
        setIsAdminAuthenticated(false);
      }
    };
    
    // Verificar al cargar el componente
    checkAdminAuth();
    
    // Suscribirse a cambios de autenticación en Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminAuth();
    });
    
    return () => {
      // Limpiar suscripción cuando el componente se desmonte
      authListener.subscription.unsubscribe();
    };
  }, []);

  const getHeaderHeight = () => {
    return headerRef.current ? headerRef.current.offsetHeight : 0;
  };

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = getHeaderHeight();
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  const scrollToSection = (path: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsMenuOpen(false);

    if (path.includes('#')) {
      const [pathname, hash] = path.split('#');
      if (pathname && pathname !== location.pathname) {
        navigate(pathname, { state: { scrollTo: hash } });
      } else if (hash) {
        smoothScrollTo(hash);
      }
    } else {
      if (path !== location.pathname) {
        navigate(path);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollToId = location.state?.scrollTo || (location.hash ? location.hash.substring(1) : null);

      if (scrollToId) {
        // Usamos requestAnimationFrame para asegurar que el DOM está listo
        requestAnimationFrame(() => {
          const element = document.getElementById(scrollToId);
          if (element) {
            smoothScrollTo(scrollToId);
            // Limpiamos el estado para que no se repita el scroll en futuras navegaciones
            if (location.state?.scrollTo) {
              navigate(location.pathname, { replace: true, state: {} });
            }
          } else {
            // Si el elemento no se encuentra de inmediato, reintentamos una vez más.
            // Esto puede ser útil en componentes con carga de datos asíncrona.
            setTimeout(() => {
              smoothScrollTo(scrollToId);
              if (location.state?.scrollTo) {
                navigate(location.pathname, { replace: true, state: {} });
              }
            }, 100);
          }
        });
      } else if (location.pathname === '/' && location.search === '') {
        // Solo hacer scroll al top en la página de inicio y sin hash/state
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    handleScroll();
  }, [location, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
    // Si estamos en una ruta de admin, redirigir a la página principal
    if (location.pathname.includes('/adminsol')) {
      navigate('/');
    }
  };

  return (
    <header ref={headerRef} className="bg-warm-white border-b border-sage-green/10 sticky top-0 z-50">
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
            
            {/* Botones de Admin - Solo visibles cuando está autenticado */}
            {isAdminAuthenticated && (
              <>
                <Link 
                  to="/adminsol/dashboard" 
                  className="flex items-center text-accent-purple hover:text-amber-700 transition-colors font-medium"
                >
                  <UserCircle className="h-5 w-5 mr-1" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-800 transition-colors font-medium"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Salir</span>
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            {/* Botones de Admin para móvil - Solo visibles cuando está autenticado */}
            {isAdminAuthenticated && (
              <div className="flex mr-3">
                <Link 
                  to="/adminsol/dashboard" 
                  className="p-2 text-accent-purple hover:text-amber-700"
                  aria-label="Admin Dashboard"
                >
                  <UserCircle className="h-6 w-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-600 hover:text-red-800"
                  aria-label="Cerrar Sesión"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            )}
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-sage-green/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-sage-green" />
              ) : (
                <Menu className="h-6 w-6 text-sage-green" />
              )}
            </button>
          </div>
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
              
              {/* Opciones de admin para móvil - Solo visibles cuando está autenticado */}
              {isAdminAuthenticated && (
                <>
                  <Link 
                    to="/adminsol/dashboard" 
                    className="text-accent-purple hover:text-amber-700 transition-colors font-medium py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    Panel de Administrador
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-800 transition-colors font-medium py-2 flex items-center w-full text-left"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;