import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    {
      url: "https://images.pexels.com/photos/8535007/pexels-photo-8535007.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Niños jugando al aire libre en actividades Waldorf"
    },
    {
      url: "https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Actividades artísticas y creativas en la escuela"
    },
    {
      url: "https://images.pexels.com/photos/8535163/pexels-photo-8535163.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Momentos de aprendizaje y juego en comunidad"
    },
    {
      url: "https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Niños en ambiente natural Waldorf"
    },
    {
      url: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Actividades comunitarias y familiares"
    },
    {
      url: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Niños explorando la naturaleza"
    },
    {
      url: "https://images.pexels.com/photos/8613297/pexels-photo-8613297.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Actividades de aprendizaje creativo"
    },
    {
      url: "https://images.pexels.com/photos/8613090/pexels-photo-8613090.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Juegos y actividades grupales"
    },
    {
      url: "https://images.pexels.com/photos/8535161/pexels-photo-8535161.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Momentos de concentración y aprendizaje"
    },
    {
      url: "https://images.pexels.com/photos/8535162/pexels-photo-8535162.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
      alt: "Actividades artísticas y manuales"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % images.length;
      visibleImages.push({ ...images[index], originalIndex: index });
    }
    return visibleImages;
  };

  return (
    <>
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-sage-green mb-4">
              Momentos que inspiran
            </h2>
            <p className="text-lg text-gray-600">
              Mercedes, Buenos Aires, Argentina
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {getVisibleImages().map((image, index) => (
                <div 
                  key={`${currentIndex}-${index}`} 
                  className="group cursor-pointer"
                  onClick={() => openModal(image.originalIndex)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <img 
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-sage-green" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-sage-green" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-accent-purple scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <p className="text-sm">{images[selectedImage].alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;