import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'



const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Nixon Tours - Descubre el Paraíso en Guna Yala, Panamá',
  description: 'Explora las hermosas islas de Guna Yala con Nixon Tours. Ofrecemos paquetes turísticos exclusivos, pasadías, camping y estadías en cabañas frente al mar.',
  keywords: 'turismo, panamá, guna yala, islas, caribe, tours, viajes, aventura',
  authors: [{ name: 'Nixon Tours' }],
  openGraph: {
    title: 'Nixon Tours - Guna Yala, Panamá',
    description: 'Descubre el paraíso caribeño de Panamá con experiencias únicas y auténticas',
    url: 'https://nixontours.com',
    siteName: 'Nixon Tours',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nixon Tours - Guna Yala',
      },
    ],
    locale: 'es_PA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nixon Tours - Guna Yala, Panamá',
    description: 'Descubre el paraíso caribeño de Panamá',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-inter antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
