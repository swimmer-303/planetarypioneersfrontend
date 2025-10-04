'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Stat {
  label: string
  value: number
  suffix: string
  description: string
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Exoplanets Detected', value: 0, suffix: '+', description: 'Confirmed discoveries' },
    { label: 'Data Points Analyzed', value: 0, suffix: 'M', description: 'Light curve measurements' },
    { label: 'Accuracy Rate', value: 0, suffix: '%', description: 'ML model precision' },
    { label: 'Active Users', value: 0, suffix: '+', description: 'Researchers worldwide' }
  ])

  const targetStats: Stat[] = [
    { label: 'Exoplanets Detected', value: 5432, suffix: '+', description: 'Confirmed discoveries' },
    { label: 'Data Points Analyzed', value: 125, suffix: 'M', description: 'Light curve measurements' },
    { label: 'Accuracy Rate', value: 94.7, suffix: '%', description: 'ML model precision' },
    { label: 'Active Users', value: 2847, suffix: '+', description: 'Researchers worldwide' }
  ]

  useEffect(() => {
    const animateStats = () => {
      setStats(prevStats => 
        prevStats.map((stat, index) => {
          const target = targetStats[index]
          const increment = target.value / 100
          
          if (stat.value < target.value) {
            return {
              ...stat,
              value: Math.min(stat.value + increment, target.value)
            }
          }
          return stat
        })
      )
    }

    const interval = setInterval(animateStats, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-r from-space-purple/10 to-space-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Platform <span className="text-gradient">Statistics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform has processed millions of data points and helped discover 
            thousands of exoplanets worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {Math.floor(stat.value).toLocaleString()}{stat.suffix}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-400 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-space-navy/50 px-6 py-3 rounded-full border border-space-purple/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Platform Status: Active</span>
          </div>
        </div>
      </div>
    </section>
  )
}
