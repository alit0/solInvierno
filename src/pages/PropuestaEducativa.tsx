import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Heart, BookOpen, Users, Calendar, Award } from 'lucide-react';

const PropuestaEducativa: React.FC = () => {
  return (
    <div className="bg-warm-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-sage-green/10 to-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-sage-green mb-6">
              Una educación integral para el desarrollo pleno
            </h1>
            <p className="text-xl text-gray-700 mb-10">
              En Sol de Invierno, formamos niños y jóvenes con pensamiento crítico, 
              creatividad y valores humanos profundos mediante la pedagogía Waldorf.
            </p>
            <div className="flex justify-center">
              <Link to="/inscripciones" className="bg-accent-purple hover:bg-accent-purple/90 text-white py-3 px-8 rounded-lg font-medium text-lg flex items-center transition-all">
                Iniciar proceso de inscripción
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro enfoque */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-sage-green mb-4">
              Nuestro enfoque educativo
            </h2>
            <p className="text-lg text-gray-600">
              La pedagogía Waldorf reconoce que cada niño es único y su desarrollo integral
              abarca lo intelectual, lo artístico y lo práctico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="bg-sage-green/10 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-semibold text-sage-green mb-3">Educación emocional</h3>
              <p className="text-gray-600">
                Cultivamos la inteligencia emocional y la empatía como bases fundamentales para un desarrollo armonioso.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="bg-sage-green/10 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-semibold text-sage-green mb-3">Aprendizaje activo</h3>
              <p className="text-gray-600">
                Los niños aprenden haciendo, experimentando y creando, lo que fortalece su pensamiento independiente.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="bg-sage-green/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-semibold text-sage-green mb-3">Comunidad participativa</h3>
              <p className="text-gray-600">
                Construimos una comunidad donde familias y educadores trabajamos juntos por el bienestar de los niños.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-sage-green/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-sage-green mb-4">
              Beneficios de nuestra propuesta
            </h2>
            <p className="text-lg text-gray-600">
              ¿Por qué elegir Sol de Invierno para la educación de tus hijos?
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <Check className="h-5 w-5 text-accent-purple" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-sage-green mb-2">Desarrollo a ritmo natural</h3>
                  <p className="text-gray-600">
                    Respetamos el ritmo de desarrollo único de cada niño, sin presiones ni comparaciones inadecuadas.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <Check className="h-5 w-5 text-accent-purple" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-sage-green mb-2">Contacto con la naturaleza</h3>
                  <p className="text-gray-600">
                    Promovemos una conexión profunda con el entorno natural que nutre el asombro y respeto por la vida.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <Check className="h-5 w-5 text-accent-purple" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-sage-green mb-2">Arte integrado al aprendizaje</h3>
                  <p className="text-gray-600">
                    El arte no es solo una materia, sino un medio que enriquece todas las áreas del conocimiento.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <Check className="h-5 w-5 text-accent-purple" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-sage-green mb-2">Desarrollo de resiliencia</h3>
                  <p className="text-gray-600">
                    Formamos niños seguros, capaces de enfrentar desafíos y adaptarse a un mundo en constante cambio.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <Check className="h-5 w-5 text-accent-purple" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-sage-green mb-2">Docentes especializados</h3>
                  <p className="text-gray-600">
                    Nuestros maestros cuentan con formación específica en pedagogía Waldorf y actualizaciones constantes.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <Check className="h-5 w-5 text-accent-purple" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-sage-green mb-2">Reconocimiento oficial</h3>
                  <p className="text-gray-600">
                    Contamos con el reconocimiento del Ministerio de Educación, garantizando la validez de los estudios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-sage-green mb-4">
              Lo que dicen nuestras familias
            </h2>
            <p className="text-lg text-gray-600">
              Las experiencias de quienes forman parte de nuestra comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex text-accent-purple mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Ver a mi hija feliz de ir a la escuela cada día es invaluable. Su curiosidad y creatividad han florecido de una manera que nunca imaginé posible."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sage-green/20 flex items-center justify-center text-sage-green font-semibold">
                  LM
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sage-green">Laura Méndez</p>
                  <p className="text-sm text-gray-500">Madre de Sofía, 3er grado</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex text-accent-purple mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "La decisión de traer a nuestros hijos a Sol de Invierno cambió completamente su relación con el aprendizaje. Ahora entienden el propósito de lo que aprenden."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sage-green/20 flex items-center justify-center text-sage-green font-semibold">
                  FC
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sage-green">Federico Campos</p>
                  <p className="text-sm text-gray-500">Padre de Martín y Lucas</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex text-accent-purple mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Como educadora, elegí Sol de Invierno porque vi claramente cómo respetan el desarrollo infantil. Mi hija ha desarrollado una seguridad en sí misma que la acompañará toda la vida."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sage-green/20 flex items-center justify-center text-sage-green font-semibold">
                  VR
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sage-green">Valeria Romero</p>
                  <p className="text-sm text-gray-500">Madre de Ana, jardín</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Inscripciones */}
      <section className="py-16 bg-sage-green">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              ¿Quieres formar parte de nuestra comunidad educativa?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Conoce nuestras fechas de inscripción y agenda una visita para conocer nuestras instalaciones y propuesta educativa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/inscripciones" className="bg-white hover:bg-gray-100 text-sage-green py-3 px-8 rounded-lg font-medium text-lg flex items-center justify-center transition-all">
                <Calendar className="mr-2 h-5 w-5" />
                Proceso de inscripción
              </Link>
              <Link to="/contacto" className="bg-transparent hover:bg-white/10 text-white border border-white py-3 px-8 rounded-lg font-medium text-lg flex items-center justify-center transition-all">
                <Award className="mr-2 h-5 w-5" />
                Agendar visita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropuestaEducativa;
