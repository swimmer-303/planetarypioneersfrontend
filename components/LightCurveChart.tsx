'use client'

import { useState, useEffect } from 'react'
import { BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface LightCurveChartProps {
  hasData: boolean
}

export default function LightCurveChart({ hasData }: LightCurveChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (hasData) {
      // Generate sample light curve data with transit signals
      const sampleData = []
      for (let i = 0; i < 1000; i++) {
        const time = i * 0.1
        let flux = 1.0
        
        // Add noise
        flux += (Math.random() - 0.5) * 0.02
        
        // Add transit signals
        if (time > 200 && time < 220) {
          flux -= 0.015 // Transit dip
        }
        if (time > 500 && time < 510) {
          flux -= 0.008 // Smaller transit
        }
        if (time > 800 && time < 820) {
          flux -= 0.012 // Another transit
        }
        
        sampleData.push({
          time: time,
          flux: flux,
          raw: flux + (Math.random() - 0.5) * 0.01
        })
      }
      setData(sampleData)
    }
  }, [hasData])

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-full bg-space-navy/30 rounded-lg border border-space-purple/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-space-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-400">Upload data to visualize light curve</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
            label={{ value: 'Time (hours)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            domain={[0.95, 1.05]}
            label={{ value: 'Relative Flux', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a2e',
              border: '1px solid #16213e',
              borderRadius: '8px',
              color: '#ffffff'
            }}
            formatter={(value: any, name: string) => [
              value.toFixed(6),
              name === 'flux' ? 'Processed Flux' : 'Raw Flux'
            ]}
            labelFormatter={(label) => `Time: ${label} hours`}
          />
          <Line
            type="monotone"
            dataKey="raw"
            stroke="#6B7280"
            strokeWidth={1}
            dot={false}
            name="Raw Data"
          />
          <Line
            type="monotone"
            dataKey="flux"
            stroke="#e94560"
            strokeWidth={2}
            dot={false}
            name="Processed Data"
          />
          {/* Transit detection markers */}
          <ReferenceLine x={210} stroke="#4ade80" strokeDasharray="5 5" />
          <ReferenceLine x={505} stroke="#4ade80" strokeDasharray="5 5" />
          <ReferenceLine x={810} stroke="#4ade80" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span className="text-gray-400">Raw Data</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-space-accent rounded-full"></div>
          <span className="text-gray-400">Processed Data</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-green-400"></div>
          <span className="text-gray-400">Detected Transits</span>
        </div>
      </div>
    </div>
  )
}
