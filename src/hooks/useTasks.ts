import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Task } from '../types'
import { useAuth } from './useAuth'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    if (userId) {
      fetchTasks()
    }
  }, [userId])

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      // Fallback to localStorage for demo
      const localTasks = localStorage.getItem(`tasks_${userId}`)
      if (localTasks) {
        setTasks(JSON.parse(localTasks))
      }
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title: string, subject: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      subject,
      completed: false,
      date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      user_id: userId
    }

    try {
      const { error } = await supabase.from('tasks').insert([newTask])
      if (error) throw error
    } catch (error) {
      console.error('Error adding task:', error)
      // Fallback to localStorage
      const updatedTasks = [newTask, ...tasks]
      localStorage.setItem(`tasks_${userId}`, JSON.stringify(updatedTasks))
    }

    setTasks(prev => [newTask, ...prev])
  }

  const toggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const updatedTask = { ...task, completed: !task.completed }

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: updatedTask.completed })
        .eq('id', taskId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating task:', error)
      // Fallback to localStorage
      const updatedTasks = tasks.map(t => t.id === taskId ? updatedTask : t)
      localStorage.setItem(`tasks_${userId}`, JSON.stringify(updatedTasks))
    }

    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t))
  }

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId)
      if (error) throw error
    } catch (error) {
      console.error('Error deleting task:', error)
      // Fallback to localStorage
      const updatedTasks = tasks.filter(t => t.id !== taskId)
      localStorage.setItem(`tasks_${userId}`, JSON.stringify(updatedTasks))
    }

    setTasks(prev => prev.filter(t => t.id !== taskId))
  }

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    refetch: fetchTasks
  }
}