import React from 'react';
import { ShoppingBag, Clock, MapPin, Phone } from 'lucide-react';

const LaTiendita = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green mb-6">
              La Tiendita
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un espacio donde encontrarás productos artesanales hechos con amor por nuestra comunidad. 
              Cada compra apoya directamente nuestro proyecto educativo.
            </p>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Horarios
              </h3>
              <p className="text-lg text-gray-600">
                Lunes a Viernes<br />
                8:00 a 17:00 hs
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Ubicación
              </h3>
              <p className="text-lg text-gray-600">
                Escuela Sol de Invierno<br />
                Mercedes, Buenos Aires
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Contacto
              </h3>
              <p className="text-lg text-gray-600">
                +54 11 xxxx-xxxx<br />
                tiendita@soldeInvierno.edu.ar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Nuestros Productos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Todos nuestros productos son elaborados artesanalmente por las familias de nuestra comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Panes artesanales"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                  Panes Artesanales
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Panes elaborados con masa madre y ingredientes naturales por nuestro impulso de Papás Panaderos.
                </p>
                <p className="text-accent-purple font-medium">
                  Disponibles viernes de 14:00 a 17:00 hs
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8535007/pexels-photo-8535007.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Productos de huerta"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                  Productos de Huerta
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Verduras y hierbas orgánicas cultivadas en nuestra huerta comunitaria.
                </p>
                <p className="text-accent-purple font-medium">
                  Según temporada
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8613297/pexels-photo-8613297.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Trabajos manuales"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                  Trabajos Manuales
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Tejidos, carpintería y otros trabajos artesanales realizados por nuestra comunidad.
                </p>
                <p className="text-accent-purple font-medium">
                  Productos únicos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Apoya Nuestro Proyecto
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Cada compra en La Tiendita contribuye directamente al sostenimiento de nuestra escuela 
              y al crecimiento de nuestra comunidad educativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Visítanos en la Escuela
              </button>
              <button className="border-2 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Contactar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaTiendita;