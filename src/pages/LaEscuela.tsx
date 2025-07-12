import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Users, Lightbulb, BookOpen, Palette, TreePine } from 'lucide-react';

const LaEscuela = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#pedagogia-waldorf') {
      const element = document.getElementById('pedagogia-waldorf');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const valores = [
    {
      icon: <Heart className="w-8 h-8 text-accent-purple" />,
      titulo: "Respeto por el Ritmo Individual",
      descripcion: "Cada niño tiene su propio tiempo de desarrollo y aprendizaje."
    },
    {
      icon: <Users className="w-8 h-8 text-accent-purple" />,
      titulo: "Comunidad y Colaboración",
      descripcion: "Fomentamos el trabajo en equipo y la ayuda mutua."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-accent-purple" />,
      titulo: "Creatividad e Imaginación",
      descripcion: "Nutrimos la capacidad creativa como base del aprendizaje."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-accent-purple" />,
      titulo: "Aprendizaje Integral",
      descripcion: "Integramos lo intelectual, artístico y práctico."
    },
    {
      icon: <Palette className="w-8 h-8 text-accent-purple" />,
      titulo: "Arte como Herramienta",
      descripcion: "El arte es fundamental en todos los procesos educativos."
    },
    {
      icon: <TreePine className="w-8 h-8 text-accent-purple" />,
      titulo: "Conexión con la Naturaleza",
      descripcion: "Valoramos el contacto directo con el mundo natural."
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section id="propuesta-educativa" className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green leading-tight">
                Escuela Sol de Invierno
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Somos una escuela autogestionada que abraza la Pedagogía Waldorf como filosofía educativa. 
                Ubicados en Mercedes, Buenos Aires, creamos un espacio donde cada niño puede desarrollar 
                su potencial único en un ambiente de amor, respeto y comunidad.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestra propuesta educativa se basa en el reconocimiento de que cada niño es un ser único, 
                con ritmos y necesidades particulares que deben ser respetados y acompañados con sabiduría 
                y paciencia.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Niños en ambiente escolar Waldorf"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos Fundamentales */}
      <section id="nuestros-objetivos" className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Nuestros Objetivos Fundamentales
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              En Sol de Invierno, trabajamos con tres objetivos centrales que guían toda nuestra práctica educativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                Desarrollo del Pensar
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Cultivamos un pensamiento claro, crítico y creativo que permita a los niños 
                comprender el mundo de manera profunda y desarrollar criterio propio.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                Cultivo del Sentir
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nutrimos la vida emocional y artística, desarrollando la sensibilidad, 
                la empatía y la capacidad de apreciar la belleza en todas sus formas.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                Fortalecimiento del Querer
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Desarrollamos la voluntad y la capacidad de acción, fomentando la iniciativa, 
                la perseverancia y la responsabilidad hacia uno mismo y la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Centrales */}
      <section id="valores-centrales" className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Nuestros Valores Centrales
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Estos valores fundamentales guían cada decisión y acción en nuestra comunidad educativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-blue-gray rounded-full flex items-center justify-center">
                    {valor.icon}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-sage-green">
                  {valor.titulo}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {valor.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pedagogía Waldorf Section */}
      <section id="pedagogia-waldorf" className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green">
                ¿Qué es la Pedagogía Waldorf?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                La Pedagogía Waldorf es un enfoque educativo integral que reconoce al ser humano 
                como un ser en constante desarrollo, con necesidades específicas en cada etapa de su crecimiento.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fundada por Rudolf Steiner en 1919, esta pedagogía se basa en el profundo respeto 
                por la individualidad de cada niño y en la comprensión de que el aprendizaje debe 
                involucrar no solo la mente, sino también el corazón y las manos.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                En Sol de Invierno, aplicamos estos principios creando un ambiente donde el arte, 
                la naturaleza y el juego libre son elementos centrales del proceso educativo, 
                permitiendo que cada niño desarrolle su potencial único de manera armónica.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Actividades artísticas Waldorf"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipo y Comunidad */}
      <section id="nuestra-historia" className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Nuestra Comunidad
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sol de Invierno es más que una escuela: somos una comunidad autogestionada donde 
              maestros, familias y niños trabajamos juntos para crear un ambiente educativo único.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-sage-green">
                Autogestión Comunitaria
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestro modelo de autogestión significa que cada familia participa activamente 
                en la vida escolar. Los padres no son solo espectadores, sino co-creadores 
                del proyecto educativo a través de diversos impulsos y comisiones.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Esta participación activa fortalece los vínculos comunitarios y permite que 
                los niños crezcan en un ambiente donde sienten el compromiso y el amor de 
                toda la comunidad hacia su educación.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-sage-green">
                Maestros Comprometidos
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestros maestros están formados en Pedagogía Waldorf y comprometidos con 
                el desarrollo integral de cada niño. Trabajan desde el amor y el respeto, 
                acompañando a los estudiantes en su crecimiento personal y académico.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Cada maestro es también un aprendiz constante, participando en formaciones 
                continuas y trabajando en equipo para enriquecer la propuesta educativa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Instalaciones */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Nuestros Espacios
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada rincón de nuestra escuela está pensado para nutrir el desarrollo integral de los niños.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.pexels.com/photos/8535007/pexels-photo-8535007.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Aulas Waldorf"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-heading font-semibold">Aulas Cálidas</h3>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.pexels.com/photos/8535163/pexels-photo-8535163.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Talleres de arte"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-heading font-semibold">Talleres de Arte</h3>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Espacios naturales"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-heading font-semibold">Espacios Naturales</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaEscuela;