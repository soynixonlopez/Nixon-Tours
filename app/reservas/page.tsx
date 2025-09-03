'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CreditCard,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Heart
} from 'lucide-react'

interface Paquete {
  id: number
  nombre: string
  descripcion: string
  precio: number
  duracion: string
  imagen: string
  destacado: boolean
  disponibilidad: string[]
}

interface Reserva {
  paqueteId: number
  fechaInicio: string
  fechaFin: string
  numeroPersonas: number
  nombre: string
  email: string
  telefono: string
  metodoPago: string
  comentarios: string
}

const paquetes: Paquete[] = [
  {
    id: 1,
    nombre: 'Pasadía en Isla Perro',
    descripcion: 'Día completo en una de las islas más hermosas de Guna Yala',
    precio: 85,
    duracion: '1 día',
    imagen: '/assets/img/hero/main-hero.png',
    destacado: true,
    disponibilidad: ['2024-12-15', '2024-12-16', '2024-12-17', '2024-12-18', '2024-12-19']
  },
  {
    id: 2,
    nombre: 'Camping en Isla Chichime',
    descripcion: 'Noche bajo las estrellas en isla desierta',
    precio: 150,
    duracion: '2 días / 1 noche',
    imagen: '/assets/img/hero/NIXONTOURS1080 (1).png',
    destacado: false,
    disponibilidad: ['2024-12-20', '2024-12-21', '2024-12-22', '2024-12-23']
  },
  {
    id: 3,
    nombre: 'Cabaña Frente al Mar',
    descripcion: 'Hospedaje en cabaña tradicional con vista al mar',
    precio: 200,
    duracion: '3 días / 2 noches',
    imagen: '/assets/img/hero/main-hero.png',
    destacado: true,
    disponibilidad: ['2024-12-25', '2024-12-26', '2024-12-27', '2024-12-28', '2024-12-29']
  }
]

const metodosPago = [
  { id: 'efectivo', nombre: 'Efectivo', icon: '💵', descripcion: 'Pago al llegar' },
  { id: 'yappy', nombre: 'Yappy Panamá', icon: '📱', descripcion: 'Transferencia instantánea' },
  { id: 'paguelofacil', nombre: 'PagueloFácil', icon: '💳', descripcion: 'Tarjeta de crédito/débito' }
]

export default function ReservasPage() {
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<Paquete | null>(null)
  const [fechaSeleccionada, setFechaSeleccionada] = useState('')
  const [reserva, setReserva] = useState<Reserva>({
    paqueteId: 0,
    fechaInicio: '',
    fechaFin: '',
    numeroPersonas: 2,
    nombre: '',
    email: '',
    telefono: '',
    metodoPago: '',
    comentarios: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mesActual, setMesActual] = useState(new Date())

  useEffect(() => {
    if (paqueteSeleccionado) {
      setReserva(prev => ({
        ...prev,
        paqueteId: paqueteSeleccionado.id
      }))
    }
  }, [paqueteSeleccionado])

  const generarCalendario = () => {
    const year = mesActual.getFullYear()
    const month = mesActual.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const calendar = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      calendar.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return calendar
  }

  const esFechaDisponible = (fecha: Date) => {
    if (!paqueteSeleccionado) return false
    const fechaStr = fecha.toISOString().split('T')[0]
    return paqueteSeleccionado.disponibilidad.includes(fechaStr)
  }

  const esFechaPasada = (fecha: Date) => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    return fecha < hoy
  }

  const seleccionarFecha = (fecha: Date) => {
    if (esFechaDisponible(fecha) && !esFechaPasada(fecha)) {
      const fechaStr = fecha.toISOString().split('T')[0]
      setFechaSeleccionada(fechaStr)
      setReserva(prev => ({
        ...prev,
        fechaInicio: fechaStr
      }))
    }
  }

  const calcularPrecioTotal = () => {
    if (!paqueteSeleccionado) return 0
    return paqueteSeleccionado.precio * reserva.numeroPersonas
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío de reserva
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setSubmitStatus('idle')
      setReserva({
        paqueteId: 0,
        fechaInicio: '',
        fechaFin: '',
        numeroPersonas: 2,
        nombre: '',
        email: '',
        telefono: '',
        metodoPago: '',
        comentarios: ''
      })
      setPaqueteSeleccionado(null)
      setFechaSeleccionada('')
    }, 3000)
  }

  const calendar = generarCalendario()
  const precioTotal = calcularPrecioTotal()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Reserva tu <span className="text-white">Aventura</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Asegura tu lugar en los mejores tours de Guna Yala con reservas online
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              ⚡ Reserva Instantánea
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              💳 Múltiples Métodos de Pago
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🛡️ Confirmación Inmediata
            </span>
          </div>
        </div>
      </section>

      {/* Selección de Paquete */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Selecciona tu <span className="text-primary-600">Paquete</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elige la experiencia que mejor se adapte a tus sueños de viaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paquetes.map((paquete) => (
              <div
                key={paquete.id}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                  paqueteSeleccionado?.id === paquete.id ? 'ring-4 ring-primary-500' : ''
                }`}
                onClick={() => setPaqueteSeleccionado(paquete)}
              >
                {paquete.destacado && (
                  <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Destacado
                  </div>
                )}

                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={paquete.imagen}
                    alt={paquete.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-900 mb-2">{paquete.nombre}</h3>
                  <p className="text-gray-600 mb-4">{paquete.descripcion}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {paquete.duracion}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        2-8 personas
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-600">
                      ${paquete.precio}
                    </div>
                    <div className="text-sm text-gray-500">por persona</div>
                  </div>

                  <button className="w-full mt-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors">
                    Seleccionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario y Reserva */}
      {paqueteSeleccionado && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Calendario */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-dark-900">Selecciona Fecha</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="text-lg font-medium text-dark-900">
                      {mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia) => (
                    <div key={dia} className="text-center text-sm font-medium text-gray-500 py-2">
                      {dia}
                    </div>
                  ))}
                </div>

                {/* Calendario */}
                <div className="grid grid-cols-7 gap-1">
                  {calendar.map((fecha, index) => {
                    const esDisponible = esFechaDisponible(fecha)
                    const esPasada = esFechaPasada(fecha)
                    const esSeleccionada = fechaSeleccionada === fecha.toISOString().split('T')[0]
                    
                    return (
                      <button
                        key={index}
                        onClick={() => seleccionarFecha(fecha)}
                        disabled={!esDisponible || esPasada}
                        className={`p-3 text-sm font-medium rounded-lg transition-all ${
                          esSeleccionada
                            ? 'bg-primary-500 text-white'
                            : esDisponible && !esPasada
                            ? 'hover:bg-primary-100 text-dark-900'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {fecha.getDate()}
                      </button>
                    )
                  })}
                </div>

                {/* Leyenda */}
                <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span>Disponible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span>No disponible</span>
                  </div>
                </div>
              </div>

              {/* Formulario de Reserva */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-dark-900 mb-2">Completa tu Reserva</h3>
                  <p className="text-gray-600">Información personal y método de pago</p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">¡Reserva confirmada exitosamente! Te enviaremos un email de confirmación.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-800">Hubo un error al procesar la reserva. Inténtalo de nuevo.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información Personal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        required
                        value={reserva.nombre}
                        onChange={(e) => setReserva({...reserva, nombre: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={reserva.email}
                        onChange={(e) => setReserva({...reserva, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      required
                      value={reserva.telefono}
                      onChange={(e) => setReserva({...reserva, telefono: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="+507 6XXX-XXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="numeroPersonas" className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Personas *
                    </label>
                    <input
                      type="number"
                      id="numeroPersonas"
                      required
                      min="1"
                      max="20"
                      value={reserva.numeroPersonas}
                      onChange={(e) => setReserva({...reserva, numeroPersonas: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Método de Pago */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Método de Pago *
                    </label>
                    <div className="space-y-3">
                      {metodosPago.map((metodo) => (
                        <label key={metodo.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="metodoPago"
                            value={metodo.id}
                            required
                            checked={reserva.metodoPago === metodo.id}
                            onChange={(e) => setReserva({...reserva, metodoPago: e.target.value})}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{metodo.icon}</span>
                              <span className="font-medium">{metodo.nombre}</span>
                            </div>
                            <div className="text-sm text-gray-500">{metodo.descripcion}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-2">
                      Comentarios Adicionales
                    </label>
                    <textarea
                      id="comentarios"
                      rows={3}
                      value={reserva.comentarios}
                      onChange={(e) => setReserva({...reserva, comentarios: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Preferencias especiales, restricciones alimentarias..."
                    />
                  </div>

                  {/* Resumen de Precio */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Paquete seleccionado:</span>
                      <span className="font-medium">{paqueteSeleccionado.nombre}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Personas:</span>
                      <span className="font-medium">{reserva.numeroPersonas}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Precio por persona:</span>
                      <span className="font-medium">${paqueteSeleccionado.precio}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex items-center justify-between text-lg font-bold text-dark-900">
                        <span>Total:</span>
                        <span className="text-2xl text-primary-600">${precioTotal}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !fechaSeleccionada || !reserva.metodoPago}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Procesando Reserva...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        <span>Confirmar Reserva</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Información de Pagos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Métodos de <span className="text-primary-600">Pago</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos múltiples opciones de pago para tu comodidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metodosPago.map((metodo) => (
              <div key={metodo.id} className="bg-gray-50 rounded-2xl p-8 text-center group hover:bg-white hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{metodo.icon}</div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">{metodo.nombre}</h3>
                <p className="text-gray-600 mb-4">{metodo.descripcion}</p>
                <div className="text-sm text-primary-600 font-medium">
                  Disponible 24/7
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            ¿Listo para <span className="text-secondary-400">Reservar</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Selecciona tu paquete favorito y asegura tu lugar en la aventura de tus sueños
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#paquetes" className="btn-secondary">
              Ver Paquetes Disponibles
            </a>
            <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-dark-900">
              Contactar para Ayuda
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
