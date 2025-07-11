import React from 'react';

const Hero = () => {
  return (
    <section className="py-12 lg:py-20 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-medium text-sage-green tracking-wider uppercase">
                Pedagogía Waldorf
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-sage-green leading-tight">
                Nutriendo el potencial único de cada infancia.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Una comunidad donde crecer juntos, con amor y respeto hacia el ritmo natural de cada niño.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                En Sol de Invierno, ofrecemos la Pedagogía Waldorf como un camino educativo vivo y respetuoso, 
                acompañando a tu hijo desde sala maternal hasta 6to grado de primaria.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 pt-4 flex-wrap sm:flex-nowrap">
              <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Propuesta educativa
              </button>
              <button className="border-2 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                Próximas inscripciones
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Niños jugando en un ambiente Waldorf natural al aire libre"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;