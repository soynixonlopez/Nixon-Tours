'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase, Reservation, Package, User } from '@/lib/supabase'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Package as PackageIcon,
  Mail,
  Phone,
  MapPin,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalReservations: 0,
    confirmedReservations: 0,
    pendingReservations: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalPackages: 0
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    fetchAdminData()
  }, [user, router])

  const fetchAdminData = async () => {
    try {
      // Obtener todas las reservas
      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

      if (reservationsError) throw reservationsError

      // Obtener todos los paquetes
      const { data: packagesData, error: packagesError } = await supabase
        .from('packages')
        .select('*')

      if (packagesError) throw packagesError

      // Obtener todos los usuarios
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')

      if (usersError) throw usersError

      setReservations(reservationsData || [])
      setPackages(packagesData || [])
      setUsers(usersData || [])

      // Calcular estadísticas
      const totalReservations = reservationsData?.length || 0
      const confirmedReservations = reservationsData?.filter(r => r.status === 'confirmed').length || 0
      const pendingReservations = reservationsData?.filter(r => r.status === 'pending').length || 0
      const totalRevenue = reservationsData?.reduce((sum, r) => sum + r.total_price, 0) || 0

      setStats({
        totalReservations,
        confirmedReservations,
        pendingReservations,
        totalRevenue,
        totalUsers: usersData?.length || 0,
        totalPackages: packagesData?.length || 0
      })

    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPackageName = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId)
    return pkg?.name || 'Paquete no encontrado'
  }

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId)
    return user?.full_name || 'Usuario no encontrado'
  }

  const getUserEmail = (userId: string) => {
    const user = users.find(u => u.id === userId)
    return user?.email || 'Email no encontrado'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const updateReservationStatus = async (reservationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', reservationId)

      if (error) throw error

      // Actualizar la lista local
      setReservations(prev => 
        prev.map(r => 
          r.id === reservationId ? { ...r, status: newStatus } : r
        )
      )

      // Recalcular estadísticas
      fetchAdminData()

    } catch (error) {
      console.error('Error updating reservation status:', error)
    }
  }

  const updatePaymentStatus = async (reservationId: string, newPaymentStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ payment_status: newPaymentStatus })
        .eq('id', reservationId)

      if (error) throw error

      // Actualizar la lista local
      setReservations(prev => 
        prev.map(r => 
          r.id === reservationId ? { ...r, payment_status: newPaymentStatus } : r
        )
      )

    } catch (error) {
      console.error('Error updating payment status:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando panel de administración...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Bienvenido, {user?.full_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/packages"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Gestionar Paquetes
              </Link>
              <Link
                href="/admin/availability"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Disponibilidad
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reservas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReservations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmadas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmedReservations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingReservations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuarios Registrados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <PackageIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paquetes Activos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPackages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasa de Confirmación</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalReservations > 0 
                    ? Math.round((stats.confirmedReservations / stats.totalReservations) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Reservas Recientes</h2>
          </div>
          
          {reservations.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reservas aún</h3>
              <p className="text-gray-600">Las reservas aparecerán aquí cuando los clientes las hagan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paquete
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fechas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participantes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pago
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.slice(0, 10).map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {getUserName(reservation.user_id)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {getUserEmail(reservation.user_id)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getPackageName(reservation.package_id)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(reservation.start_date).toLocaleDateString('es-ES')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(reservation.end_date).toLocaleDateString('es-ES')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reservation.participants}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${reservation.total_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={reservation.status}
                          onChange={(e) => updateReservationStatus(reservation.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)} border-0 focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmada</option>
                          <option value="cancelled">Cancelada</option>
                          <option value="completed">Completada</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={reservation.payment_status}
                          onChange={(e) => updatePaymentStatus(reservation.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(reservation.payment_status)} border-0 focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="paid">Pagado</option>
                          <option value="cancelled">Cancelado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
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
