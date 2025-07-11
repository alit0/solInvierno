import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, AlertCircle, CheckCircle, Zap, MessageCircle, Calendar } from 'lucide-react';
import { getImpulsoBySlug, getNecesidadesByImpulso } from '../data/impulsosData';
import type { Necesidad } from '../data/impulsosData';

const ImpulsoDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const impulso = slug ? getImpulsoBySlug(slug) : undefined;
  const necesidades = impulso ? getNecesidadesByImpulso(impulso.id) : [];

  if (!impulso) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-sage-green mb-4">
            Impulso no encontrado
          </h2>
          <Link 
            to="/impulsos"
            className="bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Volver a Impulsos
          </Link>
        </div>
      </div>
    );
  }

  const generateWhatsAppMessage = (necesidad: Necesidad) => {
    const mensaje = `Hola! Estoy interesado/a en colaborar con "${necesidad.titulo_necesidad}" del impulso ${impulso.nombre_impulso}. Me gustaría conocer más detalles sobre esta oportunidad de voluntariado.`;
    const whatsappUrl = `https://wa.me/${impulso.whatsapp_contacto.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Urgente':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'Cubierta temporalmente':
        return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Zap className="w-4 h-4 text-green-500" />;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Urgente':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Cubierta temporalmente':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const generateGeneralWhatsApp = () => {
    const mensaje = `Hola! Me interesa conocer más sobre el impulso ${impulso.nombre_impulso}. ¿Podrían brindarme más información?`;
    const whatsappUrl = `https://wa.me/${impulso.whatsapp_contacto.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header con navegación */}
      <div className="bg-white border-b border-sage-green/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/impulsos"
            className="flex items-center text-sage-green hover:text-accent-purple transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a Nuestros Impulsos
          </Link>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green">
            {impulso.nombre_impulso}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Información principal del impulso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Imagen */}
          <div>
            <img 
              src={impulso.imagen_principal}
              alt={impulso.nombre_impulso}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
          
          {/* Información del impulso */}
          <div className="space-y-8">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {impulso.descripcion_corta}
              </p>
            </div>

            {/* Información práctica */}
            <div className="bg-blue-gray rounded-xl p-6 space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-sage-green mr-3" />
                <div>
                  <p className="font-medium text-sage-green">Días y Horarios</p>
                  <p className="text-gray-600">{impulso.dias_horarios}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-sage-green mr-3" />
                <div>
                  <p className="font-medium text-sage-green">Dirección</p>
                  <p className="text-gray-600">{impulso.direccion}</p>
                </div>
              </div>
              
              <button 
                onClick={generateGeneralWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contactar por WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Necesidades de Colaboración */}
        {necesidades.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-sage-green mb-4">
                Necesitamos tu Ayuda: Colabora con {impulso.nombre_impulso}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Aquí listamos las tareas o puestos que requieren colaboración voluntaria de nuestra comunidad. 
                ¡Tu ayuda es esencial para que este impulso siga creciendo!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {necesidades.map((necesidad) => (
                <div key={necesidad.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-heading font-semibold text-sage-green flex-1">
                      {necesidad.titulo_necesidad}
                    </h3>
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(necesidad.estado_necesidad)}`}>
                      {getEstadoIcon(necesidad.estado_necesidad)}
                      <span className="ml-1">{necesidad.estado_necesidad}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {necesidad.descripcion_necesidad}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Tiempo: {necesidad.tiempo_compromiso}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Días: {necesidad.dias_compromiso}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={() => generateWhatsAppMessage(necesidad)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Quiero Colaborar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpulsoDetail;