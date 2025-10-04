'use client'

import Link from 'next/link'
import { ArrowRight, Brain, Space, Database, Star, Zap } from 'lucide-react'
import ExoplanetVisualization from '@/components/ExoplanetVisualization'
import { useLoading } from '@/components/LoadingProvider'

export default function HomePage() {
  const { startLoading } = useLoading()

  const handleNavigation = () => {
    startLoading()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Stars */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-purple-300 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Exoplanet</span>
              <br />
              <span className="text-white">Detection</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Machine learning platform for identifying exoplanets from NASA K2 data.
            </p>
            
            <div className="bg-space-navy/40 backdrop-blur-sm border border-space-purple/30 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
              <p className="text-gray-200 leading-relaxed">
                <strong className="text-white">What are exoplanets?</strong> Planets that orbit stars outside our Solar System. 
                They help us understand planet formation and search for habitable worlds beyond Earth.
                <Link href="/about" className="text-space-accent hover:text-pink-400 transition-colors duration-200 ml-1" onClick={handleNavigation}>
                  Learn more →
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/detection" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2" onClick={handleNavigation}>
                <Brain className="w-5 h-5" />
                <span>Start Detection</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/database" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 border-2 border-space-purple/50 hover:border-space-accent/50" onClick={handleNavigation}>
                <Database className="w-5 h-5" />
                <span>Explore Database</span>
              </Link>
            </div>

            {/* Interactive Exoplanet Visualization */}
            <div className="max-w-4xl mx-auto">
              <ExoplanetVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How <span className="text-gradient">Detection</span> Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our three-step process makes exoplanet detection accessible and accurate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-space-accent to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Data Input</h3>
              <p className="text-gray-300">
                Upload light curve data or connect to telescope feeds. 
                Our system accepts multiple data formats and sources.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ML Analysis</h3>
              <p className="text-gray-300">
                Advanced algorithms analyze the data for transit signals, 
                radial velocity variations, and other exoplanet indicators.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Results & Validation</h3>
              <p className="text-gray-300">
                Receive detailed reports with confidence scores, 
                orbital parameters, and recommendations for follow-up observations.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
