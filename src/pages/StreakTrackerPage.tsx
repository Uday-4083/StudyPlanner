import React from 'react'
import { Zap, Trophy, Target, Calendar } from 'lucide-react'
import { useStreak } from '../hooks/useStreak'
import { useTasks } from '../hooks/useTasks'
import { QuoteBox } from '../components/QuoteBox'

export function StreakTrackerPage() {
  const { streak, loading } = useStreak()
  const { tasks } = useTasks()

  const today = new Date().toISOString().split('T')[0]
  const todaysTasks = tasks.filter(task => task.date === today)
  const completedToday = todaysTasks.filter(task => task.completed).length

  const getStreakMessage = () => {
    if (!streak) return { title: "Getting Started", message: "Complete your first task to start your streak!" }
    
    if (streak.current_streak === 0) {
      return { 
        title: "Ready to Start", 
        message: "Complete a task today to begin your study streak!" 
      }
    }
    
    if (streak.current_streak === 1) {
      return { 
        title: "Great Start!", 
        message: "You've started your streak! Keep it going tomorrow." 
      }
    }
    
    if (streak.current_streak < 7) {
      return { 
        title: "Building Momentum", 
        message: `${streak.current_streak} days strong! You're building a great habit.` 
      }
    }
    
    if (streak.current_streak < 30) {
      return { 
        title: "Impressive Streak!", 
        message: `${streak.current_streak} days of consistent studying. You're on fire! 🔥` 
      }
    }
    
    return { 
      title: "Streak Master!", 
      message: `${streak.current_streak} days! You're a study champion! 🏆` 
    }
  }

  const getStreakBadge = () => {
    if (!streak) return null
    
    if (streak.current_streak >= 30) return { emoji: "🏆", name: "Champion", color: "text-yellow-500" }
    if (streak.current_streak >= 14) return { emoji: "🔥", name: "On Fire", color: "text-red-500" }
    if (streak.current_streak >= 7) return { emoji: "⭐", name: "Star", color: "text-blue-500" }
    if (streak.current_streak >= 3) return { emoji: "🚀", name: "Rising", color: "text-purple-500" }
    if (streak.current_streak >= 1) return { emoji: "🌱", name: "Growing", color: "text-green-500" }
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const streakMessage = getStreakMessage()
  const badge = getStreakBadge()

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Streak Tracker</h1>
        <p className="text-gray-600">Track your study consistency and build momentum</p>
      </div>

      {/* Current Streak Card */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white mb-6 shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap size={32} className="text-yellow-300" />
          </div>
          <div className="text-5xl font-bold mb-2">{streak?.current_streak || 0}</div>
          <div className="text-xl font-semibold mb-1">Day Streak</div>
          <div className="text-primary-100">{streakMessage.title}</div>
        </div>
      </div>

      {/* Streak Message */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{streakMessage.title}</h2>
          <p className="text-gray-600">{streakMessage.message}</p>
          {badge && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-gray-50 rounded-full">
              <span className="text-2xl mr-2">{badge.emoji}</span>
              <span className={`font-semibold ${badge.color}`}>{badge.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <Trophy className="mx-auto mb-2 text-yellow-500" size={24} />
          <div className="text-2xl font-bold text-gray-900">{streak?.longest_streak || 0}</div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <Target className="mx-auto mb-2 text-accent-500" size={24} />
          <div className="text-2xl font-bold text-gray-900">{completedToday}</div>
          <div className="text-sm text-gray-600">Completed Today</div>
        </div>
      </div>

      {/* Today's Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center mb-4">
          <Calendar className="text-primary-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Today's Status</h2>
        </div>
        
        {todaysTasks.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-2">No tasks planned for today</p>
            <p className="text-sm text-gray-400">Add some tasks to your daily planner to maintain your streak!</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-600">{completedToday}/{todaysTasks.length} tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${todaysTasks.length > 0 ? (completedToday / todaysTasks.length) * 100 : 0}%` }}
              />
            </div>
            {completedToday === 0 && (
              <p className="text-sm text-amber-600 mt-2">
                Complete at least one task today to maintain your streak!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Motivational Quote */}
      {(streak?.current_streak === 0 || completedToday === 0) && (
        <QuoteBox type="motivation" />
      )}

      {/* Streak Milestones */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Streak Milestones</h2>
        <div className="space-y-3">
          <div className={`flex items-center p-3 rounded-lg ${(streak?.current_streak || 0) >= 3 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            <span className="text-xl mr-3">🚀</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Rising Star</div>
              <div className="text-sm text-gray-600">3 day streak</div>
            </div>
            {(streak?.current_streak || 0) >= 3 && <div className="text-green-600 font-semibold">Unlocked!</div>}
          </div>
          
          <div className={`flex items-center p-3 rounded-lg ${(streak?.current_streak || 0) >= 7 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            <span className="text-xl mr-3">⭐</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Weekly Champion</div>
              <div className="text-sm text-gray-600">7 day streak</div>
            </div>
            {(streak?.current_streak || 0) >= 7 && <div className="text-green-600 font-semibold">Unlocked!</div>}
          </div>
          
          <div className={`flex items-center p-3 rounded-lg ${(streak?.current_streak || 0) >= 14 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            <span className="text-xl mr-3">🔥</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">On Fire</div>
              <div className="text-sm text-gray-600">14 day streak</div>
            </div>
            {(streak?.current_streak || 0) >= 14 && <div className="text-green-600 font-semibold">Unlocked!</div>}
          </div>
          
          <div className={`flex items-center p-3 rounded-lg ${(streak?.current_streak || 0) >= 30 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            <span className="text-xl mr-3">🏆</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Study Champion</div>
              <div className="text-sm text-gray-600">30 day streak</div>
            </div>
            {(streak?.current_streak || 0) >= 30 && <div className="text-green-600 font-semibold">Unlocked!</div>}
          </div>
        </div>
      </div>
    </div>
  )
}