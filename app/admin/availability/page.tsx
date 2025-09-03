'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase, Package, Availability } from '@/lib/supabase'
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Clock,
  Package as PackageIcon,
  Save,
  X,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AdminAvailabilityPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>([])
  const [availability, setAvailability] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAvailability, setEditingAvailability] = useState<Availability | null>(null)
  const [formData, setFormData] = useState({
    package_id: '',
    date: '',
    available_spots: '',
    total_spots: '',
    is_blocked: false
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    fetchData()
  }, [user, router])

  const fetchData = async () => {
    try {
      // Obtener paquetes
      const { data: packagesData, error: packagesError } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (packagesError) throw packagesError

      // Obtener disponibilidad
      const { data: availabilityData, error: availabilityError } = await supabase
        .from('availability')
        .select('*')
        .order('date')

      if (availabilityError) throw availabilityError

      setPackages(packagesData || [])
      setAvailability(availabilityData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const resetForm = () => {
    setFormData({
      package_id: '',
      date: '',
      available_spots: '',
      total_spots: '',
      is_blocked: false
    })
    setEditingAvailability(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingAvailability) {
        // Actualizar disponibilidad existente
        const { error } = await supabase
          .from('availability')
          .update({
            package_id: formData.package_id,
            date: formData.date,
            available_spots: parseInt(formData.available_spots),
            total_spots: parseInt(formData.total_spots),
            is_blocked: formData.is_blocked
          })
          .eq('id', editingAvailability.id)

        if (error) throw error
      } else {
        // Crear nueva disponibilidad
        const { error } = await supabase
          .from('availability')
          .insert([{
            package_id: formData.package_id,
            date: formData.date,
            available_spots: parseInt(formData.available_spots),
            total_spots: parseInt(formData.total_spots),
            is_blocked: formData.is_blocked
          }])

        if (error) throw error
      }

      resetForm()
      fetchData()
    } catch (error) {
      console.error('Error saving availability:', error)
    }
  }

  const editAvailability = (avail: Availability) => {
    setEditingAvailability(avail)
    setFormData({
      package_id: avail.package_id,
      date: avail.date,
      available_spots: avail.available_spots.toString(),
      total_spots: avail.total_spots.toString(),
      is_blocked: avail.is_blocked
    })
    setShowForm(true)
  }

  const deleteAvailability = async (availabilityId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta disponibilidad?')) return

    try {
      const { error } = await supabase
        .from('availability')
        .delete()
        .eq('id', availabilityId)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Error deleting availability:', error)
    }
  }

  const toggleBlockedStatus = async (availabilityId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('availability')
        .update({ is_blocked: !currentStatus })
        .eq('id', availabilityId)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Error updating blocked status:', error)
    }
  }

  const getPackageName = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId)
    return pkg?.name || 'Paquete no encontrado'
  }

  const getPackageCapacity = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId)
    return pkg?.max_capacity || 0
  }

  const getOccupancyPercentage = (available: number, total: number) => {
    if (total === 0) return 0
    return Math.round(((total - available) / total) * 100)
  }

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 80) return 'text-red-600 bg-red-100'
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100'
    if (percentage >= 40) return 'text-blue-600 bg-blue-100'
    return 'text-green-600 bg-green-100'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando disponibilidad...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Disponibilidad</h1>
              <p className="text-gray-600">Controla fechas y cupos de los paquetes turísticos</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ← Volver al Panel
              </Link>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Nueva Disponibilidad
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingAvailability ? 'Editar Disponibilidad' : 'Nueva Disponibilidad'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paquete
                  </label>
                  <select
                    name="package_id"
                    value={formData.package_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar paquete</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} (Capacidad: {pkg.max_capacity})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cupos Disponibles
                  </label>
                  <input
                    type="number"
                    name="available_spots"
                    value={formData.available_spots}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cupos Totales
                  </label>
                  <input
                    type="number"
                    name="total_spots"
                    value={formData.total_spots}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_blocked"
                      checked={formData.is_blocked}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Bloquear fecha (no disponible para reservas)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4 inline mr-2" />
                  {editingAvailability ? 'Actualizar' : 'Crear'} Disponibilidad
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Availability List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Calendario de Disponibilidad</h2>
          </div>
          
          {availability.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay disponibilidad configurada</h3>
              <p className="text-gray-600 mb-6">Configura las fechas y cupos para tus paquetes turísticos</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Configurar Primera Disponibilidad
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paquete
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cupos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ocupación
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
                  {availability.map((avail) => {
                    const occupancyPercentage = getOccupancyPercentage(avail.available_spots, avail.total_spots)
                    const occupancyColor = getOccupancyColor(occupancyPercentage)
                    
                    return (
                      <tr key={avail.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <PackageIcon className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {getPackageName(avail.package_id)}
                              </div>
                              <div className="text-sm text-gray-500">
                                Capacidad: {getPackageCapacity(avail.package_id)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {new Date(avail.date).toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              {avail.available_spots} / {avail.total_spots}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {avail.available_spots === 0 ? 'Sin cupos' : `${avail.available_spots} disponibles`}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`px-2 py-1 text-xs font-medium rounded-full ${occupancyColor}`}>
                              {occupancyPercentage}% ocupado
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleBlockedStatus(avail.id, avail.is_blocked)}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                              avail.is_blocked
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {avail.is_blocked ? (
                              <>
                                <AlertTriangle className="h-3 w-3 inline mr-1" />
                                Bloqueado
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3 inline mr-1" />
                                Disponible
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => editAvailability(avail)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteAvailability(avail.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
