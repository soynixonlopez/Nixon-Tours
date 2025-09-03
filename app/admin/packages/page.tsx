'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase, Package } from '@/lib/supabase'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Package as PackageIcon,
  DollarSign,
  Users,
  Clock,
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPackagesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    max_capacity: '',
    image_url: '',
    is_active: true
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    fetchPackages()
  }, [user, router])

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPackages(data || [])
    } catch (error) {
      console.error('Error fetching packages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: '',
      price: '',
      max_capacity: '',
      image_url: '',
      is_active: true
    })
    setEditingPackage(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingPackage) {
        // Actualizar paquete existente
        const { error } = await supabase
          .from('packages')
          .update({
            name: formData.name,
            description: formData.description,
            duration: formData.duration,
            price: parseFloat(formData.price),
            max_capacity: parseInt(formData.max_capacity),
            image_url: formData.image_url,
            is_active: formData.is_active
          })
          .eq('id', editingPackage.id)

        if (error) throw error
      } else {
        // Crear nuevo paquete
        const { error } = await supabase
          .from('packages')
          .insert([{
            name: formData.name,
            description: formData.description,
            duration: formData.duration,
            price: parseFloat(formData.price),
            max_capacity: parseInt(formData.max_capacity),
            image_url: formData.image_url,
            is_active: formData.is_active
          }])

        if (error) throw error
      }

      resetForm()
      fetchPackages()
    } catch (error) {
      console.error('Error saving package:', error)
    }
  }

  const editPackage = (pkg: Package) => {
    setEditingPackage(pkg)
    setFormData({
      name: pkg.name,
      description: pkg.description,
      duration: pkg.duration,
      price: pkg.price.toString(),
      max_capacity: pkg.max_capacity.toString(),
      image_url: pkg.image_url,
      is_active: pkg.is_active
    })
    setShowForm(true)
  }

  const deletePackage = async (packageId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este paquete?')) return

    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', packageId)

      if (error) throw error
      fetchPackages()
    } catch (error) {
      console.error('Error deleting package:', error)
    }
  }

  const togglePackageStatus = async (packageId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update({ is_active: !currentStatus })
        .eq('id', packageId)

      if (error) throw error
      fetchPackages()
    } catch (error) {
      console.error('Error updating package status:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando paquetes...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Paquetes</h1>
              <p className="text-gray-600">Administra los paquetes turísticos de Nixon Tours</p>
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
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Nuevo Paquete
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
                {editingPackage ? 'Editar Paquete' : 'Nuevo Paquete'}
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
                    Nombre del Paquete
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Pasadía a Isla Perro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: 1 día, 2 días"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio por Persona
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="85.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidad Máxima
                  </label>
                  <input
                    type="number"
                    name="max_capacity"
                    value={formData.max_capacity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la Imagen
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe detalladamente el paquete turístico..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Paquete activo</span>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4 inline mr-2" />
                  {editingPackage ? 'Actualizar' : 'Crear'} Paquete
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Packages List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Paquetes Disponibles</h2>
          </div>
          
          {packages.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <PackageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay paquetes aún</h3>
              <p className="text-gray-600 mb-6">Crea tu primer paquete turístico para empezar</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Crear Primer Paquete
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
                      Duración
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacidad
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
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={pkg.image_url}
                              alt={pkg.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {pkg.name}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {pkg.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {pkg.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                          {pkg.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          {pkg.max_capacity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => togglePackageStatus(pkg.id, pkg.is_active)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                            pkg.is_active
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {pkg.is_active ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editPackage(pkg)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deletePackage(pkg.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
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
    </div>
  )
}
