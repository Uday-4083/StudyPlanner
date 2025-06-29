import React, { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'

const MOTIVATIONAL_QUOTES = [
  "Success is the sum of small efforts repeated day in and day out.",
  "The expert in anything was once a beginner.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it's done.",
  "Education is the most powerful weapon which you can use to change the world.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is walking from failure to failure with no loss of enthusiasm."
]

interface QuoteBoxProps {
  type?: 'motivation' | 'tip'
  className?: string
}

export function QuoteBox({ type = 'motivation', className = '' }: QuoteBoxProps) {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    // Set a stable quote that only changes when component mounts
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
    setQuote(randomQuote)
  }, []) // Empty dependency array ensures this only runs once

  return (
    <div className={`bg-gradient-to-r from-accent-50 to-primary-50 border border-accent-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <Quote className="text-accent-600 mt-1 flex-shrink-0" size={20} />
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">
            {type === 'motivation' ? 'Daily Motivation' : 'Study Tip'}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{quote}</p>
        </div>
      </div>
    </div>
  )
}