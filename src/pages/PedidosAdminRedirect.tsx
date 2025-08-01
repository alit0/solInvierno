import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../config/supabase';
import { impulsosData } from '../data/impulsosData';

// Este componente actúa como un "puente" para mapear IDs simples a UUIDs de Supabase
const PedidosAdminRedirect: React.FC = () => {
  const { impulsoId } = useParams<{ impulsoId: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectToCorrectPedidos = async () => {
      try {
        if (!impulsoId) {
          throw new Error('No se proporcionó un ID de impulso');
        }

        // Buscar el impulso en los datos estáticos
        const impulsoEstatico = impulsosData.find(imp => imp.id === impulsoId);
        
        if (!impulsoEstatico) {
          throw new Error(`No se encontró el impulso con ID ${impulsoId} en los datos estáticos`);
        }
        
        console.log('Impulso estático encontrado:', impulsoEstatico.nombre_impulso);
        
        // Buscar el impulso en Supabase por nombre o slug
        const { data: impulsoSupabase, error: errorImpulso } = await supabase
          .from('impulsos')
          .select('id, nombre_impulso, slug')
          .or(`nombre_impulso.ilike.${impulsoEstatico.nombre_impulso},slug.eq.${impulsoEstatico.slug}`)
          .limit(1)
          .single();
        
        if (errorImpulso || !impulsoSupabase) {
          console.error('Error al buscar impulso en Supabase:', errorImpulso);
          
          // Si no encontramos coincidencia, intentamos buscar todos los impulsos
          const { data: todosImpulsos, error: errorTodos } = await supabase
            .from('impulsos')
            .select('id, nombre_impulso, slug')
            .limit(10);
            
          console.log('Todos los impulsos disponibles en Supabase:', todosImpulsos);
          
          throw new Error(`No se pudo encontrar un impulso equivalente en la base de datos. 
                          Intente acceder desde la lista de impulsos.`);
        }
        
        console.log('Impulso encontrado en Supabase:', impulsoSupabase);
        
        // Redirigir a la página de pedidos con el UUID correcto
        navigate(`/admin/pedidos/${impulsoSupabase.id}`, { replace: true });
        
      } catch (err: any) {
        console.error('Error en redirección:', err);
        setError(err.message || 'Error al redirigir a la página de pedidos');
      }
    };

    redirectToCorrectPedidos();
  }, [impulsoId, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin')}
            className="bg-sage-green text-white px-4 py-2 rounded-md hover:bg-sage-green/90 transition-colors"
          >
            Volver al Panel de Administración
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de carga mientras se procesa la redirección
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-sage-green mx-auto mb-4" />
        <p className="text-gray-600">Cargando administración de pedidos...</p>
      </div>
    </div>
  );
};

export default PedidosAdminRedirect;
