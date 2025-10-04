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

  return (
    <div className="relative w-full h-96 bg-space-dark/50 rounded-2xl border border-space-purple/30 overflow-hidden">
      {/* Central Star */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(255, 193, 7, 0.5)',
              '0 0 40px rgba(255, 193, 7, 0.8)',
              '0 0 20px rgba(255, 193, 7, 0.5)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Orbiting Planets */}
      {planets.map((planet, index) => (
        <motion.div
          key={planet.id}
          className="absolute top-1/2 left-1/2 pointer-events-none"
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

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-white"></div>
      </div>
    </div>
  )
}
