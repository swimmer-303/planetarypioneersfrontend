'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface LoadingScreenProps {
  isLoading: boolean
  onLoadingComplete: () => void
}

export default function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading) {
      setProgress(0)
      return
    }

    // Animate progress bar over 1 second
    const duration = 1000 // 1 second
    const interval = 16 // ~60fps
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            onLoadingComplete()
          }, 100) // Small delay to ensure smooth transition
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isLoading, onLoadingComplete])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-space-navy flex items-center justify-center">
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-purple-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="text-center z-10">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo-transparent.png"
            alt="Planetary Pioneers Logo"
            width={200}
            height={53}
            className="h-12 w-auto object-contain mx-auto"
          />
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-6">
          <span className="text-gradient">Exploring</span> the Cosmos
        </h2>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-4">
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-space-accent to-pink-500 h-full rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-gray-300 text-sm">
          {Math.round(progress)}%
        </p>

        {/* Loading Animation */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-space-accent rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
