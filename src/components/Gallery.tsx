import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import '../embla.css';

const images = [
    { url: "https://images.pexels.com/photos/8535007/pexels-photo-8535007.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Niños jugando al aire libre en actividades Waldorf" },
    { url: "https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Actividades artísticas y creativas en la escuela" },
    { url: "https://images.pexels.com/photos/8535163/pexels-photo-8535163.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Momentos de aprendizaje y juego en comunidad" },
    { url: "https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Niños en ambiente natural Waldorf" },
    { url: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Actividades comunitarias y familiares" },
    { url: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Niños explorando la naturaleza" },
    { url: "https://images.pexels.com/photos/8613297/pexels-photo-8613297.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Actividades de aprendizaje creativo" },
    { url: "https://images.pexels.com/photos/8613090/pexels-photo-8613090.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Juegos y actividades grupales" },
    { url: "https://images.pexels.com/photos/8535161/pexels-photo-8535161.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Momentos de concentración y aprendizaje" },
    { url: "https://images.pexels.com/photos/8535162/pexels-photo-8535162.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1", alt: "Actividades artísticas y manuales" }
];

const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const openModal = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-sage-green mb-4">Momentos que inspiran</h2>
            <p className="text-lg text-gray-600">Mercedes, Buenos Aires, Argentina</p>
          </div>

          <div className="relative embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {images.map((image, index) => (
                  <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] px-3" key={index}>
                    <div 
                      className="group cursor-pointer"
                      onClick={() => openModal(index)}
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
                  </div>
                ))}
              </div>
            </div>

            <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10">
              <ChevronLeft className="w-6 h-6 text-sage-green" />
            </button>
            <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10">
              <ChevronRight className="w-6 h-6 text-sage-green" />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? 'bg-accent-purple scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button onClick={closeModal} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <img src={images[selectedImage].url} alt={images[selectedImage].alt} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
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