import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
  
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/adminsol');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/adminsol" />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validar que los campos estén completos
    if (!newPassword || !confirmPassword || !email) {
      setMessage({
        text: 'Todos los campos son obligatorios',
        type: 'error'
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setMessage({
        text: 'Las contraseñas no coinciden',
        type: 'error'
      });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: 'El formato del correo electrónico no es válido',
        type: 'error'
      });
      return;
    }

    // Aquí se guardaría la nueva contraseña y el email (en una aplicación real se usaría un backend)
    // Por ahora, simulamos el guardado actualizando las credenciales en localStorage
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPasswordUpdate', newPassword);
    
    // Actualizamos las credenciales en el navegador (esto es solo para demostración)
    // En una aplicación real, esto sería manejado por un backend seguro
    setIsEditing(false);
    setNewPassword('');
    setConfirmPassword('');
    setMessage({
      text: 'Contraseña actualizada correctamente',
      type: 'success'
    });
  };

  const handleForgotPassword = () => {
    if (!email) {
      setMessage({
        text: 'Debes ingresar tu correo electrónico para recuperar la contraseña',
        type: 'error'
      });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: 'El formato del correo electrónico no es válido',
        type: 'error'
      });
      return;
    }

    // Simulación de envío de correo de recuperación
    setMessage({
      text: `Se ha enviado un correo de recuperación a ${email}`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-warm-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administrador</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Configuración de Contraseña</h2>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}
          </div>

          {message.text && (
            <div 
              className={`p-3 rounded mb-4 ${
                message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="correo@ejemplo.com"
              />
            </div>

            {isEditing ? (
              <>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNewPassword('');
                      setConfirmPassword('');
                      setMessage({ text: '', type: '' });
                    }}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleEdit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Cambiar Contraseña
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Olvidé mi contraseña
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
