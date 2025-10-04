'use client'

import { useState, useEffect } from 'react'
import { Lock, Eye, EyeOff, Cookie } from 'lucide-react'

interface PinAuthProps {
  onSuccess: () => void
}

export default function PinAuth({ onSuccess }: PinAuthProps) {
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [hasCookie, setHasCookie] = useState(false)
  const [cookiesEnabled, setCookiesEnabled] = useState(false)
  
  // Default PIN - you can change this
  const CORRECT_PIN = '2014'
  const MAX_ATTEMPTS = 3

  useEffect(() => {
    // Check if cookies are enabled
    const testCookie = 'cookie-test=' + Math.random()
    document.cookie = testCookie
    const cookiesWork = document.cookie.indexOf(testCookie) !== -1
    setCookiesEnabled(cookiesWork)
    
    // Check if user has the "punishment cookie"
    const punishmentCookie = document.cookie.includes('punishment-cookie=true')
    setHasCookie(punishmentCookie)
    
    // Clean up test cookie
    document.cookie = testCookie + '; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!cookiesEnabled) {
      setError('Cookies are required to access this application. Please enable cookies and refresh the page.')
      return
    }
    
    if (hasCookie) {
      setError('You have been given a cookie! Access denied.')
      return
    }
    
    if (pin === CORRECT_PIN) {
      onSuccess()
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      if (newAttempts >= MAX_ATTEMPTS) {
        // Give them a punishment cookie
        document.cookie = 'punishment-cookie=true; path=/; max-age=86400' // 24 hours
        setHasCookie(true)
        setError('ACCESS DENIED LOL U SUCK')
      } else {
        setError(`really thought u found something huh? ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
      }
      setPin('')
    }
  }

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Only allow digits
    if (value.length <= 4) {
      setPin(value)
      setError('')
    }
  }

  // Show punishment screen
  if (hasCookie) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              ACCESS DENIED LOL U SUCK
            </h1>
            <p className="text-gray-400 mb-8">
              Try again later... maybe
            </p>
            
            <div className="bg-red-400/20 border border-red-400/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                System locked. No further attempts allowed.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show cookies required screen
  if (!cookiesEnabled) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Cookies Required
            </h1>
            <p className="text-gray-400 mb-8">
              This application requires cookies to function. Please enable cookies and refresh the page.
            </p>
            
            <div className="bg-red-400/20 border border-red-400/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                Enable cookies in your browser settings to continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-space-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            really thought u found something huh?
          </h1>
          <p className="text-gray-400 mb-8">
            Enter PIN to access the application
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter 4-digit PIN"
                className="w-full bg-space-navy border border-space-purple/30 rounded-lg px-4 py-3 pr-12 text-white text-center text-2xl tracking-widest placeholder-gray-500 focus:outline-none focus:border-space-accent"
                maxLength={4}
                autoComplete="off"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={pin.length !== 4 || attempts >= MAX_ATTEMPTS}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Access Application
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
