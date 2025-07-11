import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImpulsos } from '../data/impulsosData';

const Impulsos = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const impulsos = getImpulsos();

  const impulsosFiltrados = filtroActivo === 'todos' 
    ? impulsos 
    : impulsos.filter(impulso => impulso.slug === filtroActivo);

  const nombresImpulsos = impulsos.map(impulso => ({
    slug: impulso.slug,
    nombre: impulso.nombre_impulso
  }));

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green mb-6">
              Nuestros Impulsos
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conoce la esencia de nuestra autogestión: una comunidad de padres activa y colaborativa. 
              Cada familia participa activamente en la construcción de nuestra comunidad educativa, 
              aportando sus talentos y energías para crear un ambiente rico y diverso donde nuestros hijos puedan crecer.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFiltroActivo('todos')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filtroActivo === 'todos'
                  ? 'bg-accent-purple text-white shadow-md'
                  : 'bg-white text-sage-green hover:bg-accent-purple/10 border border-sage-green/20'
              }`}
            >
              Todos los Impulsos
            </button>
            {nombresImpulsos.map((impulso) => (
              <button
                key={impulso.slug}
                onClick={() => setFiltroActivo(impulso.slug)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filtroActivo === impulso.slug
                    ? 'bg-accent-purple text-white shadow-md'
                    : 'bg-white text-sage-green hover:bg-accent-purple/10 border border-sage-green/20'
                }`}
              >
                {impulso.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Impulsos */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impulsosFiltrados.map((impulso) => (
              <Link 
                key={impulso.id} 
                to={`/impulsos/${impulso.slug}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src={impulso.imagen_principal}
                      alt={impulso.nombre_impulso}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-sage-green mb-3">
                      {impulso.nombre_impulso}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">
                      {impulso.descripcion_corta}
                    </p>
                    <button className="flex items-center text-accent-purple hover:text-accent-purple/80 font-medium transition-colors group">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {impulsosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No se encontraron impulsos para el filtro seleccionado.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              ¿Te gustaría formar parte?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Cada impulso necesita la colaboración de nuestra comunidad para seguir creciendo. 
              Tu participación, sin importar el tiempo que puedas dedicar, es valiosa y necesaria.
            </p>
            <Link 
              to="/contacto"
              className="inline-block bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contactanos para Participar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impulsos;