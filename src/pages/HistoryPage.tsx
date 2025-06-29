import React from 'react'
import { Calendar, TrendingUp, BookOpen } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import { DailyStats } from '../types'

export function HistoryPage() {
  const { tasks, loading } = useTasks()

  const getLast7Days = (): DailyStats[] => {
    const days: DailyStats[] = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split('T')[0]
      
      const dayTasks = tasks.filter(task => task.date === dateString)
      const completedTasks = dayTasks.filter(task => task.completed)
      
      days.push({
        date: dateString,
        total_tasks: dayTasks.length,
        completed_tasks: completedTasks.length,
        completion_percentage: dayTasks.length > 0 ? Math.round((completedTasks.length / dayTasks.length) * 100) : 0
      })
    }
    
    return days
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today'
    }
    if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday'
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (percentage >= 60) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    if (percentage > 0) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const last7Days = getLast7Days()
  const totalTasks = last7Days.reduce((sum, day) => sum + day.total_tasks, 0)
  const totalCompleted = last7Days.reduce((sum, day) => sum + day.completed_tasks, 0)
  const averageCompletion = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study History</h1>
        <p className="text-gray-600">Review your past 7 days of study activity</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <BookOpen className="mx-auto mb-2 text-primary-500" size={20} />
          <div className="text-xl font-bold text-gray-900">{totalTasks}</div>
          <div className="text-xs text-gray-600">Total Tasks</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <Calendar className="mx-auto mb-2 text-accent-500" size={20} />
          <div className="text-xl font-bold text-gray-900">{totalCompleted}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <TrendingUp className="mx-auto mb-2 text-secondary-500" size={20} />
          <div className="text-xl font-bold text-gray-900">{averageCompletion}%</div>
          <div className="text-xs text-gray-600">Avg. Rate</div>
        </div>
      </div>

      {/* Daily History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Daily Breakdown</h2>
        </div>
        
        {last7Days.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No study history yet</p>
            <p className="text-sm text-gray-400 mt-1">Start adding tasks to see your progress!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {last7Days.map((day) => (
              <div key={day.date} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{formatDate(day.date)}</div>
                    <div className="text-sm text-gray-500">
                      {day.total_tasks > 0 ? `${day.completed_tasks}/${day.total_tasks} tasks` : 'No tasks'}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getCompletionColor(day.completion_percentage)}`}>
                    {day.completion_percentage}%
                  </div>
                </div>
                
                {day.total_tasks > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${day.completion_percentage}%` }}
                    />
                  </div>
                )}
                
                {day.total_tasks === 0 && (
                  <div className="text-sm text-gray-400 italic">Rest day</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Insights */}
      {totalTasks > 0 && (
        <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
          <h3 className="font-semibold text-gray-900 mb-3">Weekly Insights</h3>
          <div className="space-y-2 text-sm">
            {averageCompletion >= 80 && (
              <p className="text-green-700">🎉 Excellent week! You're maintaining a high completion rate.</p>
            )}
            {averageCompletion >= 60 && averageCompletion < 80 && (
              <p className="text-blue-700">👍 Good consistency! Try to push for that 80% completion rate.</p>
            )}
            {averageCompletion >= 40 && averageCompletion < 60 && (
              <p className="text-yellow-700">📈 Room for improvement. Focus on completing more of your planned tasks.</p>
            )}
            {averageCompletion < 40 && averageCompletion > 0 && (
              <p className="text-orange-700">💪 Keep going! Consider planning fewer tasks to improve your completion rate.</p>
            )}
            
            <p className="text-gray-600 mt-2">
              You've planned {totalTasks} tasks this week and completed {totalCompleted} of them.
              {averageCompletion < 100 && " Every completed task is progress!"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}