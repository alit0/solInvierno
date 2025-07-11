import React from 'react';

const EducationalProposal = () => {
  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Title Column */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green leading-tight">
              Nuestra propuesta educativa
            </h2>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                En Sol de Invierno, ofrecemos la Pedagogía Waldorf como un camino educativo vivo y respetuoso, 
                acompañando a tu hijo desde sala maternal hasta 6to grado de primaria.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nuestro proyecto educativo, centrado en el desarrollo pleno de cada niño y en el respeto a sus etapas evolutivas, 
                cuenta con el reconocimiento del Ministerio de Educación.
              </p>
              <p className="text-gray-600 leading-relaxed">
                La pedagogía Waldorf reconoce que cada niño es único y que su desarrollo se da en etapas bien definidas. 
                Nuestro enfoque integral abarca lo intelectual, lo artístico y lo práctico, nutriendo tanto el pensamiento 
                como el sentimiento y la voluntad.
              </p>
            </div>
            
            <div className="pt-4">
              <p className="text-sm font-medium text-sage-green mb-4">
                ¿Qué es la pedagogía Waldorf?
              </p>
              <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Propuesta educativa
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalProposal;