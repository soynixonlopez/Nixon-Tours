import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
  Shield, 
  Star, 
  Users, 
  MapPin, 
  Clock, 
  Award,
  CheckCircle,
  Compass,
  Globe,
  Leaf,
  Camera
} from 'lucide-react'

const valores = [
  {
    icon: Heart,
    titulo: 'Pasión por el Turismo',
    descripcion: 'Amamos lo que hacemos y transmitimos esa pasión a cada viajero que nos elige.'
  },
  {
    icon: Shield,
    titulo: 'Seguridad Garantizada',
    descripcion: 'La seguridad de nuestros clientes es nuestra máxima prioridad en cada aventura.'
  },
  {
    icon: Star,
    titulo: 'Excelencia en Servicio',
    descripcion: 'Nos esforzamos por superar las expectativas en cada detalle del viaje.'
  },
  {
    icon: Users,
    titulo: 'Comunidad Local',
    descripcion: 'Trabajamos de la mano con las comunidades indígenas para experiencias auténticas.'
  }
]

const equipo = [
  {
    nombre: 'Nixon González',
    cargo: 'Fundador & CEO',
    descripcion: 'Más de 15 años de experiencia en turismo sostenible en Guna Yala.',
    imagen: '/assets/img/hero/NIXONTOURS1080 (1).png'
  },
  {
    nombre: 'María Santos',
    cargo: 'Directora de Operaciones',
    descripcion: 'Especialista en logística y coordinación de tours personalizados.',
    imagen: '/assets/img/hero/main-hero.png'
  },
  {
    nombre: 'Carlos Rodríguez',
    cargo: 'Guía Principal',
    descripcion: 'Guía certificado con profundo conocimiento de la cultura Guna.',
    imagen: '/assets/img/hero/NIXONTOURS1080 (1).png'
  }
]

const logros = [
  { numero: '5000+', descripcion: 'Clientes Satisfechos' },
  { numero: '10+', descripcion: 'Años de Experiencia' },
  { numero: '98%', descripcion: 'Tasa de Satisfacción' },
  { numero: '365', descripcion: 'Días de Operación' }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark-800 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sobre <span className="text-secondary-400">Nixon Tours</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Más de una década conectando viajeros con la magia auténtica de Guna Yala
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🏆 Experiencia Garantizada
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🌱 Turismo Sostenible
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              🤝 Comunidad Local
            </span>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark-900 mb-8">
                Nuestra <span className="text-primary-600">Historia</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Nixon Tours nació en 2013 de la pasión de Nixon González por compartir la belleza 
                  y autenticidad de su tierra natal, Guna Yala. Lo que comenzó como pequeños tours 
                  para amigos se convirtió en una empresa comprometida con el turismo sostenible.
                </p>
                <p>
                  Durante más de una década, hemos construido relaciones sólidas con las comunidades 
                  indígenas Guna, respetando sus tradiciones y contribuyendo al desarrollo económico 
                  local de manera responsable.
                </p>
                <p>
                  Hoy, Nixon Tours es sinónimo de experiencias auténticas, servicio excepcional y 
                  compromiso con la preservación de la cultura y el medio ambiente de Guna Yala.
                </p>
              </div>
              
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Certificado por ATP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Guías Certificados</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Seguro de Viaje</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/img/hero/main-hero.png"
                  alt="Historia de Nixon Tours"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">2013</div>
                  <div className="text-sm text-gray-600">Año de Fundación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Nuestros <span className="text-primary-600">Valores</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada experiencia que ofrecemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <valor.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-4">{valor.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logros */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Nuestros <span className="text-secondary-400">Logros</span>
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Cifras que respaldan nuestra trayectoria y compromiso con la excelencia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {logros.map((logro, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary-400 mb-2">
                  {logro.numero}
                </div>
                <div className="text-primary-100 font-medium">
                  {logro.descripcion}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Nuestro <span className="text-primary-600">Equipo</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesionales apasionados que hacen posible cada experiencia memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipo.map((miembro, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center group hover:bg-white hover:shadow-lg transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full overflow-hidden mx-auto mb-6">
                  <Image
                    src={miembro.imagen}
                    alt={miembro.nombre}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">{miembro.nombre}</h3>
                <div className="text-primary-600 font-medium mb-4">{miembro.cargo}</div>
                <p className="text-gray-600 leading-relaxed">{miembro.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-dark-900 mb-6 text-center">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Conectar viajeros con la autenticidad de Guna Yala, ofreciendo experiencias 
                únicas que respeten la cultura local y promuevan el turismo sostenible, 
                creando memorias inolvidables y contribuyendo al desarrollo de la comunidad.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-dark-900 mb-6 text-center">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Ser reconocidos como la agencia líder en turismo sostenible en Guna Yala, 
                estableciendo estándares de excelencia en servicio al cliente, conservación 
                cultural y ambiental, y desarrollo comunitario responsable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso Ambiental */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark-900 mb-8">
                Compromiso con el <span className="text-green-600">Medio Ambiente</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Leaf className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2">Turismo Sostenible</h3>
                    <p className="text-gray-600">
                      Implementamos prácticas eco-friendly en todas nuestras operaciones, 
                      minimizando el impacto ambiental.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Camera className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2">Conservación Cultural</h3>
                    <p className="text-gray-600">
                      Trabajamos para preservar las tradiciones y el patrimonio cultural 
                      de las comunidades Guna.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2">Desarrollo Comunitario</h3>
                    <p className="text-gray-600">
                      Contribuimos al desarrollo económico local a través del empleo 
                      y la capacitación de guías locales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/img/hero/NIXONTOURS1080 (1).png"
                  alt="Compromiso Ambiental"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm">Sostenible</div>
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
            ¿Listo para conocer <span className="text-secondary-400">Guna Yala</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Únete a miles de viajeros que han descubierto la magia auténtica de Panamá con Nixon Tours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/paquetes" className="btn-secondary">
              Ver Paquetes Disponibles
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-dark-900">
              Contactar Ahora
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
