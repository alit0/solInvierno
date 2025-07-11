import React from 'react';
import { ArrowRight } from 'lucide-react';

const Impulses = () => {
  const impulses = [
    {
      title: "Papás panaderos",
      description: "Familias que se reúnen para crear panes artesanales con ingredientes naturales.",
      image: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      title: "Huerta comunitaria",
      description: "Cultivamos juntos alimentos orgánicos y enseñamos sobre la naturaleza.",
      image: "https://images.pexels.com/photos/8535007/pexels-photo-8535007.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      title: "Talleres de arte",
      description: "Espacios creativos donde niños y familias exploran diferentes expresiones artísticas.",
      image: "https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      title: "Música y movimiento",
      description: "Encuentros musicales que nutren el alma y fortalecen la comunidad.",
      image: "https://images.pexels.com/photos/8535163/pexels-photo-8535163.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      title: "Cuentacuentos",
      description: "Narraciones que despiertan la imaginación y transmiten valores.",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      title: "Trabajos manuales",
      description: "Tejido, carpintería y otras actividades que desarrollan la destreza manual.",
      image: "https://images.pexels.com/photos/8613297/pexels-photo-8613297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      title: "Festivales estacionales",
      description: "Celebraciones que honran los ritmos naturales y fortalecen la comunidad.",
      image: "https://images.pexels.com/photos/8613090/pexels-photo-8613090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {
      title: "Círculo de padres",
      description: "Espacios de encuentro, reflexión y apoyo mutuo entre las familias.",
      image: "https://images.pexels.com/photos/8535161/pexels-photo-8535161.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    }
  ];

  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green leading-tight mb-6">
            Nuestros Impulsos
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Conoce la esencia de nuestra autogestión: una comunidad de padres activa y colaborativa. 
            Cada familia participa activamente en la construcción de nuestra comunidad educativa.
          </p>
        </div>

        {/* Impulses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impulses.map((impulse, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={impulse.image}
                    alt={impulse.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-heading font-semibold text-sage-green mb-2">
                    {impulse.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {impulse.description}
                  </p>
                  <button className="flex items-center text-accent-purple hover:text-accent-purple/80 font-medium transition-colors group text-sm">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impulses;