"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

type Schema = {
  feature_cols: string[]
  num_cols?: string[]
  cat_cols?: string[]
}

type PredictResult = { proba: number; pred: number }

export default function NativePredictor() {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [schema, setSchema] = useState<Schema | null>(null)
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [threshold, setThreshold] = useState(0.5)
  const [result, setResult] = useState<PredictResult | null>(null)
  const workerRef = useRef<Worker | null>(null)

  const modelBase = useMemo(() => {
    const envUrl = (process as any).env.NEXT_PUBLIC_PREDICTOR_ARTIFACTS_BASE as string | undefined
    return envUrl && /^https?:\/\//.test(envUrl)
      ? envUrl.replace(/\/$/, '')
      : undefined
  }, [])

  useEffect(() => {
    setError(null)
    const worker = new Worker('/native-predictor-worker.js')
    workerRef.current = worker
    worker.onmessage = (e: MessageEvent) => {
      const { type, result: res, error: err, schema: sch } = e.data || {}
      if (type === 'inited') {
        setReady(true)
        // Fetch schema for building the form
        fetch((modelBase || 'https://raw.githubusercontent.com/tobywooo/exoplanet-predictor/main') + '/koi_schema.json')
          .then(r => r.json())
          .then((s: Schema) => setSchema(s))
          .catch(() => setSchema(null))
        return
      }
      if (type === 'result') {
        setResult(res as PredictResult)
        return
      }
      if (type === 'error') {
        setError(String(err))
      }
    }
    worker.postMessage({ type: 'init', payload: { baseUrl: modelBase } })
    return () => {
      worker.terminate()
      workerRef.current = null
    }
  }, [modelBase])

  const handleChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const handlePredict = () => {
    setResult(null)
    setError(null)
    workerRef.current?.postMessage({ type: 'predict', payload: { inputs, threshold } })
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-400/40 bg-red-900/20 p-4 text-red-200">
        <p className="mb-2">Native predictor failed to initialize.</p>
        <p className="text-sm break-all">{error}</p>
      </div>
    )
  }

  if (!ready || !schema) {
    return (
      <div className="rounded-lg border border-space-purple/30 bg-space-navy/60 p-6 text-gray-300">
        Loading model in your browser...
      </div>
    )
  }

  const featureCols = schema.feature_cols

  return (
    <div className="rounded-lg border border-space-purple/30 bg-space-navy/60 p-6 text-gray-200">
      <div className="mb-4">
        <label className="block text-sm mb-1">Decision threshold</label>
        <input
          type="range"
          min={0.05}
          max={0.95}
          step={0.01}
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-400 mt-1">{threshold.toFixed(2)}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureCols.map((c) => (
          <div key={c} className="flex flex-col">
            <label className="text-sm mb-1">{c}</label>
            <input
              className="bg-black/30 border border-space-purple/30 rounded px-3 py-2 text-gray-100"
              placeholder="numeric or text"
              value={inputs[c] ?? ''}
              onChange={(e) => handleChange(c, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handlePredict}
          disabled={!ready}
          className="px-4 py-2 rounded-md bg-space-purple/80 hover:bg-space-purple text-white disabled:opacity-50"
        >
          Predict
        </button>
        {result && (
          <div className="text-sm text-gray-200">
            Probability: <span className="font-semibold">{result.proba.toFixed(3)}</span>{' '}
            → Prediction: <span className="font-semibold">{result.pred}</span>
          </div>
        )}
      </div>
    </div>
  )
}


