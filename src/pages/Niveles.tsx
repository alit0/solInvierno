import React from 'react';
import { Baby, Users, BookOpen, Palette, Music, TreePine } from 'lucide-react';

const Niveles = () => {
  const niveles = [
    {
      id: 'maternal',
      titulo: 'Maternal',
      edad: '2 a 3 años',
      icon: <Baby className="w-8 h-8 text-accent-purple" />,
      descripcion: 'Un espacio cálido y protegido donde los más pequeños desarrollan confianza básica y habilidades fundamentales.',
      objetivos: [
        'Desarrollo de la confianza básica y seguridad emocional',
        'Estimulación sensorial a través del juego libre',
        'Desarrollo del lenguaje mediante canciones y cuentos',
        'Fortalecimiento de la motricidad gruesa y fina'
      ],
      actividades: [
        'Juego libre con materiales naturales',
        'Rondas y canciones de cuna',
        'Actividades de vida práctica adaptadas',
        'Tiempo en la naturaleza y jardín'
      ],
      imagen: 'https://images.pexels.com/photos/8535161/pexels-photo-8535161.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    },
    {
      id: 'jardin',
      titulo: 'Jardín Integrado',
      edad: '3 a 6 años',
      icon: <Users className="w-8 h-8 text-accent-purple" />,
      descripcion: 'La etapa del juego libre y la imaginación, donde los niños desarrollan habilidades sociales y creatividad.',
      objetivos: [
        'Desarrollo de la imaginación y creatividad',
        'Fortalecimiento de habilidades sociales',
        'Preparación para el aprendizaje formal',
        'Desarrollo de la voluntad y autorregulación'
      ],
      actividades: [
        'Juego libre y creativo',
        'Cuentos de hadas y narraciones',
        'Actividades artísticas: acuarela, modelado, dibujo',
        'Trabajos manuales: tejido, carpintería simple',
        'Euritmia y movimiento',
        'Huerta y cuidado de animales'
      ],
      imagen: 'https://images.pexels.com/photos/8535007/pexels-photo-8535007.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    },
    {
      id: 'primaria',
      titulo: 'Primaria',
      edad: '6 a 12 años',
      icon: <BookOpen className="w-8 h-8 text-accent-purple" />,
      descripcion: 'El despertar del pensamiento lógico integrado con el arte y la experiencia práctica.',
      objetivos: [
        'Desarrollo del pensamiento lógico y abstracto',
        'Integración de materias académicas con arte',
        'Fortalecimiento de la responsabilidad social',
        'Desarrollo de habilidades prácticas y manuales'
      ],
      actividades: [
        'Épocas de aprendizaje intensivo',
        'Matemáticas vivenciales',
        'Lengua a través de la literatura',
        'Historia como biografía de la humanidad',
        'Ciencias naturales experimentales',
        'Idiomas extranjeros (inglés)',
        'Música: flauta, canto coral',
        'Trabajos manuales especializados'
      ],
      imagen: 'https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    }
  ];

  const caracteristicas = [
    {
      icon: <Palette className="w-6 h-6 text-accent-purple" />,
      titulo: 'Arte Integrado',
      descripcion: 'El arte no es una materia separada, sino el medio a través del cual se enseñan todas las materias.'
    },
    {
      icon: <Music className="w-6 h-6 text-accent-purple" />,
      titulo: 'Música y Movimiento',
      descripcion: 'La música y la euritmia acompañan el aprendizaje, desarrollando ritmo y armonía interior.'
    },
    {
      icon: <TreePine className="w-6 h-6 text-accent-purple" />,
      titulo: 'Conexión Natural',
      descripcion: 'El contacto diario con la naturaleza es fundamental para el desarrollo saludable.'
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green mb-6">
              Nuestros Niveles Educativos
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              En Sol de Invierno acompañamos a los niños desde los 2 hasta los 12 años, 
              respetando las etapas naturales de desarrollo según la Pedagogía Waldorf.
            </p>
          </div>
        </div>
      </section>

      {/* Características Generales */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Características de Nuestra Propuesta
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caracteristicas.map((caracteristica, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-gray rounded-full flex items-center justify-center">
                    {caracteristica.icon}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                  {caracteristica.titulo}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {caracteristica.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niveles Detallados */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {niveles.map((nivel, index) => (
              <div key={nivel.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Contenido */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-gray rounded-full flex items-center justify-center">
                      {nivel.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-bold text-sage-green">
                        {nivel.titulo}
                      </h2>
                      <p className="text-lg text-accent-purple font-medium">
                        {nivel.edad}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {nivel.descripcion}
                  </p>

                  <div>
                    <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                      Objetivos Pedagógicos
                    </h3>
                    <ul className="space-y-2">
                      {nivel.objetivos.map((objetivo, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-lg text-gray-600">{objetivo}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                      Actividades Principales
                    </h3>
                    <ul className="space-y-2">
                      {nivel.actividades.map((actividad, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-lg text-gray-600">{actividad}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Imagen */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img 
                    src={nivel.imagen}
                    alt={`Actividades de ${nivel.titulo}`}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rutina Diaria */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              El Ritmo de Nuestros Días
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada día en Sol de Invierno sigue un ritmo cuidadosamente pensado que respeta 
              las necesidades de cada edad y favorece el aprendizaje natural.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                Mañana - Actividad Intelectual
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Las primeras horas se dedican a las actividades que requieren mayor concentración: 
                épocas de aprendizaje, matemáticas, lengua y ciencias.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                Mediodía - Actividad Artística
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                El momento del día donde florecen la música, la pintura, el modelado 
                y todas las expresiones artísticas que nutren el alma.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                Tarde - Actividad Práctica
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Las últimas horas se destinan a trabajos manuales, huerta, 
                actividades físicas y juego libre al aire libre.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Niveles;