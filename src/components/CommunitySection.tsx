import { useState, useEffect } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { supabase } from '../config/supabase';

interface CommunitySectionContent {
  id: string;
  title: string;
  background_image: string;
  background_alt: string;
  overlay_opacity: number;
}

const CommunitySection = () => {
  // Estado para almacenar el contenido
  const [content, setContent] = useState<CommunitySectionContent | null>(null);
  
  // Estado para la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<CommunitySectionContent | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
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
    const fetchContent = async () => {
      try {
        setStatus({ loading: true, error: '' });
        
        const { data, error } = await supabase
          .from('community_section')
          .select('*')
          .single();
        
        if (error) throw error;
        
        setContent(data);
        setEditedContent(data);
      } catch (error: any) {
        console.error('Error al cargar el contenido de la sección comunidad:', error.message);
        setStatus({ loading: false, error: 'No se pudo cargar el contenido' });
      } finally {
        setStatus({ loading: false, error: '' });
      }
    };
    
    fetchContent();
  }, []);

  // Manejar cambios en los campos editables
  const handleInputChange = (field: keyof CommunitySectionContent, value: string | number) => {
    if (editedContent) {
      setEditedContent({ ...editedContent, [field]: value });
    }
  };

  // Manejar cambio de imagen
  const handleImageChange = (url: string) => {
    if (editedContent) {
      setEditedContent({ ...editedContent, background_image: url });
      setPreviewImage(url);
    }
  };

  // Guardar los cambios en Supabase
  const handleSave = async () => {
    if (!editedContent || !content) return;
    
    try {
      setStatus({ loading: true, error: '' });
      
      const { error } = await supabase
        .from('community_section')
        .update({
          title: editedContent.title,
          background_image: editedContent.background_image,
          background_alt: editedContent.background_alt,
          overlay_opacity: editedContent.overlay_opacity
        })
        .eq('id', content.id);
      
      if (error) throw error;
      
      setContent(editedContent);
      setIsEditing(false);
      setPreviewImage(null);
    } catch (error: any) {
      console.error('Error al guardar los cambios:', error.message);
      setStatus({ loading: false, error: 'No se pudieron guardar los cambios' });
    } finally {
      setStatus({ loading: false, error: '' });
    }
  };

  // Cancelar la edición
  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
    setPreviewImage(null);
  };

  // Si está cargando, mostrar un indicador de carga
  if (status.loading && !content) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="flex justify-center items-center h-64 bg-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green"></div>
        </div>
      </section>
    );
  }

  // Si hay un error y no hay contenido, mostrar un mensaje de error
  if (status.error && !content) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="flex justify-center items-center h-64 bg-gray-200">
          <p className="text-red-500">{status.error}</p>
        </div>
      </section>
    );
  }

  const backgroundImageUrl = (isEditing && previewImage) ? previewImage : content?.background_image || '';
  const overlayOpacity = (isEditing && editedContent) ? editedContent.overlay_opacity : content?.overlay_opacity || 0.4;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Botones de edición - Solo para usuarios autenticados */}
      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-20">
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
                onClick={handleCancel}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-accent-purple hover:bg-accent-purple/90 text-white px-3 py-1 rounded text-sm"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Editar
            </button>
          )}
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImageUrl}
          alt={content?.background_alt || "Comunidad escolar reunida"}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {isEditing && isAuthenticated ? (
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título:</label>
                <textarea
                  id="title"
                  value={editedContent?.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="background_image" className="block text-sm font-medium text-gray-700 mb-1">URL de imagen de fondo:</label>
                <input
                  type="text"
                  id="background_image"
                  value={editedContent?.background_image || ''}
                  onChange={(e) => handleImageChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                />
              </div>
              <div>
                <label htmlFor="background_alt" className="block text-sm font-medium text-gray-700 mb-1">Texto alternativo de la imagen:</label>
                <input
                  type="text"
                  id="background_alt"
                  value={editedContent?.background_alt || ''}
                  onChange={(e) => handleInputChange('background_alt', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                />
              </div>
              <div>
                <label htmlFor="overlay_opacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Opacidad del overlay: {editedContent?.overlay_opacity || 0.4}
                </label>
                <input
                  type="range"
                  id="overlay_opacity"
                  min="0"
                  max="1"
                  step="0.05"
                  value={editedContent?.overlay_opacity || 0.4}
                  onChange={(e) => handleInputChange('overlay_opacity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight max-w-4xl mx-auto">
              {content?.title || 'Una comunidad donde crecer juntos con amor y respeto.'}
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunitySection;