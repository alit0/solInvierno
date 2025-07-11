import React from 'react';

const CommunitySection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Comunidad escolar reunida"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight max-w-4xl mx-auto">
            Una comunidad donde crecer juntos con amor y respeto.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;