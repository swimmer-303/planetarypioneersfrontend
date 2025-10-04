'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Info, Download, Share2 } from 'lucide-react'

interface DetectionResult {
  id: number
  name: string
  confidence: number
  period: number
  depth: number
  duration: number
  status: 'confirmed' | 'candidate' | 'false_positive'
}

export default function DetectionResults() {
  const [results] = useState<DetectionResult[]>([
    {
      id: 1,
      name: 'Candidate-001',
      confidence: 94.2,
      period: 12.5,
      depth: 0.015,
      duration: 2.3,
      status: 'candidate'
    },
    {
      id: 2,
      name: 'Candidate-002',
      confidence: 87.8,
      period: 8.2,
      depth: 0.008,
      duration: 1.8,
      status: 'candidate'
    },
    {
      id: 3,
      name: 'Candidate-003',
      confidence: 76.5,
      period: 15.7,
      depth: 0.012,
      duration: 2.1,
      status: 'candidate'
    }
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'candidate':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'false_positive':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-400/20 border-green-400/30 text-green-400'
      case 'candidate':
        return 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400'
      case 'false_positive':
        return 'bg-red-400/20 border-red-400/30 text-red-400'
      default:
        return 'bg-blue-400/20 border-blue-400/30 text-blue-400'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
          Detection Results
        </h2>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-white">{results.length}</div>
          <div className="text-gray-400 text-sm">Total Candidates</div>
        </div>
        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-green-400">
            {results.filter(r => r.confidence > 90).length}
          </div>
          <div className="text-gray-400 text-sm">High Confidence</div>
        </div>
        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-yellow-400">
            {results.filter(r => r.confidence > 80 && r.confidence <= 90).length}
          </div>
          <div className="text-gray-400 text-sm">Medium Confidence</div>
        </div>
        <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-blue-400">
            {(results.reduce((acc, r) => acc + r.confidence, 0) / results.length).toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm">Avg Confidence</div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-space-purple/30">
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Candidate</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Period (days)</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Depth</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Duration (hrs)</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-b border-space-purple/20 hover:bg-space-purple/10">
                <td className="py-4 px-4">
                  <div className="font-medium text-white">{result.name}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-space-navy rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-space-accent to-pink-500 h-2 rounded-full"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm">{result.confidence}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">{result.period}</td>
                <td className="py-4 px-4 text-gray-300">{result.depth.toFixed(4)}</td>
                <td className="py-4 px-4 text-gray-300">{result.duration}</td>
                <td className="py-4 px-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(result.status)}`}>
                    {getStatusIcon(result.status)}
                    <span className="text-sm font-medium capitalize">{result.status.replace('_', ' ')}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-space-blue/20 rounded-lg border border-space-blue/30">
        <h3 className="text-white font-semibold mb-2 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-400" />
          Recommendations
        </h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• High-confidence candidates (90%+) should be prioritized for follow-up observations</li>
          <li>• Consider additional photometric observations to confirm transit timing</li>
          <li>• Radial velocity measurements recommended for mass determination</li>
          <li>• Submit candidates to exoplanet databases for community validation</li>
        </ul>
      </div>
    </div>
  )
}
