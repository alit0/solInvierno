import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../config/supabase';

interface Impulso {
  id: string;
  nombre_impulso: string;
  descripcion_corta: string;
  imagen_principal: string;
  slug: string;
  activo: boolean;
  orden_visual: number;
}

interface Pedido {
  id: string;
  impulso_id: string;
  titulo_necesidad: string;
  descripcion_necesidad: string;
  estado_necesidad: string; // 'Urgente', 'Abierta', 'Cubierta temporalmente'
  activo: boolean;
}

const Impulsos = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [impulsos, setImpulsos] = useState<Impulso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pedidosPorImpulso, setPedidosPorImpulso] = useState<Record<string, Pedido[]>>({});
  
  // Función para obtener los badges según las necesidades del impulso
  const getBadgesByImpulsoId = (impulsoId: string) => {
    const pedidos = pedidosPorImpulso[impulsoId] || [];
    
    // Contadores para cada tipo de estado
    let urgentes = 0;
    let abiertas = 0;
    let cubiertas = 0;
    
    pedidos.forEach(pedido => {
      if (pedido.estado_necesidad === 'Urgente') urgentes++;
      else if (pedido.estado_necesidad === 'Abierta') abiertas++;
      else if (pedido.estado_necesidad === 'Cubierta temporalmente') cubiertas++;
    });
    
    return { urgentes, abiertas, cubiertas, total: pedidos.length };
  };

  // Cargar impulsos
  useEffect(() => {
    const fetchImpulsos = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('impulsos')
          .select('*')
          .order('orden_visual', { ascending: true });
          
        if (error) throw error;
        
        setImpulsos(data || []);
      } catch (error: any) {
        console.error('Error al cargar impulsos:', error);
        setError('Error al cargar impulsos: ' + (error.message || 'Desconocido'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchImpulsos();
  }, []);

  // Cargar pedidos
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .eq('activo', true);
          
        if (error) throw error;
        
        // Agrupar pedidos por impulso_id
        const agrupados: Record<string, Pedido[]> = {};
        
        if (data) {
          data.forEach((pedido) => {
            if (!agrupados[pedido.impulso_id]) {
              agrupados[pedido.impulso_id] = [];
            }
            agrupados[pedido.impulso_id].push(pedido);
          });
        }
        
        setPedidosPorImpulso(agrupados);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
      }
    };
    
    fetchPedidos();
  }, []);

  const impulsosFiltrados = filtroActivo === 'todos' 
    ? impulsos 
    : impulsos.filter(impulso => impulso.slug === filtroActivo);

  const nombresImpulsos = impulsos.map(impulso => ({
    slug: impulso.slug,
    nombre: impulso.nombre_impulso
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-sage-green mb-4">
            Error al cargar impulsos
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-green mb-6">
              Nuestros Impulsos
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conoce la esencia de nuestra autogestión: una comunidad de padres activa y colaborativa. 
              Cada familia participa activamente en la construcción de nuestra comunidad educativa, 
              aportando sus talentos y energías para crear un ambiente rico y diverso donde nuestros hijos puedan crecer.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFiltroActivo('todos')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filtroActivo === 'todos'
                  ? 'bg-accent-purple text-white shadow-md'
                  : 'bg-white text-sage-green hover:bg-accent-purple/10 border border-sage-green/20'
              }`}
            >
              Todos los Impulsos
            </button>
            {nombresImpulsos.map((impulso) => (
              <button
                key={impulso.slug}
                onClick={() => setFiltroActivo(impulso.slug)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filtroActivo === impulso.slug
                    ? 'bg-accent-purple text-white shadow-md'
                    : 'bg-white text-sage-green hover:bg-accent-purple/10 border border-sage-green/20'
                }`}
              >
                {impulso.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Impulsos */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impulsosFiltrados.map((impulso) => {
              const badges = getBadgesByImpulsoId(impulso.id);
              
              return (
                <Link 
                  key={impulso.id} 
                  to={`/impulsos/${impulso.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <img 
                        src={impulso.imagen_principal}
                        alt={impulso.nombre_impulso}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      {!impulso.activo && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Inactivo
                        </div>
                      )}
                      
                      {/* Badges de necesidades - Posicionados en la parte superior */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {badges.urgentes > 0 && (
                          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {badges.urgentes} Urgente{badges.urgentes > 1 ? 's' : ''}
                          </div>
                        )}
                        {badges.abiertas > 0 && (
                          <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                            {badges.abiertas} Abierta{badges.abiertas > 1 ? 's' : ''}
                          </div>
                        )}
                        {badges.cubiertas > 0 && (
                          <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                            {badges.cubiertas} Cubierta{badges.cubiertas > 1 ? 's' : ''} temporalmente
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-sage-green mb-3">
                        {impulso.nombre_impulso}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        {impulso.descripcion_corta}
                      </p>
                      <div className="flex items-center text-accent-purple hover:text-accent-purple/80 font-medium transition-colors group">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {impulsosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No se encontraron impulsos para el filtro seleccionado.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="py-16 bg-blue-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-sage-green mb-6">
              ¿Te gustaría formar parte?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Cada impulso necesita la colaboración de nuestra comunidad para seguir creciendo. 
              Tu participación, sin importar el tiempo que puedas dedicar, es valiosa y necesaria.
            </p>
            <Link 
              to="/contacto"
              className="inline-block bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contactanos para Participar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impulsos;