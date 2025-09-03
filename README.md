# Nixon Tours - Sitio Web Profesional

Sitio web moderno y profesional para Nixon Tours, agencia de turismo especializada en Guna Yala, Panamá.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Poppins + Playfair Display)
- **Deployment**: Vercel (recomendado)

## ✨ Características

- 🎨 Diseño moderno y responsive
- ⚡ Rendimiento optimizado con Next.js
- 📱 Mobile-first design
- 🔍 SEO optimizado
- 🎭 Animaciones suaves
- 🎯 Componentes reutilizables
- 🌐 Internacionalización (español)
- 📸 Optimización automática de imágenes

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [tu-repositorio]
   cd nixon-tours
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
nixon-tours/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/             # Componentes reutilizables
│   ├── Header.tsx         # Navegación principal
│   └── Footer.tsx         # Pie de página
├── assets/                 # Imágenes y recursos
│   └── img/
├── public/                 # Archivos estáticos
├── tailwind.config.js      # Configuración de Tailwind
├── next.config.js          # Configuración de Next.js
└── package.json            # Dependencias del proyecto
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en `tailwind.config.js`:
- **Primary**: Azul (#2196F3)
- **Secondary**: Amarillo (#FFC107)
- **Dark**: Azul oscuro (#1A237E)

### Fuentes
- **Poppins**: Para texto general
- **Playfair Display**: Para títulos

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar tu repositorio de GitHub
2. Configurar variables de entorno si es necesario
3. Desplegar automáticamente

### Otros proveedores
- Netlify
- AWS Amplify
- Railway

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1280px+)

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificar código

## 🌟 Funcionalidades Implementadas

### **Fase 1 (COMPLETADA ✅):**
- [x] Migración a Next.js 14 + TypeScript
- [x] Diseño responsive con Tailwind CSS
- [x] Página de inicio moderna
- [x] Página de paquetes turísticos
- [x] Componentes Header y Footer

### **Fase 2 (COMPLETADA ✅):**
- [x] Página de contacto con formulario
- [x] Página de cotización con calculadora
- [x] Página "Sobre nosotros" completa
- [x] Sistema de navegación mejorado

### **Fase 3 (COMPLETADA ✅):**
- [x] Sistema de reservas online
- [x] Galería de fotos interactiva
- [x] Página de testimonios y reseñas
- [x] Estructura para métodos de pago (Efectivo, Yappy, PagueloFácil)

## 🚀 Funcionalidades Implementadas

### **Fase 4 (COMPLETADA ✅):**
- [x] PWA capabilities (Progressive Web App)
- [x] Service Worker para funcionamiento offline
- [x] Sistema de notificaciones push
- [x] Página de configuración PWA
- [x] Banner de instalación automático
- [x] Cache inteligente para contenido offline
- [x] Metadatos PWA optimizados
- [x] Sitemap y robots.txt para SEO

### **Fase 5 (COMPLETADA ✅):**
- [x] Sistema de chat en vivo para atención al cliente
- [x] Newsletter/Email marketing con suscripciones
- [x] Blog de viajes con artículos sobre Guna Yala
- [x] Sistema de categorías y búsqueda de artículos
- [x] Integración completa en el sitio web

## 🚀 Funcionalidades Implementadas

### **Fase 6 (COMPLETADA ✅):**
- [x] Sistema de autenticación con Supabase
- [x] Login y registro de usuarios
- [x] Dashboard del cliente
- [x] Gestión de reservas del usuario
- [x] Sistema de cotización simplificado
- [x] Sitio web enfocado en información y reservas
- [x] Base de datos Supabase configurada

## 🔧 Configuración de Supabase

### **1. Crear proyecto en Supabase:**
1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota tu URL y anon key

### **2. Configurar variables de entorno:**
Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### **3. Crear tablas en Supabase:**

#### **Tabla `users`:**
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Tabla `packages`:**
```sql
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  max_capacity INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Tabla `reservations`:**
```sql
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  participants INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
  payment_method TEXT DEFAULT 'efectivo' CHECK (payment_method IN ('efectivo', 'yappy', 'paguelofacil')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Tabla `availability`:**
```sql
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  available_spots INTEGER NOT NULL,
  total_spots INTEGER NOT NULL,
  is_blocked BOOLEAN DEFAULT false,
  UNIQUE(package_id, date)
);
```

### **4. Configurar políticas de seguridad (RLS):**
```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para packages
CREATE POLICY "Anyone can view active packages" ON packages
  FOR SELECT USING (is_active = true);

-- Políticas para reservations
CREATE POLICY "Users can view own reservations" ON reservations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reservations" ON reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para availability
CREATE POLICY "Anyone can view availability" ON availability
  FOR SELECT USING (true);
```

## 🚀 Próximas Funcionalidades

### **Fase 7 (Futura):**
- [ ] Panel de administración para Nixon
- [ ] Gestión de disponibilidad en tiempo real
- [ ] Sistema de notificaciones por email
- [ ] Integración con WhatsApp Business API
- [ ] Sistema de reseñas y calificaciones
- [ ] Analytics y métricas básicas

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: info@nixontours.com
- 📱 WhatsApp: +507 6942-0000
- 🌐 Website: [nixontours.com](https://nixontours.com)

## 📄 Licencia

Este proyecto es propiedad de Nixon Tours. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Nixon Tours**