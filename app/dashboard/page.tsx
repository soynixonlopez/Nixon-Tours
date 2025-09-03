'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase, Reservation, Package } from '@/lib/supabase'
import { Calendar, Users, DollarSign, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    fetchReservations()
  }, [user, router])

  const fetchReservations = async () => {
    try {
      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (reservationsError) throw reservationsError

      const { data: packagesData, error: packagesError } = await supabase
        .from('packages')
        .select('*')

      if (packagesError) throw packagesError

      setReservations(reservationsData || [])
      setPackages(packagesData || [])
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPackageName = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId)
    return pkg?.name || 'Paquete no encontrado'
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-5 w-5" />
      case 'pending': return <AlertCircle className="h-5 w-5" />
      case 'cancelled': return <XCircle className="h-5 w-5" />
      case 'completed': return <CheckCircle className="h-5 w-5" />
      default: return <AlertCircle className="h-5 w-5" />
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tu dashboard...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Mi Dashboard</h1>
              <p className="text-gray-600">Bienvenido, {user?.full_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/reservas"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nueva Reserva
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reservas</p>
                <p className="text-2xl font-bold text-gray-900">{reservations.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'confirmed').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Gastado</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${reservations.reduce((sum, r) => sum + r.total_price, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Mis Reservas</h2>
          </div>
          
          {reservations.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes reservas aún</h3>
              <p className="text-gray-600 mb-6">¡Empieza a planear tu próxima aventura en Guna Yala!</p>
              <Link
                href="/reservas"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Hacer mi primera reserva
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {getPackageName(reservation.package_id)}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                          {reservation.status === 'confirmed' && 'Confirmada'}
                          {reservation.status === 'pending' && 'Pendiente'}
                          {reservation.status === 'cancelled' && 'Cancelada'}
                          {reservation.status === 'completed' && 'Completada'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(reservation.payment_status)}`}>
                          {reservation.payment_status === 'paid' && 'Pagado'}
                          {reservation.payment_status === 'pending' && 'Pago Pendiente'}
                          {reservation.payment_status === 'cancelled' && 'Pago Cancelado'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(reservation.start_date).toLocaleDateString('es-ES')} - {new Date(reservation.end_date).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{reservation.participants} personas</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>${reservation.total_price.toLocaleString()}</span>
                        </div>
                      </div>

                      {reservation.special_requests && (
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Solicitudes especiales:</strong> {reservation.special_requests}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
