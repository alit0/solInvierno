import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { ArrowLeft, AlertCircle, Save, Upload } from 'lucide-react';

interface ImpulsoFormData {
  nombre_impulso: string;
  descripcion_corta: string;
  imagen_principal: string;
  dias_horarios: string;
  direccion: string;
  whatsapp_contacto: string;
  orden_visual: number;
  activo: boolean;
  slug: string;
}

const defaultImpulso: ImpulsoFormData = {
  nombre_impulso: '',
  descripcion_corta: '',
  imagen_principal: '',
  dias_horarios: '',
  direccion: '',
  whatsapp_contacto: '',
  orden_visual: 0,
  activo: true,
  slug: ''
};

const AdminImpulsoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id) && id !== 'new' && id !== 'nuevo';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [impulso, setImpulso] = useState<ImpulsoFormData>(defaultImpulso);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof ImpulsoFormData, string>>>({});

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

  // Cargar impulso si estamos editando
  useEffect(() => {
    const fetchImpulso = async () => {
      if (isEditing && id) {
        try {
          const { data, error } = await supabase
            .from('impulsos')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (data) {
            setImpulso(data);
            setImagePreview(data.imagen_principal);
          }
        } catch (error: any) {
          console.error('Error al cargar impulso:', error);
          setMessage({
            text: 'Error al cargar impulso: ' + (error.message || 'Desconocido'),
            type: 'error'
          });
        }
      } else {
        // Si estamos creando, asegurarse de tener el impulso por defecto
        setImpulso(defaultImpulso);
        setImagePreview(null);
      }
    };
    
    if (isAuthenticated && isAdmin) {
      fetchImpulso();
    }
  }, [isAuthenticated, isAdmin, id, isEditing]);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ImpulsoFormData, string>> = {};
    
    if (!impulso.nombre_impulso.trim()) {
      errors.nombre_impulso = 'El nombre del impulso es obligatorio';
    }
    
    if (!impulso.descripcion_corta.trim()) {
      errors.descripcion_corta = 'La descripción corta es obligatoria';
    }
    
    if (!impulso.imagen_principal.trim() && !imageFile) {
      errors.imagen_principal = 'La imagen principal es obligatoria';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // TypeScript necesita conocer que es un checkbox
      const checkbox = e.target as HTMLInputElement;
      setImpulso({
        ...impulso,
        [name]: checkbox.checked
      });
    } else if (name === 'nombre_impulso') {
      // Generar slug automáticamente cuando se cambia el nombre
      const newSlug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
        
      setImpulso({
        ...impulso,
        [name]: value,
        slug: newSlug
      });
    } else if (name === 'orden_visual') {
      // Convertir a número
      setImpulso({
        ...impulso,
        [name]: parseInt(value) || 0
      });
    } else {
      setImpulso({
        ...impulso,
        [name]: value
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setImageFile(file);
      
      // Crear URL para previsualización
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      
      // Limpiar cualquier error de validación existente
      setValidationErrors({
        ...validationErrors,
        imagen_principal: undefined
      });
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return impulso.imagen_principal;
    
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `impulsos/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    try {
      const { error: uploadError, data } = await supabase.storage
        .from('public')
        .upload(filePath, imageFile);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Obtener la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
        
      return publicUrl;
    } catch (error: any) {
      console.error('Error al subir imagen:', error);
      throw new Error('Error al subir la imagen: ' + (error.message || 'Desconocido'));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({
        text: 'Por favor, completa todos los campos obligatorios',
        type: 'error'
      });
      return;
    }
    
    try {
      setSaveLoading(true);
      
      // Subir imagen si se cambió
      let imageUrl = impulso.imagen_principal;
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      
      // Preparar datos para guardar
      const impulsoData = {
        ...impulso,
        imagen_principal: imageUrl
      };
      
      // Guardar impulso (insertar o actualizar)
      if (isEditing && id) {
        const { error } = await supabase
          .from('impulsos')
          .update(impulsoData)
          .eq('id', id);
          
        if (error) throw error;
        
        setMessage({
          text: 'Impulso actualizado correctamente',
          type: 'success'
        });
      } else {
        const { error } = await supabase
          .from('impulsos')
          .insert([impulsoData]);
          
        if (error) throw error;
        
        setMessage({
          text: 'Impulso creado correctamente',
          type: 'success'
        });
      }
      
      // Redireccionar después de un breve delay
      setTimeout(() => {
        navigate('/admin/impulsos');
      }, 1500);
    } catch (error: any) {
      console.error('Error al guardar impulso:', error);
      setMessage({
        text: 'Error al guardar impulso: ' + (error.message || 'Desconocido'),
        type: 'error'
      });
    } finally {
      setSaveLoading(false);
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/admin/impulsos" className="flex items-center text-sage-green hover:text-sage-green/80 mr-4">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Volver a Impulsos</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex-grow">
            {isEditing ? 'Editar Impulso' : 'Nuevo Impulso'}
          </h1>
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

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="nombre_impulso" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Impulso *
                </label>
                <input
                  type="text"
                  id="nombre_impulso"
                  name="nombre_impulso"
                  value={impulso.nombre_impulso}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border ${
                    validationErrors.nombre_impulso ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green`}
                />
                {validationErrors.nombre_impulso && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.nombre_impulso}</p>
                )}
              </div>

              <div className="col-span-2">
                <label htmlFor="descripcion_corta" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción Corta *
                </label>
                <textarea
                  id="descripcion_corta"
                  name="descripcion_corta"
                  rows={3}
                  value={impulso.descripcion_corta}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border ${
                    validationErrors.descripcion_corta ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green`}
                />
                {validationErrors.descripcion_corta && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.descripcion_corta}</p>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="dias_horarios" className="block text-sm font-medium text-gray-700 mb-1">
                  Días y Horarios
                </label>
                <input
                  type="text"
                  id="dias_horarios"
                  name="dias_horarios"
                  value={impulso.dias_horarios}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={impulso.direccion}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="whatsapp_contacto" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp de Contacto
                </label>
                <input
                  type="text"
                  id="whatsapp_contacto"
                  name="whatsapp_contacto"
                  value={impulso.whatsapp_contacto}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="orden_visual" className="block text-sm font-medium text-gray-700 mb-1">
                  Orden Visual
                </label>
                <input
                  type="number"
                  id="orden_visual"
                  name="orden_visual"
                  value={impulso.orden_visual}
                  onChange={handleInputChange}
                  min="0"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green"
                />
                <p className="mt-1 text-sm text-gray-500">Un número menor aparecerá antes en la lista</p>
              </div>

              <div className="col-span-2">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL amigable)
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={impulso.slug}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-green focus:border-sage-green"
                  placeholder="Se genera automáticamente"
                />
                <p className="mt-1 text-sm text-gray-500">Se genera automáticamente a partir del nombre</p>
              </div>

              <div className="col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="activo"
                    name="activo"
                    checked={impulso.activo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-sage-green focus:ring-sage-green border-gray-300 rounded"
                  />
                  <label htmlFor="activo" className="ml-2 block text-sm font-medium text-gray-700">
                    Activo (visible en la página)
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen Principal *
                </label>
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex-1">
                    <label 
                      htmlFor="imagen_principal" 
                      className={`flex justify-center items-center w-full h-32 px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                        validationErrors.imagen_principal ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-sage-green">Haz clic para subir</span> o arrastra y suelta
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                      </div>
                      <input 
                        id="imagen_principal" 
                        name="imagen_principal" 
                        type="file" 
                        className="hidden" 
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    {validationErrors.imagen_principal && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.imagen_principal}</p>
                    )}
                  </div>
                  
                  {imagePreview && (
                    <div className="w-full md:w-1/3">
                      <div className="border rounded-lg overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Vista previa" 
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                to="/admin/impulsos"
                className="mr-3 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-green"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saveLoading}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-green hover:bg-sage-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-green"
              >
                {saveLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {isEditing ? 'Actualizar Impulso' : 'Crear Impulso'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminImpulsoForm;
