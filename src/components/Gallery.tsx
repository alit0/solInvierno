import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, X, Pencil, Save, PlusCircle, MoveUp, MoveDown, Trash2 } from 'lucide-react';
import { supabase } from '../config/supabase';
import '../embla.css';
import EditButton from './EditButton';

interface GalleryContent {
  id: string;
  title: string;
  subtitle: string;
}

interface GalleryImage {
  id: string;
  gallery_id: string;
  url: string;
  alt: string;
  sort_order: number;
}

const Gallery = () => {
  // Estado para almacenar el contenido del carrusel
  const [galleryContent, setGalleryContent] = useState<GalleryContent | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  
  // Estado para la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<GalleryContent | null>(null);
  const [editedImages, setEditedImages] = useState<GalleryImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Estado para mostrar mensajes de loading/error
  const [status, setStatus] = useState({ loading: true, error: '' });

  // Estado para el carrusel y modal
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Si hay sesión, verificar si el usuario es admin
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setIsAuthenticated(profileData?.role === 'admin');
      } else {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    // Suscripción a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAuth();
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Cargar el contenido desde Supabase
  useEffect(() => {
    const fetchGalleryContent = async () => {
      try {
        setStatus({ loading: true, error: '' });
        
        // Cargar el contenido principal del carrusel
        const { data: contentData, error: contentError } = await supabase
          .from('gallery_content')
          .select('*')
          .single();
        
        if (contentError) throw contentError;
        
        setGalleryContent(contentData);
        setEditedContent(contentData);
        
        // Cargar las imágenes del carrusel
        const { data: imagesData, error: imagesError } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('gallery_id', contentData.id)
          .order('sort_order', { ascending: true });
        
        if (imagesError) throw imagesError;
        
        setGalleryImages(imagesData);
        setEditedImages(imagesData);
      } catch (error: any) {
        console.error('Error al cargar el contenido del carrusel:', error.message);
        setStatus({ loading: false, error: 'No se pudo cargar el carrusel' });
      } finally {
        setStatus({ loading: false, error: '' });
      }
    };
    
    fetchGalleryContent();
  }, []);

  // Funciones para el carrusel
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

  // Manejar los cambios en los campos editables
  const handleInputChange = (field: keyof GalleryContent, value: string) => {
    if (editedContent) {
      setEditedContent({ ...editedContent, [field]: value });
    }
  };

  // Manejar los cambios en las imágenes editables
  const handleImageChange = (index: number, field: keyof GalleryImage, value: string) => {
    const updatedImages = [...editedImages];
    updatedImages[index] = { ...updatedImages[index], [field]: value };
    setEditedImages(updatedImages);
  };

  // Añadir una nueva imagen
  const addNewImage = () => {
    if (!newImageUrl.trim() || !newImageAlt.trim() || !editedContent) return;
    
    const newImage: GalleryImage = {
      id: `temp-${Date.now()}`, // ID temporal, se reemplazará al guardar
      gallery_id: editedContent.id,
      url: newImageUrl,
      alt: newImageAlt,
      sort_order: editedImages.length > 0 ? Math.max(...editedImages.map(img => img.sort_order)) + 1 : 1
    };
    
    setEditedImages([...editedImages, newImage]);
    setNewImageUrl('');
    setNewImageAlt('');
  };

  // Eliminar una imagen
  const removeImage = (index: number) => {
    const updatedImages = editedImages.filter((_, i) => i !== index);
    // Actualizar sort_order para mantener la secuencia
    const reorderedImages = updatedImages.map((img, i) => ({ ...img, sort_order: i + 1 }));
    setEditedImages(reorderedImages);
  };

  // Mover una imagen hacia arriba
  const moveImageUp = (index: number) => {
    if (index <= 0) return;
    const updatedImages = [...editedImages];
    // Intercambiar con la imagen anterior
    const temp = updatedImages[index - 1].sort_order;
    updatedImages[index - 1].sort_order = updatedImages[index].sort_order;
    updatedImages[index].sort_order = temp;
    // Ordenar el array por sort_order
    updatedImages.sort((a, b) => a.sort_order - b.sort_order);
    setEditedImages(updatedImages);
  };

  // Mover una imagen hacia abajo
  const moveImageDown = (index: number) => {
    if (index >= editedImages.length - 1) return;
    const updatedImages = [...editedImages];
    // Intercambiar con la imagen siguiente
    const temp = updatedImages[index + 1].sort_order;
    updatedImages[index + 1].sort_order = updatedImages[index].sort_order;
    updatedImages[index].sort_order = temp;
    // Ordenar el array por sort_order
    updatedImages.sort((a, b) => a.sort_order - b.sort_order);
    setEditedImages(updatedImages);
  };

  // Guardar los cambios en Supabase
  const handleSave = async () => {
    if (!editedContent || !galleryContent) return;
    
    try {
      setStatus({ loading: true, error: '' });
      
      // Actualizar el contenido principal
      const { error: contentError } = await supabase
        .from('gallery_content')
        .update({
          title: editedContent.title,
          subtitle: editedContent.subtitle
        })
        .eq('id', galleryContent.id);
      
      if (contentError) throw contentError;
      
      // Procesar las imágenes
      // 1. Identificar imágenes a eliminar (las que están en galleryImages pero no en editedImages)
      const existingIds = galleryImages.map(img => img.id);
      const editedIds = editedImages.filter(img => !img.id.startsWith('temp-')).map(img => img.id);
      const idsToDelete = existingIds.filter(id => !editedIds.includes(id));
      
      // Eliminar imágenes
      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('gallery_images')
          .delete()
          .in('id', idsToDelete);
        
        if (deleteError) throw deleteError;
      }
      
      // 2. Actualizar imágenes existentes
      for (const image of editedImages.filter(img => !img.id.startsWith('temp-'))) {
        const { error: updateError } = await supabase
          .from('gallery_images')
          .update({
            url: image.url,
            alt: image.alt,
            sort_order: image.sort_order
          })
          .eq('id', image.id);
        
        if (updateError) throw updateError;
      }
      
      // 3. Insertar nuevas imágenes
      const newImages = editedImages.filter(img => img.id.startsWith('temp-')).map(img => ({
        gallery_id: galleryContent.id,
        url: img.url,
        alt: img.alt,
        sort_order: img.sort_order
      }));
      
      if (newImages.length > 0) {
        const { error: insertError } = await supabase
          .from('gallery_images')
          .insert(newImages);
        
        if (insertError) throw insertError;
      }
      
      // Recargar los datos para obtener los IDs actualizados
      const { data: imagesData, error: imagesError } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('gallery_id', galleryContent.id)
        .order('sort_order', { ascending: true });
      
      if (imagesError) throw imagesError;
      
      // Actualizar el estado con los nuevos valores
      setGalleryContent(editedContent);
      setGalleryImages(imagesData);
      setEditedImages(imagesData);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error al guardar los cambios:', error.message);
      setStatus({ loading: false, error: 'No se pudieron guardar los cambios' });
    } finally {
      setStatus({ loading: false, error: '' });
    }
  };

  // Cancelar la edición
  const handleCancel = () => {
    setEditedContent(galleryContent);
    setEditedImages(galleryImages);
    setIsEditing(false);
    setNewImageUrl('');
    setNewImageAlt('');
  };

  // Si está cargando, mostrar un indicador de carga
  if (status.loading && !galleryContent) {
    return (
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green"></div>
          </div>
        </div>
      </section>
    );
  }

  // Si hay un error y no hay contenido, mostrar un mensaje de error
  if (status.error && !galleryContent) {
    return (
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{status.error}</p>
          </div>
        </div>
      </section>
    );
  }

  const displayImages = isEditing ? editedImages : galleryImages;

  return (
    <>
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 relative">
            {/* Botones de edición - Solo para usuarios autenticados */}
            {isAuthenticated && (
              <div className="flex justify-center mb-4">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedContent(galleryContent);
                        setEditedImages(galleryImages);
                        setNewImageUrl('');
                        setNewImageAlt('');
                      }}
                      className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <EditButton 
                    onClick={() => setIsEditing(true)} 
                    centered
                  />
                )}
              </div>
            )}

            {isEditing && isAuthenticated ? (
              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <label htmlFor="title" className="block text-xs text-gray-500 mb-1 text-left">Título:</label>
                  <input
                    type="text"
                    id="title"
                    value={editedContent?.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                  />
                </div>
                <div>
                  <label htmlFor="subtitle" className="block text-xs text-gray-500 mb-1 text-left">Subtítulo:</label>
                  <input
                    type="text"
                    id="subtitle"
                    value={editedContent?.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-heading font-bold text-sage-green mb-4">
                  {galleryContent?.title || 'Momentos que inspiran'}
                </h2>
                <p className="text-lg text-gray-600">
                  {galleryContent?.subtitle || 'Mercedes, Buenos Aires, Argentina'}
                </p>
              </>
            )}
          </div>

          {/* Editor de Imágenes - Solo mostrar en modo edición */}
          {isEditing && isAuthenticated && (
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-sage-green mb-4">Gestionar imágenes del carrusel</h3>
              
              {/* Lista de imágenes actuales */}
              <div className="space-y-3 mb-6">
                {editedImages.map((image, index) => (
                  <div key={image.id} className="flex items-center bg-white p-3 rounded-md shadow-sm">
                    <div className="w-16 h-16 mr-4">
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={image.url}
                        onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                        placeholder="URL de la imagen"
                        className="w-full p-1 text-sm border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={image.alt}
                        onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                        placeholder="Descripción de la imagen"
                        className="w-full p-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 flex space-x-1">
                      <button 
                        onClick={() => moveImageUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded ${index === 0 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`}
                      >
                        <MoveUp className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => moveImageDown(index)}
                        disabled={index === editedImages.length - 1}
                        className={`p-1 rounded ${index === editedImages.length - 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`}
                      >
                        <MoveDown className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => removeImage(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Formulario para añadir nueva imagen */}
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">Añadir nueva imagen</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="URL de la nueva imagen"
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    placeholder="Descripción de la imagen"
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                  />
                  <button
                    onClick={addNewImage}
                    disabled={!newImageUrl.trim() || !newImageAlt.trim()}
                    className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Añadir imagen
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Carrusel */}
          <div className="relative embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {displayImages.map((image, index) => (
                  <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] px-3" key={image.id}>
                    <div 
                      className="group cursor-pointer"
                      onClick={() => !isEditing && openModal(index)}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500">
                        <img 
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {!isEditing && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                                <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {displayImages.length > 0 && !isEditing && (
              <>
                <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10 md:block hidden">
                  <ChevronLeft className="w-6 h-6 text-sage-green" />
                </button>
                <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 z-10 md:block hidden">
                  <ChevronRight className="w-6 h-6 text-sage-green" />
                </button>

                <div className="hidden md:flex justify-center mt-8 space-x-2 p-2">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? 'bg-accent-purple scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && !isEditing && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button onClick={closeModal} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
              <X className="w-8 h-8" />
            </button>
            {galleryImages.length > 0 && selectedImage < galleryImages.length && (
              <>
                <img 
                  src={galleryImages[selectedImage].url} 
                  alt={galleryImages[selectedImage].alt} 
                  className="max-w-full max-h-[80vh] object-contain rounded-lg" 
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                  <p className="text-sm">{galleryImages[selectedImage].alt}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;