import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Streak } from '../types'
import { useAuth } from './useAuth'

export function useStreak() {
  const [streak, setStreak] = useState<Streak | null>(null)
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    if (userId) {
      fetchStreak()
    }
  }, [userId])

  const fetchStreak = async () => {
    try {
      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        setStreak(data)
      } else {
        // Create initial streak record
        const newStreak: Streak = {
          id: crypto.randomUUID(),
          user_id: userId,
          current_streak: 0,
          last_activity_date: new Date().toISOString().split('T')[0],
          longest_streak: 0,
          created_at: new Date().toISOString()
        }
        
        const { error: insertError } = await supabase.from('streaks').insert([newStreak])
        if (insertError) throw insertError
        setStreak(newStreak)
      }
    } catch (error) {
      console.error('Error fetching streak:', error)
      // Fallback to localStorage
      const localStreak = localStorage.getItem(`streak_${userId}`)
      if (localStreak) {
        setStreak(JSON.parse(localStreak))
      } else {
        const newStreak: Streak = {
          id: crypto.randomUUID(),
          user_id: userId,
          current_streak: 0,
          last_activity_date: new Date().toISOString().split('T')[0],
          longest_streak: 0,
          created_at: new Date().toISOString()
        }
        localStorage.setItem(`streak_${userId}`, JSON.stringify(newStreak))
        setStreak(newStreak)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateStreak = async (completedTasks: number) => {
    if (!streak) return

    const today = new Date().toISOString().split('T')[0]
    const lastActivity = new Date(streak.last_activity_date)
    const todayDate = new Date(today)
    const diffDays = Math.floor((todayDate.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))

    let newCurrentStreak = streak.current_streak
    
    if (completedTasks > 0) {
      if (diffDays === 1) {
        // Consecutive day
        newCurrentStreak += 1
      } else if (diffDays === 0) {
        // Same day, keep current streak
        newCurrentStreak = streak.current_streak
      } else {
        // Streak broken, start over
        newCurrentStreak = 1
      }
    } else if (diffDays > 1) {
      // No activity for more than a day, reset streak
      newCurrentStreak = 0
    }

    const newLongestStreak = Math.max(streak.longest_streak, newCurrentStreak)

    const updatedStreak: Streak = {
      ...streak,
      current_streak: newCurrentStreak,
      last_activity_date: today,
      longest_streak: newLongestStreak
    }

    try {
      const { error } = await supabase
        .from('streaks')
        .update({
          current_streak: newCurrentStreak,
          last_activity_date: today,
          longest_streak: newLongestStreak
        })
        .eq('user_id', userId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating streak:', error)
      // Fallback to localStorage
      localStorage.setItem(`streak_${userId}`, JSON.stringify(updatedStreak))
    }

    setStreak(updatedStreak)
  }

  return {
    streak,
    loading,
    updateStreak,
    refetch: fetchStreak
  }
}