'use client'

import { useState } from 'react'
import { Play, Download, Settings, BarChart3, Zap, CheckCircle, Database } from 'lucide-react'
import DetectionResults from '@/components/DetectionResults'

interface ExoplanetInput {
  num_stars: number
  num_planets: number
  disc_facility: string
  orbital_period: number
  planet_radius: number
  st_spectype: number
  stellar_temp: number
  stellar_radius: number
  stellar_mass: number
  stellar_surface_gravity: number
  right_ascension: number
  declination: number
  system_distance: number
  sy_vmag: number
  sy_kmag: number
}

export default function DetectionPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState<ExoplanetInput>({
    num_stars: 1,
    num_planets: 1,
    disc_facility: 'K2',
    orbital_period: 10,
    planet_radius: 1,
    st_spectype: 0,
    stellar_temp: 5000,
    stellar_radius: 1,
    stellar_mass: 1,
    stellar_surface_gravity: 4.5,
    right_ascension: 0,
    declination: 0,
    system_distance: 100,
    sy_vmag: 10,
    sy_kmag: 9
  })
  const [prediction, setPrediction] = useState<string>('')


  const handleAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simulate ML analysis with form data
    setTimeout(() => {
      // Simple heuristic-based prediction for demonstration
      const { orbital_period, planet_radius, stellar_temp, stellar_radius } = formData
      
      let predictedClass = 'CANDIDATE'
      
      // Simple rules for demonstration
      if (orbital_period > 50 && planet_radius > 2 && stellar_temp > 4000) {
        predictedClass = 'CONFIRMED'
      } else if (orbital_period < 1 || planet_radius < 0.5) {
        predictedClass = 'REFUTED'
      } else if (stellar_temp < 3000 || stellar_radius > 5) {
        predictedClass = 'FALSE POSITIVE'
      }
      
      setPrediction(predictedClass)
      setIsAnalyzing(false)
      setShowResults(true)
    }, 2000)
  }

  const handleInputChange = (field: keyof ExoplanetInput, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-space-navy via-space-navy to-space-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-space-accent to-space-purple rounded-full mb-6">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            ML <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Detection</span> Engine
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Enter exoplanet parameters to classify whether it's <span className="text-green-400 font-semibold">confirmed</span>, <span className="text-yellow-400 font-semibold">candidate</span>, 
            <span className="text-red-400 font-semibold"> refuted</span>, or a <span className="text-orange-400 font-semibold">false positive</span> using advanced machine learning algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Panel - Form & Controls */}
          <div className="space-y-6 flex flex-col">
            {/* Exoplanet Input Form */}
            <div className="card bg-gradient-to-br from-space-navy/90 to-space-purple/10 border border-space-purple/30 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-space-accent to-space-purple rounded-lg flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Exoplanet Parameters</h2>
                  <p className="text-gray-400 text-sm">Enter the astronomical data for classification</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* System Parameters */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-space-accent rounded-full"></div>
                    <h3 className="text-white font-semibold">System Parameters</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Number of Stars</label>
                      <input
                        type="number"
                        value={formData.num_stars}
                        onChange={(e) => handleInputChange('num_stars', parseInt(e.target.value) || 1)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="1"
                        max="10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Number of Planets</label>
                  <input
                        type="number"
                        value={formData.num_planets}
                        onChange={(e) => handleInputChange('num_planets', parseInt(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="0"
                        max="10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-gray-300 text-sm font-medium">Discovery Facility</label>
                    <select
                      value={formData.disc_facility}
                      onChange={(e) => handleInputChange('disc_facility', e.target.value)}
                      className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                    >
                      <option value="K2">K2</option>
                      <option value="Kepler">Kepler</option>
                      <option value="TESS">TESS</option>
                      <option value="Ground">Ground-based</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Planetary Parameters */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <h3 className="text-white font-semibold">Planetary Parameters</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Orbital Period (days)</label>
                      <input
                        type="number"
                        value={formData.orbital_period}
                        onChange={(e) => handleInputChange('orbital_period', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="0.1"
                        step="0.1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Planet Radius (R⊕)</label>
                      <input
                        type="number"
                        value={formData.planet_radius}
                        onChange={(e) => handleInputChange('planet_radius', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="0.1"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>

                {/* Stellar Parameters */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <h3 className="text-white font-semibold">Stellar Parameters</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Stellar Temperature (K)</label>
                      <input
                        type="number"
                        value={formData.stellar_temp}
                        onChange={(e) => handleInputChange('stellar_temp', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="2000"
                        max="10000"
                        step="10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Stellar Radius (R☉)</label>
                      <input
                        type="number"
                        value={formData.stellar_radius}
                        onChange={(e) => handleInputChange('stellar_radius', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="0.1"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Stellar Mass (M☉)</label>
                      <input
                        type="number"
                        value={formData.stellar_mass}
                        onChange={(e) => handleInputChange('stellar_mass', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="0.1"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Surface Gravity (log g)</label>
                      <input
                        type="number"
                        value={formData.stellar_surface_gravity}
                        onChange={(e) => handleInputChange('stellar_surface_gravity', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="2"
                        max="6"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* System Properties */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <h3 className="text-white font-semibold">System Properties</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">Distance (pc)</label>
                      <input
                        type="number"
                        value={formData.system_distance}
                        onChange={(e) => handleInputChange('system_distance', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="1"
                        step="1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-medium">V Magnitude</label>
                      <input
                        type="number"
                        value={formData.sy_vmag}
                        onChange={(e) => handleInputChange('sy_vmag', parseFloat(e.target.value) || 0)}
                        className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                        min="0"
                        max="25"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-gray-300 text-sm font-medium">K Magnitude</label>
                    <input
                      type="number"
                      value={formData.sy_kmag}
                      onChange={(e) => handleInputChange('sy_kmag', parseFloat(e.target.value) || 0)}
                      className="w-full bg-space-navy/50 border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent focus:ring-2 focus:ring-space-accent/20 transition-all duration-200"
                      min="0"
                      max="25"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel - Visualization & Results */}
          <div className="space-y-6 flex flex-col">
            {/* Prediction Results */}
            <div className="card bg-gradient-to-br from-space-navy/90 to-space-purple/10 border border-space-purple/30 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-space-accent to-space-purple rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Classification Results</h2>
                  <p className="text-gray-400 text-sm">ML-powered exoplanet classification</p>
                </div>
              </div>
              
              <div className="h-96">
                {showResults ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div className={`w-40 h-40 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl ${
                        prediction === 'CONFIRMED' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                        prediction === 'CANDIDATE' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                        prediction === 'REFUTED' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                        prediction === 'FALSE POSITIVE' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                        'bg-gradient-to-br from-space-purple to-space-accent'
                      }`}>
                        <CheckCircle className="w-20 h-20 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3">Classification Result</h3>
                      <div className={`text-5xl font-bold mb-6 ${
                        prediction === 'CONFIRMED' ? 'text-green-400' :
                        prediction === 'CANDIDATE' ? 'text-yellow-400' :
                        prediction === 'REFUTED' ? 'text-red-400' :
                        prediction === 'FALSE POSITIVE' ? 'text-orange-400' :
                        'text-white'
                      }`}>
                        {prediction}
                      </div>
                      <p className="text-gray-300 mb-6 text-lg">
                        Based on advanced machine learning analysis
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
                          <div className="text-blue-400 font-bold text-xl">
                            {formData.orbital_period.toFixed(1)}
                          </div>
                          <div className="text-gray-400 text-sm">Period (days)</div>
                        </div>
                        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
                          <div className="text-blue-400 font-bold text-xl">
                            {formData.planet_radius.toFixed(1)}
                          </div>
                          <div className="text-gray-400 text-sm">Radius (R⊕)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-space-purple to-space-accent rounded-full flex items-center justify-center shadow-2xl">
                        <Play className="w-20 h-20 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3">Ready for Analysis</h3>
                      <p className="text-gray-300 mb-6 text-lg">
                        Enter exoplanet parameters and click "Classify Exoplanet"
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
                          <div className="text-green-400 font-bold text-xl">4</div>
                          <div className="text-gray-400 text-sm">Classifications</div>
                        </div>
                        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
                          <div className="text-blue-400 font-bold text-xl">15</div>
                          <div className="text-gray-400 text-sm">Parameters</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Controls */}
            <div className="card bg-gradient-to-br from-space-navy/90 to-space-purple/10 border border-space-purple/30 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-space-accent to-space-purple rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Analysis Controls</h2>
                  <p className="text-gray-400 text-sm">Configure and run the classification</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <button
                  onClick={handleAnalysis}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-space-accent to-space-purple hover:from-space-accent/90 hover:to-space-purple/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">Analyzing Parameters...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Play className="w-5 h-5" />
                      <span className="text-lg">Classify Exoplanet</span>
                    </div>
                  )}
                </button>

                {showResults && (
                  <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex items-center justify-center space-x-3">
                      <Download className="w-5 h-5" />
                      <span>Export Results</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Detection Results */}
            {showResults && (
              <DetectionResults 
                prediction={prediction}
                confidence={85}
                formData={formData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
