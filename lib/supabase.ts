import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las tablas de la base de datos
export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  created_at: string
}

export interface Package {
  id: string
  name: string
  description: string
  duration: string
  price: number
  max_capacity: number
  image_url: string
  is_active: boolean
  created_at: string
}

export interface Reservation {
  id: string
  user_id: string
  package_id: string
  start_date: string
  end_date: string
  participants: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'pending' | 'paid' | 'cancelled'
  payment_method: 'efectivo' | 'yappy' | 'paguelofacil'
  special_requests?: string
  created_at: string
}

export interface Availability {
  id: string
  package_id: string
  date: string
  available_spots: number
  total_spots: number
  is_blocked: boolean
}
