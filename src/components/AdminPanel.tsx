import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import { impulsosData, necesidadesData, getImpulsos, getNecesidadesByImpulso } from '../data/impulsosData';
import type { Impulso, Necesidad } from '../data/impulsosData';

interface AdminPanelProps {
  userRole: 'admin' | 'impulso_admin';
  impulsoAsignado?: string; // ID del impulso asignado para administradores de impulso
}

const AdminPanel: React.FC<AdminPanelProps> = ({ userRole, impulsoAsignado }) => {
  const [activeTab, setActiveTab] = useState<'impulsos' | 'necesidades'>('impulsos');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Estados para formularios
  const [impulsoForm, setImpulsoForm] = useState<Partial<Impulso>>({});
  const [necesidadForm, setNecesidadForm] = useState<Partial<Necesidad>>({});

  const impulsos = getImpulsos();
  const necesidades = impulsoAsignado 
    ? getNecesidadesByImpulso(impulsoAsignado)
    : necesidadesData.filter(n => n.activo);

  const handleSaveImpulso = () => {
    // En una implementación real, esto se conectaría a la base de datos
    console.log('Guardando impulso:', impulsoForm);
    setShowForm(false);
    setEditingItem(null);
    setImpulsoForm({});
  };

  const handleSaveNecesidad = () => {
    // En una implementación real, esto se conectaría a la base de datos
    console.log('Guardando necesidad:', necesidadForm);
    setShowForm(false);
    setEditingItem(null);
    setNecesidadForm({});
  };

  const handleDeleteItem = (id: string, type: 'impulso' | 'necesidad') => {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      console.log(`Eliminando ${type}:`, id);
      // En una implementación real, esto se conectaría a la base de datos
    }
  };

  const toggleItemStatus = (id: string, type: 'impulso' | 'necesidad') => {
    console.log(`Cambiando estado de ${type}:`, id);
    // En una implementación real, esto cambiaría el estado activo/inactivo
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-heading font-bold text-sage-green">
              Panel de Administración - {userRole === 'admin' ? 'Administrador General' : 'Administrador de Impulso'}
            </h1>
            
            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {userRole === 'admin' && (
                  <button
                    onClick={() => setActiveTab('impulsos')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'impulsos'
                        ? 'border-accent-purple text-accent-purple'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Gestionar Impulsos
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('necesidades')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'necesidades'
                      ? 'border-accent-purple text-accent-purple'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {userRole === 'admin' ? 'Ver Necesidades' : 'Gestionar Necesidades'}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gestión de Impulsos (solo admin general) */}
        {activeTab === 'impulsos' && userRole === 'admin' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-semibold text-sage-green">
                Impulsos Registrados
              </h2>
              <button
                onClick={() => setShowForm(true)}
                className="bg-accent-purple hover:bg-accent-purple/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Impulso
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impulso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {impulsos.map((impulso) => (
                    <tr key={impulso.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={impulso.imagen_principal} 
                            alt={impulso.nombre_impulso}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {impulso.nombre_impulso}
                            </div>
                            <div className="text-sm text-gray-500">
                              {impulso.whatsapp_contacto}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {impulso.descripcion_corta}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          impulso.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {impulso.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleItemStatus(impulso.id, 'impulso')}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            {impulso.activo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(impulso.id);
                              setImpulsoForm(impulso);
                              setShowForm(true);
                            }}
                            className="text-accent-purple hover:text-accent-purple/80"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(impulso.id, 'impulso')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gestión de Necesidades */}
        {activeTab === 'necesidades' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-semibold text-sage-green">
                {userRole === 'admin' ? 'Todas las Necesidades' : 'Mis Necesidades de Colaboración'}
              </h2>
              {(userRole === 'impulso_admin' || userRole === 'admin') && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-accent-purple hover:bg-accent-purple/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Necesidad
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {necesidades.map((necesidad) => (
                <div key={necesidad.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-heading font-semibold text-sage-green">
                      {necesidad.titulo_necesidad}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      necesidad.estado_necesidad === 'Urgente' 
                        ? 'bg-red-100 text-red-800'
                        : necesidad.estado_necesidad === 'Cubierta temporalmente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {necesidad.estado_necesidad}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {necesidad.descripcion_necesidad}
                  </p>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Tiempo: {necesidad.tiempo_compromiso} | Días: {necesidad.dias_compromiso}
                  </div>
                  
                  {(userRole === 'impulso_admin' || userRole === 'admin') && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleItemStatus(necesidad.id, 'necesidad')}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {necesidad.activo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingItem(necesidad.id);
                          setNecesidadForm(necesidad);
                          setShowForm(true);
                        }}
                        className="text-accent-purple hover:text-accent-purple/80"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(necesidad.id, 'necesidad')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-bold text-sage-green">
                  {editingItem ? 'Editar' : 'Crear'} {activeTab === 'impulsos' ? 'Impulso' : 'Necesidad'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    setImpulsoForm({});
                    setNecesidadForm({});
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {activeTab === 'impulsos' ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveImpulso(); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Impulso *
                    </label>
                    <input
                      type="text"
                      required
                      value={impulsoForm.nombre_impulso || ''}
                      onChange={(e) => setImpulsoForm({...impulsoForm, nombre_impulso: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción Corta *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={impulsoForm.descripcion_corta || ''}
                      onChange={(e) => setImpulsoForm({...impulsoForm, descripcion_corta: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp de Contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+5491123456789"
                      value={impulsoForm.whatsapp_contacto || ''}
                      onChange={(e) => setImpulsoForm({...impulsoForm, whatsapp_contacto: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Días y Horarios *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej: Viernes de 14:00 a 17:00 hs"
                      value={impulsoForm.dias_horarios || ''}
                      onChange={(e) => setImpulsoForm({...impulsoForm, dias_horarios: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej: Aula 3 - Escuela Sol de Invierno, Mercedes"
                      value={impulsoForm.direccion || ''}
                      onChange={(e) => setImpulsoForm({...impulsoForm, direccion: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveNecesidad(); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título de la Necesidad *
                    </label>
                    <input
                      type="text"
                      required
                      value={necesidadForm.titulo_necesidad || ''}
                      onChange={(e) => setNecesidadForm({...necesidadForm, titulo_necesidad: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={necesidadForm.descripcion_necesidad || ''}
                      onChange={(e) => setNecesidadForm({...necesidadForm, descripcion_necesidad: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiempo de Compromiso *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej: 2 horas, 4 horas"
                      value={necesidadForm.tiempo_compromiso || ''}
                      onChange={(e) => setNecesidadForm({...necesidadForm, tiempo_compromiso: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Días de Compromiso *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej: Viernes, Sábados, Una vez al mes"
                      value={necesidadForm.dias_compromiso || ''}
                      onChange={(e) => setNecesidadForm({...necesidadForm, dias_compromiso: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado *
                    </label>
                    <select
                      required
                      value={necesidadForm.estado_necesidad || 'Abierta'}
                      onChange={(e) => setNecesidadForm({...necesidadForm, estado_necesidad: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                    >
                      <option value="Abierta">Abierta</option>
                      <option value="Urgente">Urgente</option>
                      <option value="Cubierta temporalmente">Cubierta temporalmente</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;