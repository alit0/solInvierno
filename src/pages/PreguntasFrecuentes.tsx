import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PreguntasFrecuentes = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      categoria: "Pedagogía Waldorf",
      preguntas: [
        {
          pregunta: "¿Qué es la Pedagogía Waldorf?",
          respuesta: "La Pedagogía Waldorf es un enfoque educativo integral desarrollado por Rudolf Steiner que reconoce al ser humano como un ser en constante desarrollo. Se basa en el respeto por las etapas naturales del crecimiento y busca desarrollar armónicamente el pensar, sentir y querer de cada niño."
        },
        {
          pregunta: "¿Cómo se diferencia de la educación tradicional?",
          respuesta: "La educación Waldorf integra el arte en todas las materias, respeta los ritmos individuales de aprendizaje, evita la tecnología en los primeros años, y se enfoca en el desarrollo integral del niño más que en la memorización de contenidos. Los maestros acompañan a los mismos niños durante varios años, creando vínculos profundos."
        },
        {
          pregunta: "¿Los niños aprenden a leer y escribir?",
          respuesta: "Sí, pero respetando el momento evolutivo adecuado. En Waldorf, la lectoescritura se introduce gradualmente a partir de los 6-7 años, cuando el niño está neurológicamente preparado. Antes de eso, se fortalecen las bases a través del lenguaje oral, cuentos, rimas y el desarrollo de la motricidad fina."
        }
      ]
    },
    {
      categoria: "Inscripciones y Admisión",
      preguntas: [
        {
          pregunta: "¿Cuándo abren las inscripciones?",
          respuesta: "Las inscripciones para el año siguiente se abren en agosto y se extienden hasta noviembre. Recomendamos contactarnos temprano ya que los cupos son limitados y priorizamos un proceso de admisión cuidadoso que asegure la afinidad con nuestra propuesta educativa."
        },
        {
          pregunta: "¿Qué requisitos necesito para inscribir a mi hijo?",
          respuesta: "Necesitas completar el formulario de inscripción, presentar documentación personal del niño (partida de nacimiento, DNI, certificado de vacunación), pase de la escuela anterior si corresponde, y lo más importante: compromiso familiar de participación en la autogestión de la escuela."
        },
        {
          pregunta: "¿Hay límite de edad para ingresar?",
          respuesta: "Recibimos niños desde los 2 años en Maternal hasta los 12 años en 6to grado de Primaria. Para ingresos fuera del nivel inicial, evaluamos cada caso individualmente para asegurar una transición armónica."
        }
      ]
    },
    {
      categoria: "Vida Escolar",
      preguntas: [
        {
          pregunta: "¿Cómo es un día típico en la escuela?",
          respuesta: "Cada día sigue un ritmo cuidadosamente pensado: las mañanas se dedican a actividades intelectuales (épocas de aprendizaje), el mediodía a actividades artísticas (música, pintura, euritmia), y las tardes a trabajos prácticos y juego libre. Este ritmo respeta los momentos de mayor y menor concentración natural de los niños."
        },
        {
          pregunta: "¿Qué son las 'épocas' de aprendizaje?",
          respuesta: "Las épocas son períodos de 3-4 semanas donde se profundiza intensivamente en una materia específica (matemáticas, lengua, historia, ciencias). Esto permite una inmersión completa en el tema, favoreciendo un aprendizaje más profundo y significativo que la fragmentación en materias de 40 minutos."
        },
        {
          pregunta: "¿Usan tecnología en las clases?",
          respuesta: "En los primeros años (hasta 4to grado aproximadamente) evitamos el uso de pantallas y tecnología digital, priorizando experiencias directas, manipulación de materiales concretos y desarrollo de la imaginación. La tecnología se introduce gradualmente en los grados superiores, siempre como herramienta y no como fin en sí misma."
        }
      ]
    },
    {
      categoria: "Autogestión y Comunidad",
      preguntas: [
        {
          pregunta: "¿Qué significa que la escuela es autogestionada?",
          respuesta: "Significa que las familias participamos activamente en la gestión de la escuela a través de diferentes impulsos y comisiones. No somos solo 'clientes' sino co-creadores del proyecto educativo. Cada familia aporta tiempo, talento y energía para sostener y enriquecer la comunidad."
        },
        {
          pregunta: "¿Cuánto tiempo debo dedicar como padre/madre?",
          respuesta: "La participación es flexible y se adapta a las posibilidades de cada familia. Puede ser desde 2-3 horas semanales en un impulso específico hasta colaboraciones puntuales en eventos. Lo importante es el compromiso y la constancia, no la cantidad de horas."
        },
        {
          pregunta: "¿Qué pasa si no tengo tiempo para participar?",
          respuesta: "Entendemos que cada familia tiene circunstancias diferentes. Buscamos formas creativas de participación que se adapten a cada situación. La clave es la voluntad de formar parte de la comunidad, y siempre encontramos maneras de que cada familia pueda contribuir según sus posibilidades."
        }
      ]
    },
    {
      categoria: "Aspectos Académicos",
      preguntas: [
        {
          pregunta: "¿Los certificados son oficiales?",
          respuesta: "Sí, nuestra escuela cuenta con reconocimiento del Ministerio de Educación de la Provincia de Buenos Aires. Los certificados que otorgamos son oficiales y permiten la continuidad educativa en cualquier institución del sistema educativo argentino."
        },
        {
          pregunta: "¿Cómo evalúan a los niños?",
          respuesta: "La evaluación en Waldorf es integral y continua. No usamos calificaciones numéricas en los primeros años, sino informes descriptivos detallados que reflejan el desarrollo individual de cada niño. Priorizamos la autoevaluación, el progreso personal y el desarrollo de capacidades por sobre la comparación entre pares."
        },
        {
          pregunta: "¿Los niños están preparados para la secundaria?",
          respuesta: "Absolutamente. Los egresados de escuelas Waldorf suelen destacarse por su creatividad, pensamiento crítico, capacidad de trabajo en equipo y autonomía. Estas habilidades, junto con una sólida base académica, los preparan muy bien para cualquier tipo de educación secundaria."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Aquí encontrarás respuestas a las dudas más comunes sobre la Pedagogía Waldorf 
              y nuestra propuesta educativa en Sol de Invierno.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs por Categoría */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {faqs.map((categoria, categoriaIndex) => (
              <div key={categoriaIndex} className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-sage-green mb-8 text-center">
                  {categoria.categoria}
                </h2>
                
                <div className="space-y-4">
                  {categoria.preguntas.map((faq, faqIndex) => {
                    const globalIndex = categoriaIndex * 100 + faqIndex;
                    const isOpen = openFAQ === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-lg font-heading font-semibold text-sage-green pr-4">
                            {faq.pregunta}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-accent-purple flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-accent-purple flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-lg text-gray-600 leading-relaxed">
                                {faq.respuesta}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Si tienes alguna pregunta específica que no está aquí, no dudes en contactarnos. 
              Estaremos encantados de conversar contigo sobre nuestra propuesta educativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Contactanos
              </button>
              <button className="border-2 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Agendar Visita
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreguntasFrecuentes;