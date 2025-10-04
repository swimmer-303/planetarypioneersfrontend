'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Planet {
  id: number
  name: string
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
  distance: number
}

export default function ExoplanetVisualization() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const [sunClicks, setSunClicks] = useState(0)
  const [isSupernova, setIsSupernova] = useState(false)
  const [spaceDust, setSpaceDust] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([])

  useEffect(() => {
    // Generate sample exoplanets
    const samplePlanets: Planet[] = [
      {
        id: 1,
        name: 'Kepler-452b',
        size: 12,
        color: '#4a90e2',
        orbitRadius: 80,
        orbitSpeed: 20,
        distance: 1400
      },
      {
        id: 2,
        name: 'Proxima Centauri b',
        size: 8,
        color: '#cd5c5c',
        orbitRadius: 120,
        orbitSpeed: 15,
        distance: 4.2
      },
      {
        id: 3,
        name: 'TRAPPIST-1e',
        size: 10,
        color: '#daa520',
        orbitRadius: 160,
        orbitSpeed: 12,
        distance: 40
      },
      {
        id: 4,
        name: 'HD 209458 b',
        size: 14,
        color: '#4169e1',
        orbitRadius: 200,
        orbitSpeed: 8,
        distance: 150
      }
    ]
    setPlanets(samplePlanets)
  }, [])

  const handleSunClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Sun clicked!', sunClicks + 1)
    alert(`Sun clicked! Count: ${sunClicks + 1}`)
    const newClickCount = sunClicks + 1
    setSunClicks(newClickCount)
    
    if (newClickCount >= 5) {
      setIsSupernova(true)
      generateSpaceDust()
    }
  }

  const generateSpaceDust = () => {
    const dust = []
    for (let i = 0; i < 50; i++) {
      dust.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)]
      })
    }
    setSpaceDust(dust)
  }

  return (
    <div className="relative w-full h-96 bg-space-dark/50 rounded-2xl border border-space-purple/30 overflow-hidden">
      {/* Debug Test Button */}
      <button 
        onClick={handleSunClick}
        className="absolute top-2 left-2 z-50 bg-red-500 text-white px-2 py-1 text-xs rounded"
      >
        Test Click
      </button>
      {/* Central Star */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
          className={`cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50 border-2 border-white/50 ${
            isSupernova ? 'from-red-500 to-yellow-500' : ''
          }`}
          style={{
            width: Math.max(64, 32 + (sunClicks * 8)),
            height: Math.max(64, 32 + (sunClicks * 8)),
            minWidth: '64px',
            minHeight: '64px',
          }}
          animate={isSupernova ? {
            scale: [1, 2, 3, 4, 5],
            rotate: [0, 180, 360],
            boxShadow: [
              '0 0 50px rgba(255, 0, 0, 0.8)',
              '0 0 100px rgba(255, 100, 0, 1)',
              '0 0 150px rgba(255, 200, 0, 1)',
              '0 0 200px rgba(255, 255, 0, 1)',
              '0 0 300px rgba(255, 255, 255, 1)'
            ]
          } : {
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(255, 193, 7, 0.5)',
              '0 0 40px rgba(255, 193, 7, 0.8)',
              '0 0 20px rgba(255, 193, 7, 0.5)'
            ],
            opacity: [0.8, 1, 0.8]
          }}
          transition={isSupernova ? {
            duration: 2,
            ease: 'easeOut'
          } : {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          onClick={handleSunClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Orbiting Planets */}
      {planets.map((planet, index) => (
        <motion.div
          key={planet.id}
          className="absolute top-1/2 left-1/2 pointer-events-none z-10"
          style={{
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            marginTop: -planet.orbitRadius,
            marginLeft: -planet.orbitRadius,
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: planet.orbitSpeed,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 cursor-pointer pointer-events-auto"
            style={{
              width: planet.size,
              height: planet.size,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedPlanet(planet)}
          >
            <div
              className="w-full h-full rounded-full shadow-lg"
              style={{
                backgroundColor: planet.color,
                boxShadow: `0 0 20px ${planet.color}50`
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Space Dust and Cosmic Clouds during Supernova */}
      {isSupernova && (
        <>
          {/* Animated Space Dust */}
          {spaceDust.map((dust) => (
            <motion.div
              key={dust.id}
              className="absolute rounded-full opacity-80"
              style={{
                left: `${dust.x}%`,
                top: `${dust.y}%`,
                width: dust.size,
                height: dust.size,
                backgroundColor: dust.color,
                boxShadow: `0 0 ${dust.size * 2}px ${dust.color}`
              }}
              animate={{
                scale: [0, 1, 1.5, 0],
                rotate: [0, 360],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
          
          {/* Cosmic Cloud Effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(255, 100, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(255, 200, 0, 0.2) 0%, transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(255, 100, 0, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          {/* Explosion Shockwave */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{
              scale: [0, 5, 10],
              opacity: [1, 0.5, 0]
            }}
            transition={{
              duration: 2,
              ease: 'easeOut'
            }}
          >
            <div className="w-32 h-32 border-2 border-yellow-400 rounded-full opacity-50"></div>
          </motion.div>
        </>
      )}

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-space-navy/90 backdrop-blur-sm border border-space-purple/30 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">{selectedPlanet.name}</h3>
              <p className="text-gray-300 text-sm">
                Distance: {selectedPlanet.distance} light years
              </p>
            </div>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Click Counter */}
      {sunClicks > 0 && !isSupernova && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-space-navy/80 backdrop-blur-sm border border-space-purple/30 rounded-lg px-3 py-2 text-sm text-white"
        >
          Sun clicks: {sunClicks}/5
        </motion.div>
      )}

      {/* Supernova Message */}
      {isSupernova && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 right-4 bg-red-900/80 backdrop-blur-sm border border-red-500/50 rounded-lg px-4 py-3 text-center"
        >
          <div className="text-red-200 font-bold text-lg">🌟 SUPERNOVA! 🌟</div>
          <div className="text-red-300 text-sm">The star has exploded! Refresh to reset.</div>
        </motion.div>
      )}

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-white"></div>
      </div>
    </div>
  )
}
