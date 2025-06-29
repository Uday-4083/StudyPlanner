import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, Zap, History, Trophy } from 'lucide-react'

export function Navigation() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/planner', icon: Calendar, label: 'Planner' },
    { path: '/streak', icon: Zap, label: 'Streak' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/dashboard', icon: Trophy, label: 'Dashboard' },
  ]

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-b md:mb-8">
      <div className="max-w-md mx-auto md:max-w-6xl">
        <div className="flex justify-around items-center py-2 md:py-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive(path)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}