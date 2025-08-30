import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Server-side Supabase client with service role key (for API routes)
export const supabaseAdmin = supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null

// Database types (you can generate these with Supabase CLI later)
export type WaitlistEntry = {
  id: string
  email: string
  country: string
  age_range: string
  investor_type: string
  ticket_size: string
  investment_interests: string[]
  motivation: string[]
  referred_by?: string
  position: number
  language: string
  created_at: string
  updated_at: string
}
