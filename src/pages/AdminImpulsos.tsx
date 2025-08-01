import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { Plus, Edit, Trash2, ArrowLeft, AlertCircle, List } from 'lucide-react';

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

const AdminImpulsos = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [impulsos, setImpulsos] = useState<Impulso[]>([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [deletingImpulsoId, setDeletingImpulsoId] = useState<string | null>(null);

  // Verificar autenticación y rol de administrador
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar sesión
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsAuthenticated(true);
          
          // Verificar rol de administrador
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Error al verificar rol:', profileError);
            setIsAdmin(false);
          } else {
            setIsAdmin(profileData?.role === 'admin');
          }
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Cargar lista de impulsos
  useEffect(() => {
    const fetchImpulsos = async () => {
      try {
        const { data, error } = await supabase
          .from('impulsos')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setImpulsos(data || []);
      } catch (error: any) {
        console.error('Error al cargar impulsos:', error);
        setMessage({
          text: 'Error al cargar impulsos: ' + (error.message || 'Desconocido'),
          type: 'error'
        });
      }
    };
    
    if (isAuthenticated && isAdmin) {
      fetchImpulsos();
    }
  }, [isAuthenticated, isAdmin]);

  const handleDelete = async (impulsoId: string) => {
    // Confirmar eliminación
    if (deletingImpulsoId !== impulsoId) {
      setDeletingImpulsoId(impulsoId);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('impulsos')
        .delete()
        .eq('id', impulsoId);
        
      if (error) {
        throw error;
      }
      
      // Actualizar la lista después de eliminar
      setImpulsos(impulsos.filter(impulso => impulso.id !== impulsoId));
      
      setMessage({
        text: 'Impulso eliminado correctamente',
        type: 'success'
      });
    } catch (error: any) {
      console.error('Error al eliminar impulso:', error);
      setMessage({
        text: 'Error al eliminar impulso: ' + (error.message || 'Desconocido'),
        type: 'error'
      });
    } finally {
      setDeletingImpulsoId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/adminsol" />;
  }

  return (
    <div className="min-h-screen bg-warm-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/admin" className="flex items-center text-sage-green hover:text-sage-green/80 mr-4">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Volver al Panel</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex-grow">Administrar Impulsos</h1>
          <Link 
            to="/admin/impulsos/nuevo" 
            className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 flex items-center"
          >
            <Plus className="w-5 h-5 mr-1" />
            <span>Nuevo Impulso</span>
          </Link>
        </div>

        {message.text && (
          <div 
            className={`p-4 rounded-md mb-6 flex items-center ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{message.text}</span>
            <button 
              className="ml-auto text-gray-500 hover:text-gray-700"
              onClick={() => setMessage({ text: '', type: '' })}
            >
              &times;
            </button>
          </div>
        )}

        {impulsos.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">No hay impulsos registrados.</p>
            <Link 
              to="/admin/impulsos/new" 
              className="mt-4 inline-flex items-center px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90"
            >
              <Plus className="w-5 h-5 mr-1" />
              <span>Crear el primer impulso</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orden
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creado
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {impulsos.map((impulso) => (
                  <tr key={impulso.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-md object-cover" 
                          src={impulso.imagen_principal} 
                          alt={impulso.nombre_impulso} 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{impulso.nombre_impulso}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{impulso.descripcion_corta}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        impulso.activo 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {impulso.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {impulso.orden_visual}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {impulso.created_at 
                        ? new Date(impulso.created_at).toLocaleDateString() 
                        : 'Desconocido'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/pedidos/${impulso.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Administrar pedidos"
                        >
                          <List className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/admin/impulsos/${impulso.id}`}
                          className="text-amber-600 hover:text-amber-900"
                          title="Editar impulso"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(impulso.id)}
                          className={`${
                            deletingImpulsoId === impulso.id
                              ? 'text-red-700'
                              : 'text-red-500 hover:text-red-700'
                          }`}
                          title={deletingImpulsoId === impulso.id ? 'Click para confirmar' : 'Eliminar impulso'}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminImpulsos;
