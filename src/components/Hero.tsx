import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { Pencil, Save, X } from 'lucide-react';
import EditButton from './EditButton';

interface HeroContent {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  content: string;
  image_url: string;
}

const Hero = () => {
  // Estado para almacenar el contenido de la sección Hero
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  // Estado para controlar si se está en modo de edición
  const [isEditing, setIsEditing] = useState(false);
  // Estado para almacenar los valores editados temporalmente
  const [editedContent, setEditedContent] = useState<HeroContent | null>(null);
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para mostrar mensajes de loading/error
  const [status, setStatus] = useState({ loading: true, error: '' });

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
    const fetchHeroContent = async () => {
      try {
        setStatus({ loading: true, error: '' });
        
        const { data, error } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('section', 'Pedagogía Waldorf')
          .single();
        
        if (error) throw error;
        
        setHeroContent(data);
        setEditedContent(data);
      } catch (error: any) {
        console.error('Error al cargar el contenido:', error.message);
        setStatus({ loading: false, error: 'No se pudo cargar el contenido' });
      } finally {
        setStatus({ loading: false, error: '' });
      }
    };
    
    fetchHeroContent();
  }, []);

  // Manejar los cambios en los campos editables
  const handleInputChange = (field: keyof HeroContent, value: string) => {
    if (editedContent) {
      setEditedContent({ ...editedContent, [field]: value });
    }
  };

  // Guardar los cambios en Supabase
  const handleSave = async () => {
    if (!editedContent || !heroContent) return;
    
    try {
      setStatus({ loading: true, error: '' });
      
      const { error } = await supabase
        .from('homepage_content')
        .update({
          section: editedContent.section,
          title: editedContent.title,
          subtitle: editedContent.subtitle,
          content: editedContent.content,
          image_url: editedContent.image_url
        })
        .eq('id', heroContent.id);
      
      if (error) throw error;
      
      // Actualizar el estado con los nuevos valores
      setHeroContent(editedContent);
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
    setEditedContent(heroContent);
    setIsEditing(false);
  };

  // Si está cargando, mostrar un indicador de carga
  if (status.loading && !heroContent) {
    return (
      <section className="py-12 lg:py-20 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green"></div>
          </div>
        </div>
      </section>
    );
  }

  // Si hay un error y no hay contenido, mostrar un mensaje de error
  if (status.error && !heroContent) {
    return (
      <section className="py-12 lg:py-20 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-[400px]">
            <p className="text-red-500">{status.error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              {/* Botones de edición - Solo para usuarios autenticados */}
              {isAuthenticated && (
                <div className="flex justify-end mb-4">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditedContent(heroContent);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        <X className="h-4 w-4" />
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
                <>
                  <div>
                    <label htmlFor="section" className="block text-xs text-gray-500 mb-1">Sección:</label>
                    <input
                      type="text"
                      id="section"
                      value={editedContent?.section || ''}
                      onChange={(e) => handleInputChange('section', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-xs text-gray-500 mb-1">Título:</label>
                    <input
                      type="text"
                      id="title"
                      value={editedContent?.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="subtitle" className="block text-xs text-gray-500 mb-1">Subtítulo:</label>
                    <input
                      type="text"
                      id="subtitle"
                      value={editedContent?.subtitle || ''}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-xs text-gray-500 mb-1">Contenido:</label>
                    <textarea
                      id="content"
                      value={editedContent?.content || ''}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="image_url" className="block text-xs text-gray-500 mb-1">URL de la imagen:</label>
                    <input
                      type="text"
                      id="image_url"
                      value={editedContent?.image_url || ''}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-sage-green tracking-wider uppercase">
                    {heroContent?.section || 'Pedagogía Waldorf'}
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-sage-green leading-tight">
                    {heroContent?.title || 'Nutriendo el potencial único de cada infancia.'}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {heroContent?.subtitle || 'Una comunidad donde crecer juntos, con amor y respeto hacia el ritmo natural de cada niño.'}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {heroContent?.content || 'En Sol de Invierno, ofrecemos la Pedagogía Waldorf como un camino educativo vivo y respetuoso, acompañando a tu hijo desde sala maternal hasta 6to grado de primaria.'}
                  </p>
                </>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 pt-4 flex-wrap sm:flex-nowrap">
              <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Propuesta educativa
              </button>
              <button className="border-2 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                Próximas inscripciones
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {isEditing && isAuthenticated ? (
                <div className="relative">
                  <img 
                    src={editedContent?.image_url || 'https://via.placeholder.com/800x500'}
                    alt="Vista previa de la imagen"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  {editedContent?.image_url && (
                    <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs">
                      Vista previa de la imagen
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <img 
                    src={heroContent?.image_url || 'https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                    alt="Niños jugando en un ambiente Waldorf natural al aire libre"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;