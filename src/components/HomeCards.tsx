import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomeCards = () => {
  const primaryCards = [
    {
      title: "La Escuela",
      description: "Conoce el camino recorrido y los valores que nos guían como comunidad educativa.",
      image: "https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/la-escuela"
    },
    {
      title: "Pedagogía Waldorf",
      description: "Descubre los principios y metodología que sustentan nuestro proyecto educativo.",
      image: "https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/la-escuela#pedagogia-waldorf"
    },
    {
      title: "Niveles",
      description: "Descubre nuestros programas para Maternal, Jardín y Primaria, adaptados a cada etapa del desarrollo.",
      image: "https://images.pexels.com/photos/8535163/pexels-photo-8535163.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/niveles"
    }
  ];

  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Title Column */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green leading-tight">
              Conoce más sobre nosotros
            </h2>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                En Sol de Invierno, ofrecemos la Pedagogía Waldorf como un camino educativo vivo y respetuoso, 
                acompañando a tu hijo desde sala maternal hasta 6to grado de primaria.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestro proyecto educativo, centrado en el desarrollo pleno de cada niño y en el respeto a sus etapas evolutivas, 
                cuenta con el reconocimiento del Ministerio de Educación.
              </p>
            </div>
            
            <div className="pt-4">
              <p className="text-sm font-medium text-sage-green mb-4">
                ¿Qué es la pedagogía Waldorf?
              </p>
            </div>
          </div>
        </div>

        {/* Primary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {primaryCards.map((card, index) => (
            <Link key={index} to={card.link} className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                    {card.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <button className="flex items-center text-accent-purple hover:text-accent-purple/80 font-medium transition-colors group">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCards;