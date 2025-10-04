'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Download, Star, Globe, Calendar } from 'lucide-react'
import ExoplanetDataBrowser from '@/components/ExoplanetDataBrowser'

export default function DatabasePage() {
  const [showDataBrowser, setShowDataBrowser] = useState(false)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if we should auto-open the data browser
    if (searchParams.get('browse') === 'true') {
      setShowDataBrowser(true)
    }
  }, [searchParams])
  
  const sampleExoplanets = [
    {
      name: 'Kepler-452b',
      type: 'Super Earth',
      distance: 1400,
      period: 384.8,
      mass: 5.0,
      radius: 1.6,
      temperature: 265,
      discovered: 2015,
      status: 'Confirmed'
    },
    {
      name: 'Proxima Centauri b',
      type: 'Terrestrial',
      distance: 4.2,
      period: 11.2,
      mass: 1.27,
      radius: 1.1,
      temperature: 234,
      discovered: 2016,
      status: 'Confirmed'
    },
    {
      name: 'TRAPPIST-1e',
      type: 'Terrestrial',
      distance: 40,
      period: 6.1,
      mass: 0.69,
      radius: 0.92,
      temperature: 251,
      discovered: 2017,
      status: 'Confirmed'
    },
    {
      name: 'HD 209458 b',
      type: 'Hot Jupiter',
      distance: 150,
      period: 3.5,
      mass: 0.69,
      radius: 1.35,
      temperature: 1130,
      discovered: 1999,
      status: 'Confirmed'
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Exoplanet <span className="text-gradient">Database</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive database of confirmed and candidate exoplanets 
            discovered through advanced detection methods.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search exoplanets..."
                  className="w-full bg-space-navy border border-space-purple/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-space-accent"
                />
              </div>
            </div>
            <div>
              <select className="w-full bg-space-navy border border-space-purple/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-space-accent">
                <option value="">All Types</option>
                <option value="terrestrial">Terrestrial</option>
                <option value="super-earth">Super Earth</option>
                <option value="neptune-like">Neptune-like</option>
                <option value="gas-giant">Gas Giant</option>
              </select>
            </div>
            <div>
              <button className="w-full btn-primary flex items-center justify-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">5,432</div>
            <div className="text-gray-400">Confirmed Exoplanets</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">1,247</div>
            <div className="text-gray-400">Candidate Systems</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">892</div>
            <div className="text-gray-400">Potentially Habitable</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gradient mb-2">24</div>
            <div className="text-gray-400">Discovery Methods</div>
          </div>
        </div>

        {/* Explore Dataset Section */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Explore NASA Exoplanet Archive Dataset</h2>
            <p className="text-gray-300 mb-6">
              Access real exoplanet data from NASA's Exoplanet Archive. This dataset contains thousands of confirmed 
              and candidate exoplanets with detailed orbital and physical parameters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real Data</h3>
              <p className="text-gray-400 text-sm">
                Direct from NASA's Exoplanet Archive with orbital periods, masses, radii, and more
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Updated Daily</h3>
              <p className="text-gray-400 text-sm">
                Fresh data from October 2025 with the latest discoveries and confirmations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Download CSV</h3>
              <p className="text-gray-400 text-sm">
                Complete dataset available for analysis, research, and machine learning projects
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a 
              href="/exoplanet-data.csv" 
              download="nasa-exoplanet-archive.csv"
              className="btn-primary flex items-center justify-center space-x-2 flex-1"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Dataset</span>
            </a>
            <button 
              onClick={() => setShowDataBrowser(!showDataBrowser)}
              className="btn-secondary flex items-center justify-center space-x-2 flex-1"
            >
              <Search className="w-4 h-4" />
              <span>{showDataBrowser ? 'Hide Data' : 'Browse Online'}</span>
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-space-navy/50 border border-space-purple/30 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Dataset Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <strong>Source:</strong> NASA Exoplanet Archive<br/>
                <strong>Last Updated:</strong> October 4, 2025<br/>
                <strong>Total Records:</strong> 4,000+ exoplanets
              </div>
              <div>
                <strong>Discovery Methods:</strong> Transit, Radial Velocity, Direct Imaging<br/>
                <strong>Data Types:</strong> Orbital parameters, physical properties, stellar data
              </div>
            </div>
          </div>
        </div>

        {/* Data Browser */}
        {showDataBrowser && <ExoplanetDataBrowser />}

        {/* Exoplanet Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Discoveries</h2>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-space-purple/30">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Distance (ly)</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Period (days)</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Mass (M⊕)</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Radius (R⊕)</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Temp (K)</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Discovered</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleExoplanets.map((planet, index) => (
                  <tr key={index} className="border-b border-space-purple/20 hover:bg-space-purple/10">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium text-white">{planet.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{planet.type}</td>
                    <td className="py-4 px-4 text-gray-300">{planet.distance}</td>
                    <td className="py-4 px-4 text-gray-300">{planet.period}</td>
                    <td className="py-4 px-4 text-gray-300">{planet.mass}</td>
                    <td className="py-4 px-4 text-gray-300">{planet.radius}</td>
                    <td className="py-4 px-4 text-gray-300">{planet.temperature}</td>
                    <td className="py-4 px-4 text-gray-300">{planet.discovered}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-400 border border-green-400/30">
                        {planet.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-space-purple/30">
            <div className="text-gray-400 text-sm">
              Showing 1-4 of 5,432 exoplanets
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 bg-space-navy border border-space-purple/30 rounded-lg text-gray-300 hover:text-white hover:border-space-accent transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-space-accent text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-2 bg-space-navy border border-space-purple/30 rounded-lg text-gray-300 hover:text-white hover:border-space-accent transition-colors">
                2
              </button>
              <button className="px-3 py-2 bg-space-navy border border-space-purple/30 rounded-lg text-gray-300 hover:text-white hover:border-space-accent transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
