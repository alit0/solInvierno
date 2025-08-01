import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Loader2 } from 'lucide-react';
import { supabase } from '../config/supabase';
import type { Session } from '@supabase/supabase-js';
import { impulsosData, necesidadesData } from '../data/impulsosData';

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
  // Usamos directamente los datos estáticos de impulsos para mostrar los badges
  const [impulsosEstaticos] = useState(impulsosData);
  const [impulsos, setImpulsos] = useState<Impulso[]>([]);
  const [necesidadesPorImpulso, setNecesidadesPorImpulso] = useState<Record<string, Pedido[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
        }
      } catch (err) {
        console.error('Error al verificar sesión:', err);
        setIsAdmin(false);
      }
    };
    
    checkSession();
    
    // Suscribirse a cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      if (!session) {
        // Si se cerró sesión, actualizar estado inmediatamente
        setIsAdmin(false);
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

  // Cargar impulsos desde Supabase
  useEffect(() => {
    const fetchImpulsos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Consultar impulsos ordenados por created_at descendiente para mostrar nuevos primero
        const { data: impulsosData, error: impulsosError } = await supabase
          .from('impulsos')
          .select('*')
          .eq('activo', true)
          .order('created_at', { ascending: false });
        
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

  // Cargar datos estáticos de necesidades para los badges
  useEffect(() => {
    console.log('Cargando datos estáticos de necesidades en ImpulsosGrid.tsx');
    console.log('Total de impulsos estáticos:', impulsosData.length);
    console.log('Total de necesidades estáticas:', necesidadesData.length);
    
    // Agrupamos las necesidades por impulso_id (para usar en los badges)
    const necesidadesAgrupadas: Record<string, Pedido[]> = {};
    
    necesidadesData.forEach((necesidad) => {
      if (!necesidadesAgrupadas[necesidad.impulso_id]) {
        necesidadesAgrupadas[necesidad.impulso_id] = [];
      }
      necesidadesAgrupadas[necesidad.impulso_id].push(necesidad);
    });
    
    // Log detallado de las necesidades agrupadas
    console.log("Desglose de necesidades por impulso (datos estáticos):");
    Object.keys(necesidadesAgrupadas).forEach(impulsoId => {
      const necesidadesDelImpulso = necesidadesAgrupadas[impulsoId] || [];
      const impulsoRelacionado = impulsosData.find(imp => imp.id === impulsoId);
      console.log(`Impulso ID: ${impulsoId} (${impulsoRelacionado?.nombre_impulso || 'desconocido'}): ${necesidadesDelImpulso.length} necesidades`);
    });
    
    setNecesidadesPorImpulso(necesidadesAgrupadas);
  }, []);
  
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-sage-green">Nuestros Impulsos</h2>
            <p className="text-gray-600 mt-2">Conoce todas nuestras propuestas comunitarias</p>
          </div>

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
              // Para encontrar el impulso estático correspondiente, intentamos buscar por id o por slug
              const impulsoEstatico = impulsosEstaticos.find(
                imp => imp.id === impulso.id || imp.slug === impulso.slug
              );
              
              // Log para depuración
              console.log(`Impulso de Supabase: ${impulso.nombre_impulso} (id: ${impulso.id}, slug: ${impulso.slug})`);
              console.log(`Impulso estático encontrado: ${impulsoEstatico ? 'SÍ' : 'NO'}`);
              
              // Si encontramos el impulso estático, usamos su ID para obtener los badges
              let badges = null;
              if (impulsoEstatico) {
                console.log(`Usando ID estático: ${impulsoEstatico.id} para obtener badges`);
                badges = getBadgesByImpulsoId(impulsoEstatico.id);
              } else {
                // Si no encontramos el impulso estático, intentamos usar directamente el ID del impulso de Supabase
                console.log(`Intentando usar ID de Supabase: ${impulso.id} para obtener badges`);
                badges = getBadgesByImpulsoId(impulso.id);
              }
              
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
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay gradiente */}
                    <div className="absolute bottom-0 left-0 right-0 w-full h-3/4 bg-gradient-to-b from-white/5 via-white via-70% to-white"></div>
                    
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
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