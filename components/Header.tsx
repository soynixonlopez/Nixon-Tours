'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-transparent shadow-sm">
                    {/* Top Bar */}
              <div className="hidden lg:block gradient-marine">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+507 6942-0000</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@nixontours.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Horario: Lun - Dom 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

                    {/* Main Navigation */}
              <nav className={`py-4 transition-all duration-300 ${
                isScrolled ? 'gradient-marine shadow-lg' : 'bg-transparent'
              }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
                         {/* Logo */}
             <Link href="/" className="flex items-center" onClick={closeMenu}>
               <div className="relative w-16 h-16 rounded-full overflow-hidden">
                 <Image
                   src="/assets/img/hero/NIXONTOURS1080 (1).png"
                   alt="Nixon Tours Logo"
                   fill
                   className="object-cover"
                 />
               </div>
             </Link>

                                {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                      <Link
                        href="/"
                        className={`font-medium transition-colors ${
                          isScrolled ? 'text-white hover:text-secondary-400' : 'text-white hover:text-secondary-400'
                        }`}
                      >
                        Inicio
                      </Link>
                      <Link
                        href="/paquetes"
                        className={`font-medium transition-colors ${
                          isScrolled ? 'text-white hover:text-secondary-400' : 'text-white hover:text-secondary-400'
                        }`}
                      >
                        Paquetes
                      </Link>
                      <Link
                        href="/cotizacion"
                        className={`font-medium transition-colors ${
                          isScrolled ? 'text-white hover:text-secondary-400' : 'text-white hover:text-secondary-400'
                        }`}
                      >
                        Cotización
                      </Link>
                      <Link
                        href="/about"
                        className={`font-medium transition-colors ${
                          isScrolled ? 'text-white hover:text-secondary-400' : 'text-white hover:text-secondary-400'
                        }`}
                      >
                        Sobre Nosotros
                      </Link>
                      <Link
                        href="/contact"
                        className={`font-medium transition-colors ${
                          isScrolled ? 'text-white hover:text-secondary-400' : 'text-white hover:text-secondary-400'
                        }`}
                      >
                        Contacto
                      </Link>
                    </div>

                                {/* Login/Register Button */}
                    <div className="hidden lg:block">
                      <Link
                        href="/auth"
                        className={`font-medium px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                          isScrolled 
                            ? 'border-white text-white hover:bg-white hover:text-dark-900' 
                            : 'border-white text-white hover:bg-white hover:text-dark-900'
                        }`}
                      >
                        Login / Register
                      </Link>
                    </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-screen opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="bg-white shadow-lg border-t">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-dark-900 font-medium py-2 hover:text-primary-500 transition-colors"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link 
                href="/paquetes" 
                className="text-dark-900 font-medium py-2 hover:text-primary-500 transition-colors"
                onClick={closeMenu}
              >
                Paquetes
              </Link>
              <Link 
                href="/cotizacion" 
                className="text-dark-900 font-medium py-2 hover:text-primary-500 transition-colors"
                onClick={closeMenu}
              >
                Cotización
              </Link>
              <Link 
                href="/about" 
                className="text-dark-900 font-medium py-2 hover:text-primary-500 transition-colors"
                onClick={closeMenu}
              >
                Sobre Nosotros
              </Link>
              <Link 
                href="/contact" 
                className="text-dark-900 font-medium py-2 hover:text-primary-500 transition-colors"
                onClick={closeMenu}
              >
                Contacto
              </Link>
              
              {/* Mobile Login/Register */}
              <div className="pt-4 border-t">
                <Link 
                  href="/auth" 
                  className="btn-primary w-full text-center"
                  onClick={closeMenu}
                >
                  Login / Register
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary-500" />
                  <span>+507 6942-0000</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary-500" />
                  <span>info@nixontours.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
