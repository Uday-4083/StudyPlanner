import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthModal } from './AuthModal'
import { User, LogOut } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading, user, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to StudySprint</h1>
          <p className="text-gray-600 mb-8">
            Sign in to track your study progress, build streaks, and achieve your learning goals.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
          >
            Get Started
          </button>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    )
  }

  return (
    <div className="relative">
      {/* User Menu */}
      <div className="absolute top-4 right-4 z-40">
        <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
          <User size={16} className="text-gray-600" />
          <span className="text-sm text-gray-700 truncate max-w-32">
            {user?.email}
          </span>
          <button
            onClick={signOut}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
      
      {children}
    </div>
  )
}