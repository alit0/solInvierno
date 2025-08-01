import { useState, useEffect } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { supabase } from '../config/supabase';
import EditButton from './EditButton';

interface EducationalProposalContent {
  id: string;
  title: string;
  intro_text: string;
  paragraph_1: string;
  paragraph_2: string;
  question_text: string;
  button_text: string;
  button_url: string;
}

const EducationalProposal = () => {
  // Estado para almacenar el contenido
  const [content, setContent] = useState<EducationalProposalContent | null>(null);
  
  // Estado para la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<EducationalProposalContent | null>(null);
  
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
          .from('educational_proposal')
          .select('*')
          .single();
        
        if (error) throw error;
        
        setContent(data);
        setEditedContent(data);
      } catch (error: any) {
        console.error('Error al cargar el contenido:', error.message);
        setStatus({ loading: false, error: 'No se pudo cargar el contenido' });
      } finally {
        setStatus({ loading: false, error: '' });
      }
    };
    
    fetchContent();
  }, []);

  // Manejar cambios en los campos editables
  const handleInputChange = (field: keyof EducationalProposalContent, value: string) => {
    if (editedContent) {
      setEditedContent({ ...editedContent, [field]: value });
    }
  };

  // Guardar los cambios en Supabase
  const handleSave = async () => {
    if (!editedContent || !content) return;
    
    try {
      setStatus({ loading: true, error: '' });
      
      const { error } = await supabase
        .from('educational_proposal')
        .update({
          title: editedContent.title,
          intro_text: editedContent.intro_text,
          paragraph_1: editedContent.paragraph_1,
          paragraph_2: editedContent.paragraph_2,
          question_text: editedContent.question_text,
          button_text: editedContent.button_text,
          button_url: editedContent.button_url
        })
        .eq('id', content.id);
      
      if (error) throw error;
      
      setContent(editedContent);
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
    setEditedContent(content);
    setIsEditing(false);
  };

  // Si está cargando, mostrar un indicador de carga
  if (status.loading && !content) {
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
  if (status.error && !content) {
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

  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                    setEditedContent(content);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Title Column */}
          <div className="lg:col-span-1">
            {isEditing && isAuthenticated ? (
              <div>
                <label htmlFor="title" className="block text-xs text-gray-500 mb-1">Título:</label>
                <input
                  type="text"
                  id="title"
                  value={editedContent?.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple text-xl font-bold"
                />
              </div>
            ) : (
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green leading-tight">
                {content?.title || 'Nuestra propuesta educativa'}
              </h2>
            )}
          </div>

          {/* Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {isEditing && isAuthenticated ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="intro_text" className="block text-xs text-gray-500 mb-1">Texto introductorio:</label>
                    <textarea
                      id="intro_text"
                      value={editedContent?.intro_text || ''}
                      onChange={(e) => handleInputChange('intro_text', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="paragraph_1" className="block text-xs text-gray-500 mb-1">Párrafo 1:</label>
                    <textarea
                      id="paragraph_1"
                      value={editedContent?.paragraph_1 || ''}
                      onChange={(e) => handleInputChange('paragraph_1', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="paragraph_2" className="block text-xs text-gray-500 mb-1">Párrafo 2:</label>
                    <textarea
                      id="paragraph_2"
                      value={editedContent?.paragraph_2 || ''}
                      onChange={(e) => handleInputChange('paragraph_2', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {content?.intro_text || 'En Sol de Invierno, ofrecemos la Pedagogía Waldorf como un camino educativo vivo y respetuoso, acompañando a tu hijo desde sala maternal hasta 6to grado de primaria.'}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {content?.paragraph_1 || 'Nuestro proyecto educativo, centrado en el desarrollo pleno de cada niño y en el respeto a sus etapas evolutivas, cuenta con el reconocimiento del Ministerio de Educación.'}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {content?.paragraph_2 || 'La pedagogía Waldorf reconoce que cada niño es único y que su desarrollo se da en etapas bien definidas. Nuestro enfoque integral abarca lo intelectual, lo artístico y lo práctico, nutriendo tanto el pensamiento como el sentimiento y la voluntad.'}
                  </p>
                </>
              )}
            </div>
            
            <div className="pt-4">
              {isEditing && isAuthenticated ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="question_text" className="block text-xs text-gray-500 mb-1">Texto de pregunta:</label>
                    <input
                      type="text"
                      id="question_text"
                      value={editedContent?.question_text || ''}
                      onChange={(e) => handleInputChange('question_text', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="button_text" className="block text-xs text-gray-500 mb-1">Texto del botón:</label>
                    <input
                      type="text"
                      id="button_text"
                      value={editedContent?.button_text || ''}
                      onChange={(e) => handleInputChange('button_text', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="button_url" className="block text-xs text-gray-500 mb-1">URL del botón:</label>
                    <input
                      type="text"
                      id="button_url"
                      value={editedContent?.button_url || ''}
                      onChange={(e) => handleInputChange('button_url', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-sage-green mb-4">
                    {content?.question_text || '¿Qué es la pedagogía Waldorf?'}
                  </p>
                  <a 
                    href={content?.button_url || '/propuesta-educativa'} 
                    className="inline-block bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {content?.button_text || 'Propuesta educativa'}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalProposal;