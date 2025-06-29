import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { AuthGuard } from './components/AuthGuard'
import { HomePage } from './pages/HomePage'
import { DailyPlannerPage } from './pages/DailyPlannerPage'
import { StreakTrackerPage } from './pages/StreakTrackerPage'
import { HistoryPage } from './pages/HistoryPage'
import { PublicDashboard } from './pages/PublicDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AuthGuard>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planner" element={<DailyPlannerPage />} />
              <Route path="/streak" element={<StreakTrackerPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/dashboard" element={<PublicDashboard />} />
            </Routes>
            <Navigation />
          </AuthGuard>
        </div>
      </div>
    </Router>
  )
}

export default App