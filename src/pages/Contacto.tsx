import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green mb-6">
              Contacto
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para responder todas tus preguntas sobre nuestra propuesta educativa. 
              No dudes en contactarnos, será un placer conversar contigo.
            </p>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Dirección
              </h3>
              <p className="text-lg text-gray-600">
                Calle Principal 123<br />
                Mercedes, Buenos Aires<br />
                Argentina
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Teléfono
              </h3>
              <p className="text-lg text-gray-600">
                +54 11 xxxx-xxxx<br />
                WhatsApp disponible
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Email
              </h3>
              <p className="text-lg text-gray-600">
                info@soldeInvierno.edu.ar<br />
                inscripciones@soldeInvierno.edu.ar
              </p>
            </div>

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
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
                Envíanos un Mensaje
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo a la brevedad. 
                También puedes visitarnos directamente en la escuela para conocer nuestras instalaciones.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-sage-green mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-sage-green mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sage-green mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-sage-green mb-2">
                    Asunto *
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    required
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-colors"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="inscripciones">Inscripciones</option>
                    <option value="informacion-general">Información General</option>
                    <option value="pedagogia-waldorf">Pedagogía Waldorf</option>
                    <option value="visita-escuela">Visita a la Escuela</option>
                    <option value="impulsos">Participar en Impulsos</option>
                    <option value="donaciones">Donaciones</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-sage-green mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={6}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-colors resize-vertical"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensaje
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
                Visítanos
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Te invitamos a conocer nuestras instalaciones y vivir de cerca la experiencia Waldorf. 
                Coordina una visita y descubre el ambiente cálido y acogedor de nuestra escuela.
              </p>

              {/* Mapa placeholder */}
              <div className="bg-blue-gray rounded-xl p-8 mb-8 text-center">
                <MapPin className="w-16 h-16 text-accent-purple mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-sage-green mb-2">
                  Ubicación
                </h3>
                <p className="text-lg text-gray-600">
                  Calle Principal 123, Mercedes, Buenos Aires
                </p>
                <button className="mt-4 bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Ver en Google Maps
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                  Horarios de Atención
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Lunes a Viernes:</span>
                    <span className="text-lg font-medium text-sage-green">8:00 - 17:00 hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Sábados:</span>
                    <span className="text-lg font-medium text-sage-green">9:00 - 13:00 hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Domingos:</span>
                    <span className="text-lg font-medium text-gray-400">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              ¿Tienes Preguntas?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Antes de contactarnos, quizás encuentres la respuesta que buscas en nuestra sección de preguntas frecuentes.
            </p>
            <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Ver Preguntas Frecuentes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;