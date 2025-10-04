'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSupernova } from './SupernovaProvider'

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
  const { isSupernova, setIsSupernova, spaceDust, setSpaceDust } = useSupernova()

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
    const newClickCount = sunClicks + 1
    setSunClicks(newClickCount)
    
    if (newClickCount >= 5) {
      setIsSupernova(true)
      generateSpaceDust()
    }
  }

  const generateSpaceDust = () => {
    const dust = []
    for (let i = 0; i < 80; i++) {
      dust.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#3b82f6', '#8b5cf6', '#a855f7', '#6366f1', '#8b5cf6'][Math.floor(Math.random() * 12)]
      })
    }
    setSpaceDust(dust)
  }

  return (
    <div className="relative w-full h-96 bg-space-dark/50 rounded-2xl border border-space-purple/30 overflow-hidden">
      {/* Central Star */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <div
          className={`cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50 border-2 border-white/50 hover:scale-110 transition-transform animate-pulse ${
            isSupernova ? 'from-red-500 to-yellow-500 animate-spin' : ''
          }`}
          style={{
            width: Math.max(64, 32 + (sunClicks * 8)),
            height: Math.max(64, 32 + (sunClicks * 8)),
            minWidth: '64px',
            minHeight: '64px',
          }}
          onClick={handleSunClick}
        />
      </div>

      {/* Orbiting Planets - Hidden during supernova */}
      {!isSupernova && planets.map((planet, index) => (
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

      {/* Planet Info Panel - Hidden during supernova */}
      {!isSupernova && selectedPlanet && (
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


      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-white"></div>
      </div>
    </div>
  )
}
