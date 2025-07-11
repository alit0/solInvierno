import React from 'react';
import { Heart, Users, BookOpen, Home } from 'lucide-react';

const Donaciones = () => {
  const formasDonacion = [
    {
      icon: <Heart className="w-8 h-8 text-accent-purple" />,
      titulo: "Donación Monetaria",
      descripcion: "Contribuye económicamente para el sostenimiento de la escuela y sus proyectos.",
      detalles: [
        "Becas para familias con dificultades económicas",
        "Materiales pedagógicos y didácticos",
        "Mantenimiento de instalaciones",
        "Formación continua de maestros"
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-accent-purple" />,
      titulo: "Materiales Educativos",
      descripcion: "Dona libros, materiales de arte, instrumentos musicales y recursos pedagógicos.",
      detalles: [
        "Libros de cuentos y literatura infantil",
        "Materiales de arte: acuarelas, ceras, papel",
        "Instrumentos musicales: flautas, liras, tambores",
        "Herramientas para trabajos manuales"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-accent-purple" />,
      titulo: "Tiempo y Talento",
      descripcion: "Comparte tus habilidades y tiempo para enriquecer nuestra comunidad educativa.",
      detalles: [
        "Talleres especiales para niños",
        "Mantenimiento de espacios",
        "Apoyo en eventos y festivales",
        "Asesoramiento profesional"
      ]
    },
    {
      icon: <Home className="w-8 h-8 text-accent-purple" />,
      titulo: "Infraestructura",
      descripcion: "Ayuda a mejorar y mantener nuestros espacios educativos.",
      detalles: [
        "Mobiliario escolar de madera natural",
        "Equipamiento para talleres",
        "Mejoras en jardín y huerta",
        "Materiales de construcción"
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
              Donaciones
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tu apoyo hace posible que más familias puedan acceder a una educación Waldorf de calidad. 
              Cada contribución, sin importar su tamaño, fortalece nuestra comunidad educativa.
            </p>
          </div>
        </div>
      </section>

      {/* Impacto de las Donaciones */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              El Impacto de tu Donación
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada donación se traduce directamente en oportunidades educativas para nuestros niños.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <div className="text-4xl font-bold text-accent-purple mb-2">25</div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Familias Beneficiadas
              </h3>
              <p className="text-lg text-gray-600">
                Con becas parciales y totales para acceder a la educación Waldorf
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <div className="text-4xl font-bold text-accent-purple mb-2">100%</div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Transparencia
              </h3>
              <p className="text-lg text-gray-600">
                Todas las donaciones se destinan directamente a la educación
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <div className="text-4xl font-bold text-accent-purple mb-2">10</div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Años de Impacto
              </h3>
              <p className="text-lg text-gray-600">
                Construyendo una comunidad educativa sólida y sostenible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formas de Donación */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Formas de Colaborar
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hay muchas maneras de apoyar nuestro proyecto educativo. Encuentra la que mejor se adapte a tus posibilidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formasDonacion.map((forma, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-gray rounded-full flex items-center justify-center mr-4">
                    {forma.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-sage-green">
                    {forma.titulo}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">
                  {forma.descripcion}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sage-green">Incluye:</h4>
                  <ul className="space-y-2">
                    {forma.detalles.map((detalle, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-lg text-gray-600">{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información de Donación */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
                Datos para Transferencias
              </h2>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-sage-green">Titular:</p>
                    <p className="text-lg text-gray-600">Asociación Civil Sol de Invierno</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sage-green">CUIT:</p>
                    <p className="text-lg text-gray-600">30-12345678-9</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sage-green">Banco:</p>
                    <p className="text-lg text-gray-600">Banco Nación</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sage-green">CBU:</p>
                    <p className="text-lg text-gray-600">0110123456789012345678</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sage-green">Alias:</p>
                    <p className="text-lg text-gray-600">SOL.INVIERNO.ESCUELA</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
                Donaciones en Especie
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Si prefieres donar materiales o equipamiento, contáctanos para coordinar 
                la entrega y asegurarnos de que sea lo que más necesitamos en este momento.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                  Contacto para Donaciones
                </h3>
                <div className="space-y-2">
                  <p className="text-lg text-gray-600">
                    <span className="font-semibold">Email:</span> donaciones@soldeInvierno.edu.ar
                  </p>
                  <p className="text-lg text-gray-600">
                    <span className="font-semibold">Teléfono:</span> +54 11 xxxx-xxxx
                  </p>
                  <p className="text-lg text-gray-600">
                    <span className="font-semibold">Horarios:</span> Lunes a Viernes de 8:00 a 17:00 hs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Sé Parte del Cambio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Tu donación no solo apoya la educación de nuestros niños, sino que contribuye 
              a construir una sociedad más consciente y respetuosa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Donar Ahora
              </button>
              <button className="border-2 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Más Información
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donaciones;