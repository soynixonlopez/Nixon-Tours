'use client'

import { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
        asunto: '',
        mensaje: ''
      })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-dark-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contáctanos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para ayudarte a planificar tu aventura perfecta en Guna Yala
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              📞 Respuesta en 24h
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              💬 WhatsApp disponible
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🌍 Atención en español
            </span>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Información de Contacto */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-dark-900 mb-6">
                  Información de <span className="text-primary-600">Contacto</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Nuestro equipo está disponible para responder todas tus preguntas y ayudarte 
                  a planificar la experiencia turística de tus sueños en Guna Yala.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-900 mb-2">Teléfono</h3>
                    <p className="text-primary-600 font-medium text-lg">+507 6942-0000</p>
                    <p className="text-gray-600 text-sm">WhatsApp disponible 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-900 mb-2">Email</h3>
                    <p className="text-primary-600 font-medium text-lg">info@nixontours.com</p>
                    <p className="text-gray-600 text-sm">Respuesta en menos de 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-900 mb-2">Ubicación</h3>
                    <p className="text-primary-600 font-medium text-lg">Guna Yala, Panamá</p>
                    <p className="text-gray-600 text-sm">Archipiélago del Caribe</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-900 mb-2">Horario de Atención</h3>
                    <p className="text-primary-600 font-medium text-lg">Lun - Dom: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 text-sm">Emergencias: 24/7</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-dark-900 mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/nixontours" target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <span className="text-lg font-bold">f</span>
                  </a>
                  <a href="https://instagram.com/nixontours" target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                    <span className="text-lg font-bold">📷</span>
                  </a>
                  <a href="https://wa.me/50769420000" target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                    <span className="text-lg font-bold">💬</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-2">Envíanos un Mensaje</h3>
                <p className="text-gray-600">Cuéntanos sobre tu viaje soñado</p>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">¡Mensaje enviado exitosamente! Te responderemos pronto.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800">Hubo un error al enviar el mensaje. Inténtalo de nuevo.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <select
                      id="asunto"
                      name="asunto"
                      required
                      value={formData.asunto}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="cotizacion">Cotización de Paquete</option>
                      <option value="reserva">Reserva de Tour</option>
                      <option value="personalizado">Paquete Personalizado</option>
                      <option value="informacion">Información General</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu viaje soñado, fechas, número de personas, preferencias..."
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
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>* Campos obligatorios</p>
                <p className="mt-2">
                  También puedes contactarnos directamente por WhatsApp: 
                  <a href="https://wa.me/50769420000" target="_blank" rel="noopener noreferrer" 
                     className="text-primary-600 hover:text-primary-700 font-medium ml-1">
                    +507 6942-0000
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">
              Nuestra <span className="text-primary-600">Ubicación</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guna Yala se encuentra en el noreste de Panamá, en el archipiélago del Caribe. 
              Es accesible desde la Ciudad de Panamá por avión o por tierra.
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-primary-400" />
              <p className="text-lg font-medium">Mapa de Guna Yala</p>
              <p className="text-sm">Integración con Google Maps próximamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">
              Preguntas <span className="text-primary-600">Frecuentes</span>
            </h2>
            <p className="text-lg text-gray-600">
              Resolvemos las dudas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-900 mb-3">
                ¿Cuál es la mejor época para visitar Guna Yala?
              </h3>
              <p className="text-gray-600">
                Guna Yala es hermoso todo el año, pero la temporada seca (diciembre a abril) 
                ofrece las mejores condiciones para actividades acuáticas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-900 mb-3">
                ¿Necesito visa para visitar Panamá?
              </h3>
              <p className="text-gray-600">
                La mayoría de países no requieren visa para estancias de hasta 90 días. 
                Consulta con tu embajada local para confirmar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-900 mb-3">
                ¿Qué incluyen los paquetes turísticos?
              </h3>
              <p className="text-gray-600">
                Todos nuestros paquetes incluyen transporte, guía local, comidas según el plan, 
                y equipamiento necesario para las actividades.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-900 mb-3">
                ¿Puedo personalizar mi viaje?
              </h3>
              <p className="text-gray-600">
                ¡Absolutamente! Nos especializamos en crear experiencias personalizadas 
                que se adapten a tus preferencias y presupuesto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
