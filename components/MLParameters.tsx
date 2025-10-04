'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

interface MLParametersProps {
  className?: string
}

export default function MLParameters({ className }: MLParametersProps) {
  const [sensitivity, setSensitivity] = useState([75])
  const [noiseThreshold, setNoiseThreshold] = useState([30])
  const [minTransitDuration, setMinTransitDuration] = useState([2])

  return (
    <div className={`card ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2" />
        ML Parameters
      </h2>
      
      <div className="space-y-6">
        {/* Detection Sensitivity */}
        <div>
          <label className="block text-white font-medium mb-2">
            Detection Sensitivity: {sensitivity[0]}%
          </label>
          <Slider
            value={sensitivity}
            onValueChange={setSensitivity}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <p className="text-gray-400 text-sm mt-1">
            Higher values detect more subtle signals but may increase false positives
          </p>
        </div>

        {/* Noise Threshold */}
        <div>
          <label className="block text-white font-medium mb-2">
            Noise Threshold: {noiseThreshold[0]}%
          </label>
          <Slider
            value={noiseThreshold}
            onValueChange={setNoiseThreshold}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <p className="text-gray-400 text-sm mt-1">
            Filters out noisy data points below this threshold
          </p>
        </div>

        {/* Minimum Transit Duration */}
        <div>
          <label className="block text-white font-medium mb-2">
            Min Transit Duration: {minTransitDuration[0]} hours
          </label>
          <Slider
            value={minTransitDuration}
            onValueChange={setMinTransitDuration}
            max={24}
            min={0.5}
            step={0.5}
            className="w-full"
          />
          <p className="text-gray-400 text-sm mt-1">
            Minimum duration for a valid transit signal
          </p>
        </div>

        {/* Algorithm Selection */}
        <div>
          <label className="block text-white font-medium mb-2">
            Detection Algorithm
          </label>
          <select className="w-full bg-space-navy border border-space-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-space-accent">
            <option value="neural-network">Neural Network (Recommended)</option>
            <option value="random-forest">Random Forest</option>
            <option value="svm">Support Vector Machine</option>
            <option value="ensemble">Ensemble Method</option>
          </select>
        </div>

        {/* Advanced Options */}
        <div className="pt-4 border-t border-space-purple/30">
          <h3 className="text-white font-medium mb-3">Advanced Options</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Enable multi-band analysis</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Include radial velocity data</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Apply stellar activity correction</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
