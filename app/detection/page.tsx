'use client'

import { useState } from 'react'
import { Upload, Play, Download, Settings, BarChart3, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import LightCurveChart from '@/components/LightCurveChart'
import DetectionResults from '@/components/DetectionResults'
import MLParameters from '@/components/MLParameters'

export default function DetectionPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setHasData(true)
    }
  }

  const handleAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate ML analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ML <span className="text-gradient">Detection</span> Engine
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload astronomical data and let our machine learning algorithms 
            identify potential exoplanets in your dataset.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Data Upload & Parameters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Data Upload */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-2" />
                Data Upload
              </h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-space-purple/50 rounded-lg p-8 text-center hover:border-space-accent/50 transition-colors duration-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4">
                    Upload light curve data or connect to telescope feeds
                  </p>
                  <input
                    type="file"
                    accept=".csv,.txt,.fits"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="btn-primary cursor-pointer inline-flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose File</span>
                  </label>
                </div>

                {selectedFile && (
                  <div className="bg-space-purple/20 rounded-lg p-4 border border-space-purple/30">
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">File Uploaded</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-1">{selectedFile.name}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Size: {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ML Parameters */}
            <MLParameters />

            {/* Analysis Controls */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Analysis Controls
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={handleAnalysis}
                  disabled={!hasData || isAnalyzing}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start Analysis</span>
                    </>
                  )}
                </button>

                {showResults && (
                  <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Results</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Visualization & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Light Curve Visualization */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Light Curve Analysis
              </h2>
              
              <div className="h-96">
                <LightCurveChart hasData={hasData} />
              </div>
            </div>

            {/* Detection Results */}
            {showResults && (
              <DetectionResults />
            )}

            {/* Status Panel */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Analysis Status
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-space-purple/20 rounded-lg border border-space-purple/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Data Processing</span>
                  </div>
                  <span className="text-green-400 text-sm">Complete</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-space-purple/20 rounded-lg border border-space-purple/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${isAnalyzing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                    <span className="text-white font-medium">ML Analysis</span>
                  </div>
                  <span className={`text-sm ${isAnalyzing ? 'text-yellow-400' : 'text-green-400'}`}>
                    {isAnalyzing ? 'In Progress' : 'Complete'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-space-purple/20 rounded-lg border border-space-purple/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${showResults ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                    <span className="text-white font-medium">Results Ready</span>
                  </div>
                  <span className={`text-sm ${showResults ? 'text-green-400' : 'text-gray-400'}`}>
                    {showResults ? 'Available' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
