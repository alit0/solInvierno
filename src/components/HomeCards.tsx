import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pencil, Save, X } from 'lucide-react';
import { supabase } from '../config/supabase';
import { impulsosData, necesidadesData, Impulso, Necesidad } from '../data/impulsosData';
import EditButton from './EditButton';

interface AboutSectionContent {
  id: string;
  title: string;
  paragraph_1: string;
  paragraph_2: string;
  question_text: string;
}

const HomeCards = () => {
  // Estado para almacenar el contenido de la sección "Conoce más sobre nosotros"
  const [aboutContent, setAboutContent] = useState<AboutSectionContent | null>(null);
  
  // Estado para la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<AboutSectionContent | null>(null);
  
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Estado para mostrar mensajes de loading/error
  const [status, setStatus] = useState({ loading: true, error: '' });

  // Utilizamos estados para mantener compatibilidad con el código existente
  const [impulsos, setImpulsos] = useState<Impulso[]>([]);
  const [necesidadesPorImpulso, setNecesidadesPorImpulso] = useState<Record<string, Necesidad[]>>({});

  const primaryCards = [
    {
      title: "La Escuela",
      description: "Conoce el camino recorrido y los valores que nos guían como comunidad educativa.",
      image: "https://images.pexels.com/photos/8535004/pexels-photo-8535004.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/la-escuela"
    },
    {
      title: "Pedagogía Waldorf",
      description: "Descubre los principios y metodología que sustentan nuestro proyecto educativo.",
      image: "https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/la-escuela#pedagogia-waldorf"
    },
    {
      title: "Niveles",
      description: "Descubre nuestros programas para Maternal, Jardín y Primaria, adaptados a cada etapa del desarrollo.",
      image: "https://images.pexels.com/photos/8535163/pexels-photo-8535163.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      link: "/niveles"
    }
  ];

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
          .from('about_section')
          .select('*')
          .single();
        
        if (error) throw error;
        
        setAboutContent(data);
        setEditedContent(data);
      } catch (error: any) {
        console.error('Error al cargar el contenido de la sección About:', error.message);
        setStatus({ loading: false, error: 'No se pudo cargar el contenido' });
      } finally {
        setStatus({ loading: false, error: '' });
      }
    };
    
    fetchContent();
  }, []);

  // Reemplazamos el useEffect de carga de impulsos y pedidos para usar datos estáticos
  useEffect(() => {
    console.log('Cargando datos estáticos en HomeCards.tsx');
    
    // Filtramos solo los impulsos activos
    const impulsosActivos = impulsosData.filter(impulso => impulso.activo);
    setImpulsos(impulsosActivos);
    
    console.log('Impulsos cargados:', impulsosActivos.length);
    
    // Agrupamos las necesidades por impulso_id (equivalentes a pedidos)
    const necesidadesPorImpulso: Record<string, Necesidad[]> = {};
    necesidadesData.forEach((necesidad) => {
      // Solo incluimos necesidades de impulsos activos
      if (impulsosActivos.some(impulso => impulso.id === necesidad.impulso_id)) {
        if (!necesidadesPorImpulso[necesidad.impulso_id]) {
          necesidadesPorImpulso[necesidad.impulso_id] = [];
        }
        necesidadesPorImpulso[necesidad.impulso_id].push(necesidad);
      }
    });
    
    // Log detallado de los pedidos agrupados
    console.log("Desglose de necesidades por impulso (datos estáticos):");
    impulsosActivos.forEach(impulso => {
      const necesidadesDelImpulso = necesidadesPorImpulso[impulso.id] || [];
      console.log(`Impulso: ${impulso.nombre_impulso} (ID: ${impulso.id}): ${necesidadesDelImpulso.length} necesidades`);
      necesidadesDelImpulso.forEach(necesidad => {
        console.log(`  - Necesidad: ${necesidad.titulo_necesidad} (Estado: ${necesidad.estado_necesidad})`);
      });
    });
    
    setNecesidadesPorImpulso(necesidadesPorImpulso);
    
  }, []);

  // Función para obtener los badges según las necesidades del impulso
  const getBadgesByImpulsoId = (impulsoId: string) => {
    const necesidades = necesidadesPorImpulso[impulsoId] || [];
    console.log(`Calculando badges para impulso ${impulsoId}, encontrados ${necesidades.length} necesidades`);
    
    // Contadores para cada tipo de estado
    let urgentes = 0;
    let abiertas = 0;
    let cubiertas = 0;
    
    necesidades.forEach(necesidad => {
      if (necesidad.estado_necesidad === 'Urgente') urgentes++;
      else if (necesidad.estado_necesidad === 'Abierta') abiertas++;
      else if (necesidad.estado_necesidad === 'Cubierta temporalmente') cubiertas++;
    });
    
    console.log(`Badges para impulso ${impulsoId}: urgentes=${urgentes}, abiertas=${abiertas}, cubiertas=${cubiertas}, total=${necesidades.length}`);
    
    return { urgentes, abiertas, cubiertas, total: necesidades.length };
  };

  // Manejar cambios en los campos editables
  const handleInputChange = (field: keyof AboutSectionContent, value: string) => {
    if (editedContent) {
      setEditedContent({ ...editedContent, [field]: value });
    }
  };

  // Guardar los cambios en Supabase
  const handleSave = async () => {
    if (!editedContent || !aboutContent) return;
    
    try {
      setStatus({ loading: true, error: '' });
      
      const { error } = await supabase
        .from('about_section')
        .update({
          title: editedContent.title,
          paragraph_1: editedContent.paragraph_1,
          paragraph_2: editedContent.paragraph_2,
          question_text: editedContent.question_text
        })
        .eq('id', aboutContent.id);
      
      if (error) throw error;
      
      setAboutContent(editedContent);
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
    setEditedContent(aboutContent);
    setIsEditing(false);
  };

  // Si está cargando, mostrar un indicador de carga
  if (status.loading && !aboutContent) {
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
  if (status.error && !aboutContent) {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 relative">
          {isAuthenticated ? (
            isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <EditButton onClick={() => setIsEditing(true)} centered />
            )
          ) : null}


          <div className="lg:col-span-1">
            {isEditing && isAuthenticated ? (
              <textarea
                value={editedContent?.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple text-2xl font-heading font-bold text-sage-green"
                rows={3}
              />
            ) : (
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green leading-tight">
                {aboutContent?.title || 'Conoce más sobre nosotros'}
              </h2>
            )}
          </div>


          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {isEditing && isAuthenticated ? (
                <>
                  <textarea
                    value={editedContent?.paragraph_1 || ''}
                    onChange={(e) => handleInputChange('paragraph_1', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    rows={4}
                  />
                  <textarea
                    value={editedContent?.paragraph_2 || ''}
                    onChange={(e) => handleInputChange('paragraph_2', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple"
                    rows={4}
                  />
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {aboutContent?.paragraph_1 || 'En Sol de Invierno, ofrecemos la Pedagogía Waldorf como un camino educativo vivo y respetuoso, acompañando a tu hijo desde sala maternal hasta 6to grado de primaria.'}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {aboutContent?.paragraph_2 || 'Nuestro proyecto educativo, centrado en el desarrollo pleno de cada niño y en el respeto a sus etapas evolutivas, cuenta con el reconocimiento del Ministerio de Educación.'}
                  </p>
                </>
              )}
            </div>
            
            <div className="pt-4">
              {isEditing && isAuthenticated ? (
                <input
                  type="text"
                  value={editedContent?.question_text || ''}
                  onChange={(e) => handleInputChange('question_text', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-accent-purple focus:border-accent-purple text-sm font-medium"
                />
              ) : (
                <p className="text-sm font-medium text-sage-green mb-4">
                  {aboutContent?.question_text || '¿Qué es la pedagogía Waldorf?'}
                </p>
              )}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {primaryCards.map((card, index) => (
            <Link key={index} to={card.link} className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-sage-green mb-3">
                    {card.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <button className="flex items-center text-accent-purple hover:text-accent-purple/80 font-medium transition-colors group">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCards;