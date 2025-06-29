import React from 'react'
import { Trophy, Target, Zap, BookOpen, Award, Star } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import { useStreak } from '../hooks/useStreak'

export function PublicDashboard() {
  const { tasks } = useTasks()
  const { streak } = useStreak()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const getBadges = () => {
    const badges = []
    
    if ((streak?.current_streak || 0) >= 1) {
      badges.push({ name: 'Streak Starter', icon: '🌱', description: 'Started your first streak' })
    }
    if ((streak?.current_streak || 0) >= 7) {
      badges.push({ name: 'Weekly Warrior', icon: '⭐', description: '7 day streak achieved' })
    }
    if ((streak?.current_streak || 0) >= 14) {
      badges.push({ name: 'Study Champion', icon: '🔥', description: '14 day streak achieved' })
    }
    if ((streak?.current_streak || 0) >= 30) {
      badges.push({ name: 'Streak Master', icon: '🏆', description: '30 day streak achieved' })
    }
    if (completedTasks >= 10) {
      badges.push({ name: 'Task Crusher', icon: '💪', description: '10+ tasks completed' })
    }
    if (completedTasks >= 50) {
      badges.push({ name: 'Study Machine', icon: '🚀', description: '50+ tasks completed' })
    }
    if (completionRate >= 80) {
      badges.push({ name: 'Perfectionist', icon: '✨', description: '80%+ completion rate' })
    }
    
    return badges
  }

  const badges = getBadges()

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
          <Trophy className="text-white" size={24} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Achievement Dashboard</h1>
        <p className="text-gray-600">Showcase your study progress and achievements</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white text-center">
          <Zap className="mx-auto mb-2" size={24} />
          <div className="text-3xl font-bold">{streak?.current_streak || 0}</div>
          <div className="text-primary-100">Day Streak</div>
        </div>
        
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white text-center">
          <Target className="mx-auto mb-2" size={24} />
          <div className="text-3xl font-bold">{completedTasks}</div>
          <div className="text-accent-100">Tasks Completed</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <BookOpen className="mx-auto mb-2 text-secondary-500" size={20} />
          <div className="text-xl font-bold text-gray-900">{totalTasks}</div>
          <div className="text-xs text-gray-600">Total Tasks</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <Star className="mx-auto mb-2 text-yellow-500" size={20} />
          <div className="text-xl font-bold text-gray-900">{completionRate}%</div>
          <div className="text-xs text-gray-600">Success Rate</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <Award className="mx-auto mb-2 text-purple-500" size={20} />
          <div className="text-xl font-bold text-gray-900">{streak?.longest_streak || 0}</div>
          <div className="text-xs text-gray-600">Best Streak</div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="mr-2 text-yellow-500" size={20} />
          Achievement Badges
        </h2>
        
        {badges.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-500">No badges earned yet</p>
            <p className="text-sm text-gray-400 mt-1">Complete tasks and build streaks to unlock badges!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-primary-50 rounded-lg border border-gray-200">
                <span className="text-2xl mr-3">{badge.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">{badge.name}</div>
                  <div className="text-xs text-gray-600 truncate">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Study Level */}
      <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-6 border border-secondary-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Study Level</h2>
        
        {completedTasks < 5 && (
          <div className="text-center">
            <div className="text-3xl mb-2">🌱</div>
            <div className="text-xl font-bold text-gray-900">Beginner</div>
            <div className="text-gray-600">Just getting started on your study journey!</div>
          </div>
        )}
        
        {completedTasks >= 5 && completedTasks < 25 && (
          <div className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-xl font-bold text-gray-900">Student</div>
            <div className="text-gray-600">Building good study habits!</div>
          </div>
        )}
        
        {completedTasks >= 25 && completedTasks < 50 && (
          <div className="text-center">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-xl font-bold text-gray-900">Scholar</div>
            <div className="text-gray-600">Dedicated to learning and growth!</div>
          </div>
        )}
        
        {completedTasks >= 50 && (
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-xl font-bold text-gray-900">Study Master</div>
            <div className="text-gray-600">A true champion of consistent learning!</div>
          </div>
        )}
      </div>

      {/* Motivational Message */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
        <h3 className="font-semibold text-gray-900 mb-2">Keep Going!</h3>
        <p className="text-gray-600 text-sm">
          {completedTasks === 0 
            ? "Start your study journey today!"
            : `You've completed ${completedTasks} tasks and built a ${streak?.current_streak || 0} day streak. Every step counts!`
          }
        </p>
        {streak?.current_streak === 0 && completedTasks > 0 && (
          <p className="text-amber-600 text-sm mt-2">
            Complete a task today to restart your streak! 🔥
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          Built with <span className="text-red-500">♥</span> using{' '}
          <a 
            href="https://bolt.new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Bolt.new
          </a>
        </p>
      </div>
    </div>
  )
}