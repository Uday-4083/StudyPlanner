import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          created_at: string
          title: string
          subject: string
          completed: boolean
          date: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          subject: string
          completed?: boolean
          date: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          subject?: string
          completed?: boolean
          date?: string
          user_id?: string
        }
      }
      streaks: {
        Row: {
          id: string
          created_at: string
          user_id: string
          current_streak: number
          last_activity_date: string
          longest_streak: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          current_streak?: number
          last_activity_date: string
          longest_streak?: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          current_streak?: number
          last_activity_date?: string
          longest_streak?: number
        }
      }
    }
  }
}