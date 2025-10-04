'use client'

import { CheckCircle, AlertCircle, Info, Download, Share2 } from 'lucide-react'

interface DetectionResult {
  id: number
  name: string
  confidence: number
  period: number
  radius: number
  status: 'confirmed' | 'candidate' | 'false_positive' | 'refuted'
}

interface DetectionResultsProps {
  prediction?: string
  confidence?: number
  formData?: {
    orbital_period: number
    planet_radius: number
    stellar_temp: number
    stellar_radius: number
  }
}

export default function DetectionResults({ prediction, confidence = 85, formData }: DetectionResultsProps) {
  // Generate a single result based on the actual prediction
  const result: DetectionResult = {
    id: 1,
    name: `Exoplanet-${Date.now().toString().slice(-6)}`,
    confidence: confidence,
    period: formData?.orbital_period || 0,
    radius: formData?.planet_radius || 0,
    status: prediction?.toLowerCase().replace(' ', '_') as any || 'candidate'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'candidate':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'false_positive':
        return <AlertCircle className="w-5 h-5 text-orange-400" />
      case 'refuted':
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
        return 'bg-orange-400/20 border-orange-400/30 text-orange-400'
      case 'refuted':
        return 'bg-red-400/20 border-red-400/30 text-red-400'
      default:
        return 'bg-blue-400/20 border-blue-400/30 text-blue-400'
    }
  }

  return (
    <div className="card bg-gradient-to-br from-space-navy/90 to-space-purple/10 border border-space-purple/30 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-space-accent to-space-purple rounded-lg flex items-center justify-center mr-4">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Detection Results</h2>
            <p className="text-gray-400 text-sm">Analysis completed successfully</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-space-purple/20 hover:bg-space-purple/30 rounded-lg transition-colors duration-200">
            <Download className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 bg-space-purple/20 hover:bg-space-purple/30 rounded-lg transition-colors duration-200">
            <Share2 className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-green-400">1</div>
          <div className="text-gray-400 text-sm">Detection Found</div>
        </div>
        <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-blue-400">
            {result.confidence.toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm">Confidence</div>
        </div>
        <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-yellow-400">
            {result.period.toFixed(1)}
          </div>
          <div className="text-gray-400 text-sm">Period (days)</div>
        </div>
        <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
          <div className="text-2xl font-bold text-purple-400">
            {result.radius.toFixed(1)}
          </div>
          <div className="text-gray-400 text-sm">Radius (R⊕)</div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-space-purple/30">
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Exoplanet</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Period (days)</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Radius (R⊕)</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-space-purple/20 hover:bg-space-purple/10">
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
                  <span className="text-white text-sm">{result.confidence.toFixed(1)}%</span>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-300">{result.period.toFixed(2)}</td>
              <td className="py-4 px-4 text-gray-300">{result.radius.toFixed(2)}</td>
              <td className="py-4 px-4">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(result.status)}`}>
                  {getStatusIcon(result.status)}
                  <span className="text-sm font-medium capitalize">{result.status.replace('_', ' ')}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-gradient-to-r from-space-blue/20 to-space-accent/10 rounded-lg border border-space-blue/30">
        <h3 className="text-white font-semibold mb-2 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-400" />
          Recommendations
        </h3>
        <ul className="text-gray-300 text-sm space-y-1">
          {result.status === 'confirmed' && (
            <>
              <li>• This exoplanet has been confirmed with high confidence</li>
              <li>• Consider submitting to exoplanet databases for community validation</li>
              <li>• Additional spectroscopic observations recommended for atmospheric analysis</li>
            </>
          )}
          {result.status === 'candidate' && (
            <>
              <li>• This candidate requires follow-up observations for confirmation</li>
              <li>• Consider additional photometric observations to confirm transit timing</li>
              <li>• Radial velocity measurements recommended for mass determination</li>
            </>
          )}
          {result.status === 'false_positive' && (
            <>
              <li>• This detection appears to be a false positive</li>
              <li>• Consider stellar activity or instrumental effects as causes</li>
              <li>• Additional observations may help clarify the signal source</li>
            </>
          )}
          {result.status === 'refuted' && (
            <>
              <li>• This detection has been refuted by follow-up observations</li>
              <li>• The signal was likely due to stellar activity or instrumental noise</li>
              <li>• Consider refining detection algorithms for similar cases</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}