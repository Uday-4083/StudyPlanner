import React, { useState, useEffect } from 'react'
import { Plus, X, Check } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import { useStreak } from '../hooks/useStreak'
import { SUBJECTS } from '../types'
import { ProgressBar } from '../components/ProgressBar'
import { QuoteBox } from '../components/QuoteBox'

export function DailyPlannerPage() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks()
  const { updateStreak } = useStreak()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskSubject, setNewTaskSubject] = useState<string>(SUBJECTS[0])
  const [isAddingTask, setIsAddingTask] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const todaysTasks = tasks.filter(task => task.date === today)
  const completedTasks = todaysTasks.filter(task => task.completed)

  useEffect(() => {
    updateStreak(completedTasks.length)
  }, [completedTasks.length, updateStreak])

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim() || todaysTasks.length >= 5) return

    await addTask(newTaskTitle.trim(), newTaskSubject)
    setNewTaskTitle('')
    setIsAddingTask(false)
  }

  const handleToggleTask = async (taskId: string) => {
    await toggleTask(taskId)
  }

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Planner</h1>
        <p className="text-gray-600">Plan your study sprint for today</p>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h2>
        <ProgressBar 
          current={completedTasks.length} 
          total={todaysTasks.length}
          className="mb-4"
        />
        {todaysTasks.length === 0 && (
          <p className="text-gray-500 text-center py-4">Add your first task to get started!</p>
        )}
      </div>

      {/* Add Task Section */}
      {todaysTasks.length < 5 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          {!isAddingTask ? (
            <button
              onClick={() => setIsAddingTask(true)}
              className="w-full flex items-center justify-center py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Study Task ({todaysTasks.length}/5)
            </button>
          ) : (
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Description
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g., Complete Chapter 5 exercises"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                  maxLength={100}
                />
              </div>
              <div>
                <label htmlFor="task-subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="task-subject"
                  value={newTaskSubject}
                  onChange={(e) => setNewTaskSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingTask(false)
                    setNewTaskTitle('')
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tasks List */}
      {todaysTasks.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {todaysTasks.map((task) => (
              <div key={task.id} className="p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors">
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-accent-500 border-accent-500 text-white'
                      : 'border-gray-300 hover:border-accent-500'
                  }`}
                >
                  {task.completed && <Check size={14} />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">{task.subject}</p>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Quote */}
      <QuoteBox className="mb-6" />

      {/* Task Limit Notice */}
      {todaysTasks.length >= 5 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <p className="text-amber-800 font-medium">Daily task limit reached!</p>
          <p className="text-amber-700 text-sm mt-1">
            Focus on completing your current tasks for maximum productivity.
          </p>
        </div>
      )}
    </div>
  )
}