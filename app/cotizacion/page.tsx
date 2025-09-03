'use client'

import { useState, useEffect } from 'react'
import { 
  Calculator, 
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Star,
  Heart,
  Phone,
  Mail
} from 'lucide-react'

interface CotizacionData {
  nombre: string
  email: string
  telefono: string
  fechaInicio: string
  fechaFin: string
  numeroPersonas: number
  tipoPaquete: string
  presupuesto: string
  actividades: string[]
  mensaje: string
}

const paquetesDisponibles = [
  {
    id: 'pasadia',
    nombre: 'Pasadía en Isla',
    precioBase: 85,
    descripcion: 'Día completo en isla paradisíaca',
    icon: '🏝️'
  },
  {
    id: 'camping',
    nombre: 'Camping Nocturno',
    precioBase: 150,
    descripcion: 'Noche bajo las estrellas',
    icon: '🏕️'
  },
  {
    id: 'cabana',
    nombre: 'Cabaña Frente al Mar',
    precioBase: 200,
    descripcion: 'Hospedaje en cabaña tradicional',
    icon: '🏡'
  },
  {
    id: 'cultural',
    nombre: 'Tour Cultural',
    precioBase: 120,
    descripcion: 'Experiencia cultural auténtica',
    icon: '🎭'
  },
  {
    id: 'personalizado',
    nombre: 'Paquete Personalizado',
    precioBase: 0,
    descripcion: 'Diseñado especialmente para ti',
    icon: '✨'
  }
]

const actividadesDisponibles = [
  { id: 'snorkeling', nombre: 'Snorkeling', precio: 25, icon: '🤿' },
  { id: 'kayak', nombre: 'Kayak', precio: 30, icon: '🛶' },
  { id: 'pesca', nombre: 'Pesca Deportiva', precio: 45, icon: '🎣' },
  { id: 'buceo', nombre: 'Buceo', precio: 80, icon: '🐠' },
  { id: 'cultura', nombre: 'Tour Cultural', precio: 35, icon: '🏺' },
  { id: 'fotografia', nombre: 'Fotografía Profesional', precio: 60, icon: '📸' }
]

export default function CotizacionPage() {
  const [formData, setFormData] = useState<CotizacionData>({
    nombre: '',
    email: '',
    telefono: '',
    fechaInicio: '',
    fechaFin: '',
    numeroPersonas: 2,
    tipoPaquete: '',
    presupuesto: '',
    actividades: [],
    mensaje: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<any>(null)
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<any[]>([])

  useEffect(() => {
    if (formData.tipoPaquete) {
      const paquete = paquetesDisponibles.find(p => p.id === formData.tipoPaquete)
      setPaqueteSeleccionado(paquete)
    }
  }, [formData.tipoPaquete])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleActividadChange = (actividadId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        actividades: [...formData.actividades, actividadId]
      })
      const actividad = actividadesDisponibles.find(a => a.id === actividadId)
      if (actividad) {
        setActividadesSeleccionadas([...actividadesSeleccionadas, actividad])
      }
    } else {
      setFormData({
        ...formData,
        actividades: formData.actividades.filter(id => id !== actividadId)
      })
      setActividadesSeleccionadas(actividadesSeleccionadas.filter(a => a.id !== actividadId))
    }
  }

  const calcularPrecioTotal = () => {
    if (!paqueteSeleccionado || paqueteSeleccionado.id === 'personalizado') return 0
    
    let precioTotal = paqueteSeleccionado.precioBase * formData.numeroPersonas
    
    // Agregar precio de actividades
    actividadesSeleccionadas.forEach(actividad => {
      precioTotal += actividad.precio * formData.numeroPersonas
    })
    
    return precioTotal
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setSubmitStatus('idle')
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        fechaInicio: '',
        fechaFin: '',
        numeroPersonas: 2,
        tipoPaquete: '',
        presupuesto: '',
        actividades: [],
        mensaje: ''
      })
      setPaqueteSeleccionado(null)
      setActividadesSeleccionadas([])
    }, 3000)
  }

  const precioTotal = calcularPrecioTotal()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Cotiza tu <span className="text-white">Aventura</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Obtén una cotización personalizada para tu viaje soñado en Guna Yala
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              💰 Precios transparentes
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              ⚡ Respuesta en 2h
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🎯 Sin compromiso
            </span>
          </div>
        </div>
      </section>

      {/* Formulario de Cotización */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario Principal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-dark-900 mb-2">Cotización Personalizada</h2>
                  <p className="text-gray-600">Completa los datos para recibir tu cotización</p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">¡Cotización enviada exitosamente! Te responderemos en menos de 2 horas.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-800">Hubo un error al enviar la cotización. Inténtalo de nuevo.</span>
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
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
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
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="+507 6XXX-XXXX"
                    />
                  </div>

                  {/* Fechas y Personas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Inicio *
                      </label>
                      <input
                        type="date"
                        id="fechaInicio"
                        name="fechaInicio"
                        required
                        value={formData.fechaInicio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Fin *
                      </label>
                      <input
                        type="date"
                        id="fechaFin"
                        name="fechaFin"
                        required
                        value={formData.fechaFin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="numeroPersonas" className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Personas *
                      </label>
                      <input
                        type="number"
                        id="numeroPersonas"
                        name="numeroPersonas"
                        required
                        min="1"
                        max="20"
                        value={formData.numeroPersonas}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tipo de Paquete */}
                  <div>
                    <label htmlFor="tipoPaquete" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Paquete *
                    </label>
                    <select
                      id="tipoPaquete"
                      name="tipoPaquete"
                      required
                      value={formData.tipoPaquete}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona un paquete</option>
                      {paquetesDisponibles.map(paquete => (
                        <option key={paquete.id} value={paquete.id}>
                          {paquete.icon} {paquete.nombre} - ${paquete.precioBase}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Presupuesto */}
                  <div>
                    <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700 mb-2">
                      Presupuesto por Persona
                    </label>
                    <select
                      id="presupuesto"
                      name="presupuesto"
                      value={formData.presupuesto}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona tu presupuesto</option>
                      <option value="economico">Económico ($50 - $150)</option>
                      <option value="medio">Medio ($150 - $300)</option>
                      <option value="premium">Premium ($300 - $500+)</option>
                      <option value="personalizado">Personalizado</option>
                    </select>
                  </div>

                  {/* Actividades Adicionales */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Actividades Adicionales (Opcional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {actividadesDisponibles.map(actividad => (
                        <label key={actividad.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.actividades.includes(actividad.id)}
                            onChange={(e) => handleActividadChange(actividad.id, e.target.checked)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span>{actividad.icon}</span>
                              <span className="font-medium text-sm">{actividad.nombre}</span>
                            </div>
                            <div className="text-xs text-gray-500">+${actividad.precio}/persona</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje Adicional
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Cuéntanos sobre preferencias especiales, restricciones alimentarias, o cualquier otra información relevante..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando Cotización...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Solicitar Cotización</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar de Resumen */}
            <div className="space-y-6">
              {/* Resumen de Cotización */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-dark-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-primary-600" />
                  Resumen de Cotización
                </h3>
                
                {paqueteSeleccionado ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-dark-900">{paqueteSeleccionado.icon} {paqueteSeleccionado.nombre}</span>
                        <span className="text-lg font-bold text-primary-600">${paqueteSeleccionado.precioBase}</span>
                      </div>
                      <p className="text-sm text-gray-600">{paqueteSeleccionado.descripcion}</p>
                    </div>

                    {actividadesSeleccionadas.length > 0 && (
                      <div>
                        <h4 className="font-medium text-dark-900 mb-2">Actividades Seleccionadas:</h4>
                        <div className="space-y-2">
                          {actividadesSeleccionadas.map(actividad => (
                            <div key={actividad.id} className="flex items-center justify-between text-sm">
                              <span>{actividad.icon} {actividad.nombre}</span>
                              <span className="text-primary-600">+${actividad.precio}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-dark-900">Personas:</span>
                        <span className="text-primary-600">{formData.numeroPersonas}</span>
                      </div>
                      {precioTotal > 0 && (
                        <div className="flex items-center justify-between text-lg font-bold text-dark-900">
                          <span>Total Estimado:</span>
                          <span className="text-2xl text-primary-600">${precioTotal}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Calculator className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Selecciona un paquete para ver el resumen</p>
                  </div>
                )}
              </div>

              {/* Información de Contacto */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-dark-900 mb-4">¿Necesitas Ayuda?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-primary-600" />
                    <span>+507 6942-0000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-primary-600" />
                    <span>info@nixontours.com</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    💡 <strong>Tip:</strong> También puedes contactarnos por WhatsApp para una respuesta más rápida
                  </p>
                </div>
              </div>

              {/* Garantías */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-dark-900 mb-4">Nuestras Garantías</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Respuesta en menos de 2 horas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Sin compromiso de compra</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Precios transparentes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Asesoría personalizada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            ¿Listo para tu <span className="text-secondary-400">Aventura</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Completa el formulario de cotización y recibe una propuesta personalizada en menos de 2 horas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#cotizacion" className="btn-secondary">
              Solicitar Cotización
            </a>
            <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-dark-900">
              Contactar Directamente
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
