export interface Task {
  id: string
  title: string
  subject: string
  completed: boolean
  date: string
  created_at: string
  user_id: string
}

export interface Streak {
  id: string
  user_id: string
  current_streak: number
  last_activity_date: string
  longest_streak: number
  created_at: string
}

export interface DailyStats {
  date: string
  total_tasks: number
  completed_tasks: number
  completion_percentage: number
}

export const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Foreign Language',
  'Art',
  'Music',
  'Other'
] as const

export type Subject = typeof SUBJECTS[number]