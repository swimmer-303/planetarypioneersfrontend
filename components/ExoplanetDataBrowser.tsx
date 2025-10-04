'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react'

interface ExoplanetData {
  pl_name: string
  hostname: string
  discoverymethod: string
  disc_year: string
  pl_orbper: string
  pl_rade: string
  pl_bmasse: string
  st_teff: string
  disposition: string
}

export default function ExoplanetDataBrowser() {
  const [data, setData] = useState<ExoplanetData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterMethod, setFilterMethod] = useState('')
  
  const itemsPerPage = 20

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/exoplanet-data.csv')
      const csvText = await response.text()
      
      // Parse CSV
      const lines = csvText.split('\n')
      const headerLine = lines.find(line => line.startsWith('pl_name,'))
      
      if (!headerLine) {
        throw new Error('Could not find CSV header')
      }
      
      const headers = headerLine.split(',')
      const dataLines = lines.slice(lines.indexOf(headerLine) + 1, lines.indexOf(headerLine) + 1001) // First 1000 records
      
      const parsedData: ExoplanetData[] = dataLines
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(line => {
          const values = line.split(',')
          return {
            pl_name: values[0] || '',
            hostname: values[1] || '',
            discoverymethod: values[7] || '',
            disc_year: values[8] || '',
            pl_orbper: values[13] || '',
            pl_rade: values[21] || '',
            pl_bmasse: values[30] || '',
            st_teff: values[52] || '',
            disposition: values[3] || ''
          }
        })
        .filter(planet => planet.pl_name && planet.pl_name !== 'pl_name')
      
      setData(parsedData)
    } catch (err) {
      setError('Failed to load exoplanet data')
      console.error('Error loading CSV:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredData = data.filter(planet => {
    const matchesSearch = planet.pl_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          planet.hostname.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !filterMethod || planet.discoverymethod === filterMethod
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const uniqueMethods = Array.from(new Set(data.map(planet => planet.discoverymethod))).filter(Boolean)

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-space-accent border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-gray-300">Loading exoplanet data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">{error}</div>
          <button 
            onClick={fetchData}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Exoplanet Data Browser</h3>
        
        {/* Search and Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search planets or host stars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-space-navy border border-space-purple/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-space-accent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full bg-space-navy border border-space-purple/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-space-accent"
            >
              <option value="">All Methods</option>
              {uniqueMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="text-gray-400 text-sm mb-4">
          Showing {filteredData.length} of {data.length} exoplanets
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-space-purple/30">
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Planet</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Host Star</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Method</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Year</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Period (days)</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Radius (R⊕)</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Mass (M⊕)</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((planet, index) => (
              <tr key={index} className="border-b border-space-purple/20 hover:bg-space-purple/10">
                <td className="py-3 px-2">
                  <div className="font-medium text-white text-sm">{planet.pl_name}</div>
                </td>
                <td className="py-3 px-2 text-gray-300 text-sm">{planet.hostname}</td>
                <td className="py-3 px-2 text-gray-300 text-sm">{planet.discoverymethod}</td>
                <td className="py-3 px-2 text-gray-300 text-sm">{planet.disc_year}</td>
                <td className="py-3 px-2 text-gray-300 text-sm">
                  {planet.pl_orbper ? parseFloat(planet.pl_orbper).toFixed(2) : 'N/A'}
                </td>
                <td className="py-3 px-2 text-gray-300 text-sm">
                  {planet.pl_rade ? parseFloat(planet.pl_rade).toFixed(2) : 'N/A'}
                </td>
                <td className="py-3 px-2 text-gray-300 text-sm">
                  {planet.pl_bmasse ? parseFloat(planet.pl_bmasse).toFixed(2) : 'N/A'}
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    planet.disposition === 'CONFIRMED' 
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                      : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                  }`}>
                    {planet.disposition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-space-purple/30">
          <div className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-space-navy border border-space-purple/30 rounded-lg text-gray-300 hover:text-white hover:border-space-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-space-accent text-white'
                      : 'bg-space-navy border border-space-purple/30 text-gray-300 hover:text-white hover:border-space-accent'
                  } transition-colors`}
                >
                  {pageNum}
                </button>
              )
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-space-navy border border-space-purple/30 rounded-lg text-gray-300 hover:text-white hover:border-space-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
