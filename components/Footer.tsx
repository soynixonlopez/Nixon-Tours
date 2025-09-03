'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ArrowUp
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="gradient-marine text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/assets/img/hero/NIXONTOURS1080 (1).png"
                  alt="Nixon Tours Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold font-playfair">Nixon Tours</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Descubre el paraíso caribeño de Guna Yala con Nixon Tours. Más de 10 años 
              brindando experiencias únicas y auténticas en el corazón de Panamá.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/nixontours" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/nixontours" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/nixontours" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-300 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/nixontours" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/paquetes" className="text-gray-300 hover:text-white transition-colors">
                  Paquetes Turísticos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/cotizacion" className="text-gray-300 hover:text-white transition-colors">
                  Cotizar Viaje
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Información de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">+507 6942-0000</p>
                  <p className="text-gray-400 text-sm">WhatsApp disponible</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">info@nixontours.com</p>
                  <p className="text-gray-400 text-sm">Respuesta en 24h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Guna Yala, Panamá</p>
                  <p className="text-gray-400 text-sm">Archipiélago del Caribe</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Lun - Dom</p>
                  <p className="text-gray-400 text-sm">8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Nixon Tours. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/admin" className="hover:text-white transition-colors">
                Panel Admin
              </Link>
              <Link href="/reservas" className="hover:text-white transition-colors">
                Reservas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Volver arriba"
      >
        <ArrowUp className="h-6 w-6 mx-auto" />
      </button>
    </footer>
  )
}
