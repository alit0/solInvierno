import React from 'react';
import { Calendar, FileText, Users, CheckCircle } from 'lucide-react';

const Inscripciones = () => {
  const pasos = [
    {
      numero: 1,
      titulo: "Entrevista Inicial",
      descripcion: "Conversamos sobre la pedagogía Waldorf y conocemos las expectativas de la familia."
    },
    {
      numero: 2,
      titulo: "Visita a la Escuela",
      descripcion: "La familia visita nuestras instalaciones y conoce a los maestros y la comunidad."
    },
    {
      numero: 3,
      titulo: "Período de Adaptación",
      descripcion: "El niño participa de algunas actividades para conocer el ambiente escolar."
    },
    {
      numero: 4,
      titulo: "Confirmación",
      descripcion: "Se confirma la inscripción y se integra la familia a la comunidad."
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green mb-6">
              Inscripciones
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Te acompañamos en el proceso de incorporación a nuestra comunidad educativa. 
              Cada familia es única y merece un acompañamiento personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* Información General */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Período de Inscripción
              </h3>
              <p className="text-lg text-gray-600">
                Agosto a Noviembre para el año siguiente
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Documentación
              </h3>
              <p className="text-lg text-gray-600">
                Formulario de inscripción y documentación personal
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Edades
              </h3>
              <p className="text-lg text-gray-600">
                Desde 2 años (Maternal) hasta 12 años (6to grado)
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                Reconocimiento
              </h3>
              <p className="text-lg text-gray-600">
                Certificados oficiales reconocidos por el Ministerio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Inscripción */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              Proceso de Inscripción
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nuestro proceso está diseñado para asegurar que tanto la familia como la escuela 
              estén alineadas en la visión educativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pasos.map((paso, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{paso.numero}</span>
                  </div>
                  {index < pasos.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-accent-purple/30 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                  {paso.titulo}
                </h3>
                <p className="text-lg text-gray-600">
                  {paso.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
                Requisitos de Inscripción
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-lg text-gray-600">Formulario de inscripción completo</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-lg text-gray-600">Partida de nacimiento del niño/a</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-lg text-gray-600">DNI del niño/a y de los padres</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-lg text-gray-600">Certificado de vacunación al día</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-lg text-gray-600">Pase de la escuela anterior (si corresponde)</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-lg text-gray-600">Compromiso de participación familiar en la autogestión</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
                Compromiso Familiar
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                En Sol de Invierno, cada familia se compromete a participar activamente en la vida escolar 
                a través de diferentes impulsos y actividades comunitarias.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-heading font-bold text-sage-green mb-4">
                  Formas de Participación
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-lg text-gray-600">Participación en impulsos (panadería, huerta, arte, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-lg text-gray-600">Colaboración en festivales y eventos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-lg text-gray-600">Participación en comisiones de trabajo</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-lg text-gray-600">Apoyo en actividades pedagógicas</span>
                  </li>
                </ul>
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
              ¿Listos para Comenzar?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Si sientes que la Pedagogía Waldorf resuena con tu visión educativa, 
              te invitamos a contactarnos para comenzar este hermoso camino juntos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Solicitar Entrevista
              </button>
              <button className="border-2 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Descargar Formulario
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inscripciones;