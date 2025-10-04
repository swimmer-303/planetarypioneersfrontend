'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Download, Star, Globe, Calendar } from 'lucide-react'
import ExoplanetDataBrowser from '@/components/ExoplanetDataBrowser'

interface RecentExoplanet {
  name: string
  hostname: string
  type: string
  distance: number
  period: number
  mass: number
  radius: number
  temperature: number
  discovered: number
  status: string
  discoveryMethod: string
}

export default function DatabasePage() {
  const [showDataBrowser, setShowDataBrowser] = useState(false)
  const [recentExoplanets, setRecentExoplanets] = useState<RecentExoplanet[]>([])
  const [loadingRecent, setLoadingRecent] = useState(true)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if we should auto-open the data browser
    if (searchParams.get('browse') === 'true') {
      setShowDataBrowser(true)
    }
    
    // Fetch recent discoveries
    fetchRecentDiscoveries()
  }, [searchParams])

  const fetchRecentDiscoveries = async () => {
    try {
      setLoadingRecent(true)
      const response = await fetch('/exoplanet-data.csv')
      const csvText = await response.text()
      
      // Parse CSV
      const lines = csvText.split('\n')
      const headerLine = lines.find(line => line.startsWith('pl_name,'))
      
      if (!headerLine) {
        throw new Error('Could not find CSV header')
      }
      
      const headers = headerLine.split(',')
      const dataLines = lines.slice(lines.indexOf(headerLine) + 1)
      
      const parsedData: RecentExoplanet[] = dataLines
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(line => {
          const values = line.split(',')
          return {
            name: values[0] || '',
            hostname: values[1] || '',
            type: getPlanetType(values[21], values[29]), // Based on radius and mass
            distance: parseFloat(values[79]) || 0, // sy_dist
            period: parseFloat(values[13]) || 0, // pl_orbper
            mass: parseFloat(values[29]) || 0, // pl_bmasse
            radius: parseFloat(values[21]) || 0, // pl_rade
            temperature: parseFloat(values[46]) || 0, // pl_eqt
            discovered: parseInt(values[8]) || 0, // disc_year
            status: values[3] === 'CONFIRMED' ? 'Confirmed' : 'Candidate', // disposition
            discoveryMethod: values[7] || '' // discoverymethod
          }
        })
        .filter(planet => planet.name && planet.name !== 'pl_name' && planet.discovered > 0)
        .sort((a, b) => b.discovered - a.discovered) // Sort by discovery year, most recent first
        .slice(0, 10) // Get top 10 most recent
      
      setRecentExoplanets(parsedData)
    } catch (err) {
      console.error('Error loading recent discoveries:', err)
      // Fallback to sample data if real data fails
      setRecentExoplanets([
        {
          name: 'Kepler-452b',
          hostname: 'Kepler-452',
          type: 'Super Earth',
          distance: 1400,
          period: 384.8,
          mass: 5.0,
          radius: 1.6,
          temperature: 265,
          discovered: 2015,
          status: 'Confirmed',
          discoveryMethod: 'Transit'
        }
      ])
    } finally {
      setLoadingRecent(false)
    }
  }

  const getPlanetType = (radius: string, mass: string): string => {
    const r = parseFloat(radius) || 0
    const m = parseFloat(mass) || 0
    
    if (r < 1.5 && m < 3) return 'Terrestrial'
    if (r < 2.5 && m < 10) return 'Super Earth'
    if (r < 4 && m < 17) return 'Neptune-like'
    return 'Gas Giant'
  }

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

        {/* Recent Discoveries Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Discoveries</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {loadingRecent ? 'Loading...' : `Showing ${recentExoplanets.length} most recent discoveries`}
              </span>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>

          {loadingRecent ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-space-accent border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-gray-300">Loading recent discoveries...</span>
            </div>
          ) : (
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
                  {recentExoplanets.map((planet, index) => (
                    <tr key={index} className="border-b border-space-purple/20 hover:bg-space-purple/10">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <div>
                            <span className="font-medium text-white">{planet.name}</span>
                            <div className="text-xs text-gray-500">{planet.hostname}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{planet.type}</td>
                      <td className="py-4 px-4 text-gray-300">
                        {planet.distance > 0 ? planet.distance.toFixed(1) : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {planet.period > 0 ? planet.period.toFixed(2) : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {planet.mass > 0 ? planet.mass.toFixed(2) : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {planet.radius > 0 ? planet.radius.toFixed(2) : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {planet.temperature > 0 ? Math.round(planet.temperature) : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-300">{planet.discovered}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                          planet.status === 'Confirmed' 
                            ? 'bg-green-400/20 text-green-400 border-green-400/30' 
                            : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'
                        }`}>
                          {planet.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Info Footer */}
          <div className="mt-6 pt-6 border-t border-space-purple/30">
            <div className="text-gray-400 text-sm">
              <p className="mb-2">
                <strong>Data Source:</strong> NASA Exoplanet Archive (October 2025)
              </p>
              <p>
                Showing the 10 most recently discovered exoplanets from the archive. 
                Discovery dates are based on the year the exoplanet was first published.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
