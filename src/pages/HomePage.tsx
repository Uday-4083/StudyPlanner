import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Zap, Target, TrendingUp } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6 animate-bounce-gentle">
            <BookOpen className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Study<span className="text-primary-600">Sprint</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your study habits with focused planning, streak tracking, and motivation that keeps you going.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-primary-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Daily Planning</h3>
            <p className="text-gray-600 text-sm">Organize up to 5 focused study tasks each day with subject tags and progress tracking.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-accent-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Streak Tracking</h3>
            <p className="text-gray-600 text-sm">Build momentum with daily study streaks and stay motivated with achievement badges.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-secondary-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Progress Insights</h3>
            <p className="text-gray-600 text-sm">Review your study history and track completion rates to improve your habits.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up">
          <Link
            to="/planner"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <BookOpen className="mr-2" size={20} />
            Start My Study Sprint
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            Join thousands of students improving their study habits
          </p>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">500+</div>
            <div className="text-gray-600 text-sm">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600">10k+</div>
            <div className="text-gray-600 text-sm">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">50+</div>
            <div className="text-gray-600 text-sm">Day Streaks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">95%</div>
            <div className="text-gray-600 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}