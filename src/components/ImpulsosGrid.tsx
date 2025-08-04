import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Loader2 } from 'lucide-react';
import { supabase } from '../config/supabase';
import type { Session } from '@supabase/supabase-js';
import EditButton from './EditButton';

// Interfaces
interface Impulso {
  id: string;
  nombre_impulso: string;
  descripcion_corta: string;
  imagen_principal: string;
  dias_horarios: string;
  direccion: string;
  whatsapp_contacto: string;
  orden_visual: number;
  activo: boolean;
  slug: string;
  created_at?: string;
}

interface Pedido {
  id: string;
  titulo_necesidad: string;
  descripcion_necesidad: string;
  tiempo_compromiso: string;
  dias_compromiso: string;
  estado_necesidad: 'Abierta' | 'Cubierta temporalmente' | 'Urgente';
  fecha_publicacion: string;
  orden_visual: number;
  activo: boolean;
  impulso_id: string;
}

const ImpulsosGrid: React.FC = () => {
  const [impulsos, setImpulsos] = useState<Impulso[]>([]);
  const [necesidadesPorImpulso, setNecesidadesPorImpulso] = useState<Record<string, Pedido[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sectionTitle, setSectionTitle] = useState<string>('Nuestros Impulsos');
  const [sectionText, setSectionText] = useState<string>('Conoce la esencia de nuestra autogestión: una comunidad de padres activa y colaborativa. Cada familia participa activamente en la construcción de nuestra comunidad educativa, aportando sus talentos y energías para crear un ambiente rico y diverso donde nuestros hijos puedan crecer.');
  const [isSaving, setIsSaving] = useState<boolean>(false);

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

  // Verificar sesión y rol de administrador
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        
        if (currentSession) {
          // Usuario autenticado
          setIsAuthenticated(true);
          
          // Verificar si el usuario es administrador
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();
            
          if (profileError) {
            console.error('Error al verificar rol de administrador:', profileError);
            setIsAdmin(false);
          } else {
            setIsAdmin(profileData?.role === 'admin');
          }
        } else {
          setIsAdmin(false);
          setIsAuthenticated(false); // Asegurarse de actualizar isAuthenticated cuando no hay sesión
        }
      } catch (err) {
        console.error('Error al verificar sesión:', err);
        setIsAdmin(false);
        setIsAuthenticated(false); // También actualizar en caso de error
      }
    };
    
    checkSession();
    
    // Suscribirse a cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      if (!session) {
        // Si se cerró sesión, actualizar estado inmediatamente
        setIsAdmin(false);
        setIsAuthenticated(false); // Actualizar isAuthenticated cuando se cierra sesión
      } else {
        // Si hay nueva sesión, verificar rol
        checkSession();
      }
    });
    
    // Limpiar suscripción cuando el componente se desmonte
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Cargar datos del contenido de la sección desde Supabase
  useEffect(() => {
    const fetchSectionContent = async () => {
      try {
        const { data: sectionData, error: sectionError } = await supabase
          .from('homepage_content')
          .select('title, subtitle')
          .eq('section', 'impulsos')
          .single();
          
        if (sectionError && sectionError.code !== 'PGRST116') { // PGRST116 es "No se encontraron resultados"
          console.error('Error al cargar contenido de la sección:', sectionError);
        } else if (sectionData) {
          setSectionTitle(sectionData.title);
          setSectionText(sectionData.subtitle);
        }
      } catch (error) {
        console.error('Error al cargar contenido de la sección:', error);
      }
    };
    
    fetchSectionContent();
  }, []);

  // Cargar impulsos desde Supabase
  useEffect(() => {
    const fetchImpulsos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Consultar impulsos ordenados por orden_visual para mantener el orden deseado
        const { data: impulsosData, error: impulsosError } = await supabase
          .from('impulsos')
          .select('*')
          .eq('activo', true)
          .order('orden_visual', { ascending: true });
        
        if (impulsosError) {
          throw impulsosError;
        }
        
        console.log('Impulsos cargados desde Supabase:', impulsosData?.length);
        setImpulsos(impulsosData);
      } catch (err: any) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los impulsos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchImpulsos();
  }, []);

  // Cargar necesidades desde Supabase para los badges
  useEffect(() => {
    const fetchNecesidades = async () => {
      try {
        const { data: pedidosData, error: pedidosError } = await supabase
          .from('pedidos')
          .select('*')
          .eq('activo', true);
          
        if (pedidosError) {
          console.error('Error al cargar pedidos:', pedidosError);
          return;
        }
        
        console.log('Pedidos cargados desde Supabase:', pedidosData?.length);
        
        // Agrupamos los pedidos por impulso_id (para usar en los badges)
        const pedidosAgrupados: Record<string, Pedido[]> = {};
        
        pedidosData.forEach((pedido) => {
          if (!pedidosAgrupados[pedido.impulso_id]) {
            pedidosAgrupados[pedido.impulso_id] = [];
          }
          pedidosAgrupados[pedido.impulso_id].push(pedido);
        });
        
        console.log("Desglose de pedidos por impulso (desde Supabase):");
        Object.keys(pedidosAgrupados).forEach(impulsoId => {
          const pedidosDelImpulso = pedidosAgrupados[impulsoId] || [];
          console.log(`Impulso ID: ${impulsoId}: ${pedidosDelImpulso.length} pedidos`);
        });
        
        setNecesidadesPorImpulso(pedidosAgrupados);
      } catch (err) {
        console.error('Error al procesar pedidos:', err);
      }
    };
    
    fetchNecesidades();
  }, []);

  // Función para guardar cambios en el contenido de la sección
  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('homepage_content')
        .update({
          title: sectionTitle,
          subtitle: sectionText
        })
        .eq('section', 'impulsos');
        
      if (error) {
        console.error('Error al guardar cambios:', error);
        // Si hay error, intentar insertar en vez de actualizar
        const { error: insertError } = await supabase
          .from('homepage_content')
          .insert({
            section: 'impulsos',
            title: sectionTitle,
            subtitle: sectionText,
            content: '',
            image_url: ''
          });
          
        if (insertError) {
          console.error('Error al insertar contenido:', insertError);
        }
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };
  
  // Función para cancelar la edición
  const handleCancelEdit = () => {
    // Recargar los datos originales
    const fetchOriginalContent = async () => {
      const { data } = await supabase
        .from('homepage_content')
        .select('title, subtitle')
        .eq('section', 'impulsos')
        .single();
        
      if (data) {
        setSectionTitle(data.title);
        setSectionText(data.subtitle);
      }
    };
    
    fetchOriginalContent();
    setIsEditing(false);
  };

  // Función para redirigir a la página de administración de impulsos
  const handleAddImpulso = () => {
    window.location.href = '/admin/impulsos/new';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-sage-green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botones solo para móvil - centrados arriba */}
        <div className="flex justify-center mb-6 sm:hidden">
          <div className="flex flex-col items-center space-y-3">
            {isAuthenticated && !isEditing && (
              <EditButton
                onClick={() => setIsEditing(true)}
                label="Editar"
              />
            )}
            {isAdmin && (
              <button
                onClick={handleAddImpulso}
                className="flex items-center space-x-1 bg-sage-green hover:bg-sage-green/80 text-white px-4 py-2 rounded transition"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Impulso</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
          <div className="w-full sm:w-3/4 mb-8 sm:mb-0">
            {isEditing ? (
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="sectionTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    id="sectionTitle"
                    type="text"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sage-green focus:border-sage-green"
                  />
                </div>
                <div>
                  <label htmlFor="sectionText" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="sectionText"
                    value={sectionText}
                    onChange={(e) => setSectionText(e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sage-green focus:border-sage-green"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveContent}
                    disabled={isSaving}
                    className="bg-sage-green hover:bg-sage-green/80 text-white px-4 py-2 rounded font-medium flex items-center"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      'Guardar'
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-heading font-bold text-sage-green">{sectionTitle}</h2>
                <p className="text-gray-600 mt-2">{sectionText}</p>
              </>
            )}
          </div>

          {/* Botones solo para desktop - a la derecha */}
          <div className="hidden sm:flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {isAuthenticated && !isEditing && (
              <EditButton
                onClick={() => setIsEditing(true)}
                label="Editar"
              />
            )}

            {isAdmin && (
              <button
                onClick={handleAddImpulso}
                className="flex items-center space-x-1 bg-sage-green hover:bg-sage-green/80 text-white px-4 py-2 rounded transition"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Impulso</span>
              </button>
            )}
          </div>
        </div>

        {impulsos.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No hay impulsos activos en este momento.</p>
            {isAdmin && (
              <button
                onClick={handleAddImpulso}
                className="flex items-center mx-auto mt-4 space-x-1 bg-sage-green hover:bg-sage-green/80 text-white px-4 py-2 rounded transition"
              >
                <Plus className="w-4 h-4" />
                <span>Crear el primer impulso</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impulsos.map((impulso) => {
              // Obtener badges directamente usando el ID del impulso de Supabase
              const badges = getBadgesByImpulsoId(impulso.id);
              
              return (
                <Link 
                  key={impulso.id} 
                  to={`/impulsos/${impulso.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full relative aspect-[4/5]">
                    {/* Imagen de fondo */}
                    <img 
                      src={impulso.imagen_principal}
                      alt={impulso.nombre_impulso}
                      className="w-full h-4/5 object-cover absolute group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badges de necesidades - Posicionados en la parte superior */}
                    {badges && badges.total > 0 && (
                      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1 z-20">
                        {badges.urgentes > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            {badges.urgentes} Urgente{badges.urgentes > 1 ? 's' : ''}
                          </span>
                        )}
                        
                        {badges.abiertas > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {badges.abiertas} Abierta{badges.abiertas > 1 ? 's' : ''}
                          </span>
                        )}
                        
                        {badges.cubiertas > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border-yellow-200">
                            {badges.cubiertas} Cubierta{badges.cubiertas > 1 ? 's' : ''} temporalmente
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Contenido de texto */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-white">
                      <h3 className="text-xl font-heading font-semibold text-sage-green mb-2">
                        {impulso.nombre_impulso}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {impulso.descripcion_corta.length > 100
                          ? `${impulso.descripcion_corta.substring(0, 100)}...`
                          : impulso.descripcion_corta}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sage-green text-sm font-medium flex items-center gap-1 group-hover:text-accent-purple transition-colors">
                          Ver más <ArrowRight className="w-4 h-4" />
                        </span>
                        
                        {/* Botón de administración de pedidos - Solo visible para administradores */}
                        {isAdmin && (
                          <Link 
                            to={`/admin/pedidos-redirect/${impulso.id}`}
                            onClick={(e) => {
                              e.stopPropagation(); // Evitar propagación del click
                            }}
                            className="bg-accent-purple text-white text-xs px-2 py-1 rounded hover:bg-accent-purple/80 transition-colors cursor-pointer"
                          >
                            Gestionar pedidos
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImpulsosGrid;