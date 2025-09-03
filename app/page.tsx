import Image from 'next/image'
import Link from 'next/link'
import { 
  Compass, 
  Calculator, 
  Star, 
  Shield, 
  Heart, 
  Award
} from 'lucide-react'


export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 top-0">
          <Image
            src="/assets/img/hero/main-hero.png"
            alt="Guna Yala Paradise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white pt-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <span className="inline-block bg-white/20 backdrop-blur-custom text-white px-6 py-3 rounded-full text-lg font-medium mb-8 border border-white/30">
                Tu Aventura en el Caribe Panameño
              </span>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-shadow-lg">
                Bienvenidos a Guna Yala
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-shadow max-w-3xl mx-auto leading-relaxed">
                Descubre el paraíso caribeño de Panamá con experiencias únicas y auténticas
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/paquetes" className="btn-primary inline-flex items-center px-8 py-4 text-lg">
                  <Compass className="mr-3 h-6 w-6" />
                  Explorar Paquetes
                </Link>
                <Link href="/cotizacion" className="btn-outline border-white text-white hover:bg-white hover:text-dark-900 inline-flex items-center px-8 py-4 text-lg">
                  <Calculator className="mr-3 h-6 w-6" />
                  Cotizar Viaje
                </Link>
              </div>
            </div>


          </div>
        </div>


      </section>

      {/* Features Section */}
      <section className="py-20 bg-content">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-dark-900">¿Por qué elegir Nixon Tours?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-dark-900">Experiencia Garantizada</h3>
              <p className="text-gray-600">Más de 10 años brindando servicios turísticos de calidad</p>
            </div>

            <div className="card p-8 text-center group">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-200 transition-colors">
                <Heart className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-dark-900">Atención Personalizada</h3>
              <p className="text-gray-600">Guías locales expertos y servicio 24/7</p>
            </div>

            <div className="card p-8 text-center group">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success-200 transition-colors">
                <Award className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-dark-900">Precios Competitivos</h3>
              <p className="text-gray-600">La mejor relación calidad-precio del mercado</p>
            </div>

            <div className="card p-8 text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-dark-900">Clientes Satisfechos</h3>
              <p className="text-gray-600">98% de satisfacción en nuestros servicios</p>
            </div>
          </div>
        </div>
      </section>

      
        

        {/* Final CTA Section */}
        <section className="py-20 bg-content-alt text-dark-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              ¿Listo para tu <span className="text-secondary-400">Aventura Caribeña</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Únete a miles de viajeros que han descubierto el paraíso de Guna Yala con Nixon Tours
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
