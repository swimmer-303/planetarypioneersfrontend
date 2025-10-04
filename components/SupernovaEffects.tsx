'use client'

import { motion } from 'framer-motion'
import { useSupernova } from './SupernovaProvider'

export default function SupernovaEffects() {
  const { isSupernova, spaceDust } = useSupernova()

  if (!isSupernova) return null

  return (
    <>
      {/* Site-wide Space Dust */}
      {spaceDust.map((dust) => (
        <motion.div
          key={dust.id}
          className="fixed rounded-full opacity-80 pointer-events-none z-50"
          style={{
            left: `${dust.x}vw`,
            top: `${dust.y}vh`,
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
      
      {/* Site-wide Cosmic Cloud Effects */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255, 100, 0, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.18) 0%, transparent 45%)',
            'radial-gradient(circle at 70% 20%, rgba(255, 200, 0, 0.2) 0%, transparent 60%), radial-gradient(circle at 30% 80%, rgba(37, 99, 235, 0.25) 0%, transparent 55%), radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.22) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%), radial-gradient(circle at 10% 60%, rgba(29, 78, 216, 0.2) 0%, transparent 45%), radial-gradient(circle at 90% 40%, rgba(139, 92, 246, 0.18) 0%, transparent 40%)',
            'radial-gradient(circle at 40% 10%, rgba(255, 100, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.18) 0%, transparent 45%)'
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Additional Blue-Purple Cosmic Clouds */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-39"
        animate={{
          background: [
            'radial-gradient(ellipse at 25% 25%, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 60%)',
            'radial-gradient(ellipse at 75% 75%, rgba(37, 99, 235, 0.25) 0%, rgba(168, 85, 247, 0.3) 40%, transparent 70%)',
            'radial-gradient(ellipse at 50% 10%, rgba(29, 78, 216, 0.2) 0%, rgba(139, 92, 246, 0.25) 35%, transparent 65%)',
            'radial-gradient(ellipse at 10% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 60%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      
      {/* Site-wide Explosion Shockwave */}
      <motion.div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-45"
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

      {/* Supernova Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-4 right-4 bg-red-900/80 backdrop-blur-sm border border-red-500/50 rounded-lg px-4 py-3 text-center z-50"
      >
        <div className="text-red-200 font-bold text-lg">🌟 SUPERNOVA! 🌟</div>
        <div className="text-red-300 text-sm">The star has exploded across the universe! Refresh to reset.</div>
      </motion.div>
    </>
  )
}
