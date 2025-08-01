import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { ArrowLeft, AlertCircle, Plus, Edit, Trash2, X, Save } from 'lucide-react';

interface Impulso {
  id: string;
  nombre_impulso: string;
}

interface Pedido {
  id: string;
  impulso_id: string;
  titulo: string;
  descripcion: string;
  urgencia: 'Urgente' | 'Abierta' | 'Cubierta temporalmente';
  tiempo_compromiso: string;
  activo: boolean;
  created_at?: string;
}

const defaultPedido = {
  id: '',
  impulso_id: '',
  titulo: '',
  descripcion: '',
  urgencia: 'Abierta' as const,
  tiempo_compromiso: '',
  activo: true,
  created_at: ''
};

const AdminPedidos = () => {
  const { impulsoId } = useParams();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [impulso, setImpulso] = useState<Impulso | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState<Pedido>(defaultPedido);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [deletingPedidoId, setDeletingPedidoId] = useState<string | null>(null);

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

  // Cargar datos del impulso y sus pedidos asociados
  useEffect(() => {
    const fetchData = async () => {
      if (!impulsoId) return;
      
      try {
        // Obtener datos del impulso
        const { data: impulsoData, error: impulsoError } = await supabase
          .from('impulsos')
          .select('id, nombre_impulso')
          .eq('id', impulsoId)
          .single();
          
        if (impulsoError) throw impulsoError;
        setImpulso(impulsoData);
        
        // Obtener pedidos asociados al impulso
        const { data: pedidosData, error: pedidosError } = await supabase
          .from('pedidos')
          .select('*')
          .eq('impulso_id', impulsoId)
          .order('urgencia', { ascending: false })
          .order('created_at', { ascending: false });
          
        if (pedidosError) throw pedidosError;
        setPedidos(pedidosData || []);
      } catch (error: any) {
        console.error('Error al cargar datos:', error);
        setMessage({
          text: 'Error al cargar datos: ' + (error.message || 'Desconocido'),
          type: 'error'
        });
      }
    };
    
    if (isAuthenticated && isAdmin) {
      fetchData();
    }
  }, [isAuthenticated, isAdmin, impulsoId]);

  const openModal = (pedido?: Pedido) => {
    if (pedido) {
      setCurrentPedido(pedido);
      setIsEditing(true);
    } else {
      setCurrentPedido({ ...defaultPedido, impulso_id: impulsoId || '' });
      setIsEditing(false);
    }
    setValidationErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPedido({ ...defaultPedido, impulso_id: impulsoId || '' });
    setValidationErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // TypeScript necesita conocer que es un checkbox
      const checkbox = e.target as HTMLInputElement;
      setCurrentPedido({
        ...currentPedido,
        [name]: checkbox.checked
      });
    } else {
      setCurrentPedido({
        ...currentPedido,
        [name]: value
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!currentPedido.titulo.trim()) {
      errors.titulo = 'El título es obligatorio';
    }
    
    if (!currentPedido.descripcion.trim()) {
      errors.descripcion = 'La descripción es obligatoria';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isEditing) {
        // Actualizar pedido existente
        const { error } = await supabase
          .from('pedidos')
          .update({
            titulo: currentPedido.titulo,
            descripcion: currentPedido.descripcion,
            urgencia: currentPedido.urgencia,
            tiempo_compromiso: currentPedido.tiempo_compromiso,
            activo: currentPedido.activo
          })
          .eq('id', currentPedido.id);
          
        if (error) throw error;
        
        // Actualizar estado local
        setPedidos(pedidos.map(pedido => 
          pedido.id === currentPedido.id ? currentPedido : pedido
        ));
        
        setMessage({
          text: 'Pedido actualizado correctamente',
          type: 'success'
        });
      } else {
        // Crear nuevo pedido
        const { data, error } = await supabase
          .from('pedidos')
          .insert([{
            impulso_id: impulsoId,
            titulo: currentPedido.titulo,
            descripcion: currentPedido.descripcion,
            urgencia: currentPedido.urgencia,
            tiempo_compromiso: currentPedido.tiempo_compromiso,
            activo: currentPedido.activo
          }])
          .select();
          
        if (error) throw error;
        
        // Actualizar estado local
        setPedidos([...(data || []), ...pedidos]);
        
        setMessage({
          text: 'Pedido creado correctamente',
          type: 'success'
        });
      }
      
      closeModal();
    } catch (error: any) {
      console.error('Error al guardar pedido:', error);
      setMessage({
        text: 'Error al guardar pedido: ' + (error.message || 'Desconocido'),
        type: 'error'
      });
    }
  };

  const handleDelete = async (pedidoId: string) => {
    // Confirmar eliminación
    if (deletingPedidoId !== pedidoId) {
      setDeletingPedidoId(pedidoId);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', pedidoId);
        
      if (error) throw error;
      
      // Actualizar estado local
      setPedidos(pedidos.filter(pedido => pedido.id !== pedidoId));
      
      setMessage({
        text: 'Pedido eliminado correctamente',
        type: 'success'
      });
    } catch (error: any) {
      console.error('Error al eliminar pedido:', error);
      setMessage({
        text: 'Error al eliminar pedido: ' + (error.message || 'Desconocido'),
        type: 'error'
      });
    } finally {
      setDeletingPedidoId(null);
    }
  };

  // Color de fondo según urgencia
  const getUrgencyColor = (urgencia: string): string => {
    switch (urgencia) {
      case 'Urgente':
        return 'bg-red-100 text-red-800';
      case 'Abierta':
        return 'bg-green-100 text-green-800';
      case 'Cubierta temporalmente':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <Link to="/admin/impulsos" className="flex items-center text-sage-green hover:text-sage-green/80 mr-4">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Volver a Impulsos</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex-grow">
            {impulso ? `Pedidos de: ${impulso.nombre_impulso}` : 'Cargando...'}
          </h1>
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 flex items-center"
          >
            <Plus className="w-5 h-5 mr-1" />
            <span>Nuevo Pedido</span>
          </button>
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

        {pedidos.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">No hay pedidos registrados para este impulso.</p>
            <button 
              onClick={() => openModal()}
              className="mt-4 inline-flex items-center px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90"
            >
              <Plus className="w-5 h-5 mr-1" />
              <span>Crear el primer pedido</span>
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgencia
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{pedido.titulo}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{pedido.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(pedido.urgencia)}`}>
                        {pedido.urgencia}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pedido.tiempo_compromiso || 'No especificado'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pedido.activo 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {pedido.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openModal(pedido)}
                          className="text-amber-600 hover:text-amber-900"
                          title="Editar pedido"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(pedido.id)}
                          className={`${
                            deletingPedidoId === pedido.id
                              ? 'text-red-700'
                              : 'text-red-500 hover:text-red-700'
                          }`}
                          title={deletingPedidoId === pedido.id ? 'Click para confirmar' : 'Eliminar pedido'}
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

      {/* Modal para crear/editar pedido */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-medium text-gray-900">
                {isEditing ? 'Editar Pedido' : 'Nuevo Pedido'}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={currentPedido.titulo}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border ${
                      validationErrors.titulo ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green`}
                  />
                  {validationErrors.titulo && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.titulo}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={3}
                    value={currentPedido.descripcion}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border ${
                      validationErrors.descripcion ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green`}
                  />
                  {validationErrors.descripcion && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.descripcion}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="urgencia" className="block text-sm font-medium text-gray-700 mb-1">
                    Urgencia
                  </label>
                  <select
                    id="urgencia"
                    name="urgencia"
                    value={currentPedido.urgencia}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green"
                  >
                    <option value="Urgente">Urgente</option>
                    <option value="Abierta">Abierta</option>
                    <option value="Cubierta temporalmente">Cubierta temporalmente</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tiempo_compromiso" className="block text-sm font-medium text-gray-700 mb-1">
                    Tiempo de Compromiso
                  </label>
                  <input
                    type="text"
                    id="tiempo_compromiso"
                    name="tiempo_compromiso"
                    value={currentPedido.tiempo_compromiso}
                    onChange={handleInputChange}
                    placeholder="Ej: 2 horas semanales"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="activo"
                    name="activo"
                    checked={currentPedido.activo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-sage-green focus:ring-sage-green border-gray-300 rounded"
                  />
                  <label htmlFor="activo" className="ml-2 block text-sm font-medium text-gray-700">
                    Activo (visible en la página)
                  </label>
                </div>
              </div>
              
              <div className="px-5 py-4 border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-green"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-green flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPedidos;
