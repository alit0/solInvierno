import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImpulsos } from '../data/impulsosData';

const ImpulsosGrid: React.FC = () => {
  const impulsos = getImpulsos();

  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green leading-tight mb-6">
            Nuestros Impulsos
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Conoce la esencia de nuestra autogestión: una comunidad de padres activa y colaborativa. 
            Cada familia participa activamente en la construcción de nuestra comunidad educativa.
          </p>
        </div>

        {/* Grid de Impulsos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impulsos.map((impulso) => (
            <Link 
              key={impulso.id} 
              to={`/impulsos/${impulso.slug}`}
              className="group cursor-pointer"
            >
              <div className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full relative aspect-[4/5]">
                {/* Imagen de fondo */}
                <img 
                  src={impulso.imagen_principal}
                  alt={impulso.nombre_impulso}
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay gradiente */}
                <div className="absolute bottom-0 left-0 right-0 w-full h-3/4 bg-gradient-to-b from-white/5 to-white/95"></div>
                
                {/* Contenido de texto */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-white/5 via-transparent to-white/95">
                  <h3 className="text-xl font-heading font-semibold text-sage-green mb-2">
                    {impulso.nombre_impulso}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {impulso.descripcion_corta}
                  </p>
                  <button className="flex items-center text-accent-purple hover:text-accent-purple/80 font-medium transition-colors group text-sm">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

export default ImpulsosGrid;