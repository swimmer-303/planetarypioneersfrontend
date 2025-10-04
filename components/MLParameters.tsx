'use client'

import { useState } from 'react'
import { Settings, Brain, Zap, Shield } from 'lucide-react'

interface MLParametersProps {
  className?: string
}

export default function MLParameters({ className }: MLParametersProps) {
  return (
    <div className={`card bg-gradient-to-br from-space-navy/90 to-space-purple/10 border border-space-purple/30 shadow-2xl ${className}`}>
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-space-accent to-space-purple rounded-lg flex items-center justify-center mr-4">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">ML Configuration</h2>
          <p className="text-gray-400 text-sm">Auto-optimized classification settings</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Auto-Detected Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-space-accent" />
            <h3 className="text-white font-semibold text-lg">Auto-Detected Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">Classification Algorithm</div>
                  <div className="text-gray-400 text-sm">Random Forest (Auto-selected)</div>
                </div>
                <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">Confidence Threshold</div>
                  <div className="text-gray-400 text-sm">85% (Auto-optimized)</div>
                </div>
                <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">Training Data Split</div>
                  <div className="text-gray-400 text-sm">80/20 (Auto-balanced)</div>
                </div>
                <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-space-purple/20 to-space-accent/10 rounded-lg p-4 border border-space-purple/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">Max Tree Depth</div>
                  <div className="text-gray-400 text-sm">12 (Auto-tuned)</div>
                </div>
                <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center">
                  <Settings className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Selection */}
        <div className="pt-6 border-t border-space-purple/30">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-space-accent" />
            <h3 className="text-white font-semibold text-lg">Active Features</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Stellar parameters (temp, radius, mass)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Planetary parameters (radius, period)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">System properties (distance, magnitude)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Discovery method & facility</span>
            </label>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="pt-6 border-t border-space-purple/30">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-space-accent" />
            <h3 className="text-white font-semibold text-lg">Advanced Options</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Cross-validation enabled</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Feature scaling active</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-space-purple/30 bg-space-navy text-space-accent focus:ring-space-accent" />
              <span className="text-gray-300">Missing value handling</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
