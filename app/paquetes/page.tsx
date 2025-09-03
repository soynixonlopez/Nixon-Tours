import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Calendar,
  ArrowRight,
  Heart,
  Shield
} from 'lucide-react'

const paquetes = [
  {
    id: 1,
    titulo: "Pasadía en Isla Perro",
    descripcion: "Disfruta de un día completo en una de las islas más hermosas de Guna Yala. Incluye transporte, almuerzo y actividades acuáticas.",
    precio: 85,
    duracion: "1 día",
    personas: "2-8 personas",
    ubicacion: "Isla Perro, Guna Yala",
    imagen: "/assets/img/hero/main-hero.png",
    destacado: true,
    incluye: ["Transporte en lancha", "Almuerzo tradicional", "Snorkeling", "Guía local", "Equipo de seguridad"],
    rating: 4.9,
    reviews: 127
  },
  {
    id: 2,
    titulo: "Camping en Isla Chichime",
    descripcion: "Vive la experiencia única de acampar en una isla desierta. Noches bajo las estrellas con el sonido del mar.",
    precio: 150,
    duracion: "2 días / 1 noche",
    personas: "4-12 personas",
    ubicacion: "Isla Chichime, Guna Yala",
    imagen: "/assets/img/hero/NIXONTOURS1080 (1).png",
    destacado: false,
    incluye: ["Transporte ida y vuelta", "Equipo de camping", "Comidas completas", "Guía certificado", "Actividades nocturnas"],
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    titulo: "Estadía en Cabaña Frente al Mar",
    descripcion: "Relájate en nuestras cabañas tradicionales con vista al mar. Experiencia auténtica en el corazón de Guna Yala.",
    precio: 200,
    duracion: "3 días / 2 noches",
    personas: "2-6 personas",
    ubicacion: "Isla principal, Guna Yala",
    imagen: "/assets/img/hero/main-hero.png",
    destacado: true,
    incluye: ["Hospedaje en cabaña", "Todas las comidas", "Actividades culturales", "Transporte local", "WiFi disponible"],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    titulo: "Tour Cultural Guna",
    descripcion: "Sumérgete en la rica cultura indígena Guna. Visita comunidades locales y aprende sobre sus tradiciones.",
    precio: 120,
    duracion: "1 día completo",
    personas: "6-15 personas",
    ubicacion: "Comunidades Guna, Guna Yala",
    imagen: "/assets/img/hero/NIXONTOURS1080 (1).png",
    destacado: false,
    incluye: ["Guía cultural", "Visita a comunidades", "Almuerzo tradicional", "Demostración artesanal", "Transporte"],
    rating: 4.9,
    reviews: 203
  }
]

export default function PaquetesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-dark-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nuestros <span className="text-secondary-400">Paquetes Turísticos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubre las mejores experiencias en Guna Yala con paquetes diseñados para todos los gustos y presupuestos
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🏝️ Pasadías
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🏕️ Camping
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🏡 Cabañas
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🎭 Cultural
            </span>
          </div>
        </div>
      </section>

      {/* Paquetes Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {paquetes.map((paquete) => (
              <div 
                key={paquete.id} 
                className={`card overflow-hidden group ${
                  paquete.destacado ? 'ring-2 ring-secondary-400' : ''
                }`}
              >
                {/* Imagen */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={paquete.imagen}
                    alt={paquete.titulo}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {paquete.destacado && (
                    <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ Destacado
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-dark-900 group-hover:text-primary-600 transition-colors">
                      {paquete.titulo}
                    </h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-600">
                        ${paquete.precio}
                      </div>
                      <div className="text-sm text-gray-500">por persona</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {paquete.descripcion}
                  </p>

                  {/* Detalles */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-primary-500" />
                      {paquete.duracion}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-primary-500" />
                      {paquete.personas}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                      {paquete.ubicacion}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                      Todo el año
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(paquete.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {paquete.rating} ({paquete.reviews} reseñas)
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-1 text-green-500" />
                      Garantía
                    </div>
                  </div>

                  {/* Incluye */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-dark-900 mb-3">Incluye:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {paquete.incluye.map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      href={`/cotizacion?paquete=${paquete.id}`}
                      className="btn-primary flex-1 text-center group-hover:bg-primary-600"
                    >
                      Cotizar Ahora
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      href={`/paquetes/${paquete.id}`}
                      className="btn-outline flex-1 text-center"
                    >
                      Ver Detalles
                    </Link>
                  </div>
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
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Contáctanos para crear un paquete personalizado que se adapte perfectamente a tus necesidades y sueños de viaje
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Contactar para Personalizar
            </Link>
            <Link href="/cotizacion" className="btn-outline border-white text-white hover:bg-white hover:text-dark-900">
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
