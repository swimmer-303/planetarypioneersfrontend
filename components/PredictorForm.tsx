"use client"

import { useEffect, useMemo, useState } from 'react'

type Schema = {
  feature_cols: string[]
  num_cols?: string[]
  cat_cols?: string[]
}

type PredictResponse = { proba: number; pred: number } | { error: string }

type RuntimeConfig = {
  apiBaseUrl?: string
}

export default function PredictorForm() {
  const [schema, setSchema] = useState<Schema | null>(null)
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [threshold, setThreshold] = useState(0.5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictResponse | null>(null)
  const [apiBase, setApiBase] = useState<string | null>(null)

  // Load API base URL from runtime config with fallbacks
  useEffect(() => {
    // Start with env or localhost, then allow config to override
    const envUrl = process.env.NEXT_PUBLIC_PREDICT_API as string | undefined
    const fallback = (envUrl && envUrl.replace(/\/$/, '')) || 'http://localhost:8000'
    setApiBase(fallback)

    fetch('/predict-config.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then((cfg: RuntimeConfig | null) => {
        if (cfg?.apiBaseUrl && /^https?:\/\//.test(cfg.apiBaseUrl)) {
          setApiBase(cfg.apiBaseUrl.replace(/\/$/, ''))
        }
      })
      .catch(() => {
        // ignore and keep fallback
      })
  }, [])

  useEffect(() => {
    const base = 'https://raw.githubusercontent.com/tobywooo/exoplanet-predictor/main'
    fetch(`${base}/koi_schema.json`)
      .then(r => r.json())
      .then((s: Schema) => setSchema(s))
      .catch(() => setSchema(null))
  }, [])

  const handleChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!apiBase || !schema) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const payload = {
        inputs,
        threshold,
      }
      const res = await fetch(`${apiBase}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error((json as any)?.detail || (json as any)?.error || `HTTP ${res.status}`)
      setResult(json as PredictResponse)
    } catch (e: any) {
      setError(String(e?.message || e))
    } finally {
      setLoading(false)
    }
  }

  if (!apiBase) {
    return (
      <div className="rounded-lg border border-yellow-400/30 bg-yellow-900/10 p-4 text-yellow-200">
        Configure backend API: set <code>NEXT_PUBLIC_PREDICT_API</code> or provide <code>public/predict-config.json</code> with <code>apiBaseUrl</code>.
      </div>
    )
  }

  if (!schema) {
    return (
      <div className="rounded-lg border border-space-purple/30 bg-space-navy/60 p-6 text-gray-300">Loading schema…</div>
    )
  }

  // Custom ordered fields and labels provided by user
  const FIELD_ORDER: { key: string; label: string }[] = [
    { key: 'koi_score', label: 'KOI score' },
    { key: 'koi_fpflag_ss', label: 'Flag stellar eclipse' },
    { key: 'koi_fpflag_ec', label: 'Flag centroid offset' },
    { key: 'koi_period_err1', label: 'koi_period_err1' },
    { key: 'koi_time0bk', label: 'Transit epoch' },
    { key: 'koi_time0bk_err2', label: 'koi_time0bk_err2' },
    { key: 'koi_impact_err1', label: 'koi_impact_err1' },
    { key: 'koi_duration', label: 'Transit duration' },
    { key: 'koi_duration_err2', label: 'koi_duration_err2' },
    { key: 'koi_depth_err1', label: 'koi_depth_err1' },
    { key: 'koi_prad', label: 'Planet radius' },
    { key: 'koi_prad_err2', label: 'koi_prad_err2' },
    { key: 'koi_insol', label: 'Insolation' },
    { key: 'koi_insol_err2', label: 'koi_insol_err2' },
    { key: 'koi_tce_plnt_num', label: 'Planet #' },
    { key: 'koi_steff_err1', label: 'koi_steff_err1' },
    { key: 'koi_slogg', label: 'Stellar log g' },
    { key: 'koi_slogg_err2', label: 'koi_slogg_err2' },
    { key: 'koi_srad_err1', label: 'koi_srad_err1' },
    { key: 'ra', label: 'ra' },
    { key: 'koi_kepmag', label: 'Kepler mag' },
    { key: 'koi_fpflag_nt', label: 'Flag not transit-like' },
    { key: 'koi_fpflag_co', label: 'Flag ephemeris match' },
    { key: 'koi_period', label: 'Orbital period' },
    { key: 'koi_period_err2', label: 'koi_period_err2' },
    { key: 'koi_time0bk_err1', label: 'koi_time0bk_err1' },
    { key: 'koi_impact', label: 'Impact parameter' },
    { key: 'koi_impact_err2', label: 'koi_impact_err2' },
    { key: 'koi_duration_err1', label: 'koi_duration_err1' },
    { key: 'koi_depth', label: 'Transit depth' },
    { key: 'koi_depth_err2', label: 'koi_depth_err2' },
    { key: 'koi_prad_err1', label: 'koi_prad_err1' },
    { key: 'koi_teq', label: 'Equilibrium temp' },
    { key: 'koi_insol_err1', label: 'koi_insol_err1' },
    { key: 'koi_model_snr', label: 'Model SNR' },
    { key: 'koi_steff', label: 'Stellar Teff' },
    { key: 'koi_steff_err2', label: 'koi_steff_err2' },
    { key: 'koi_slogg_err1', label: 'koi_slogg_err1' },
    { key: 'koi_srad', label: 'Stellar radius' },
    { key: 'koi_srad_err2', label: 'koi_srad_err2' },
    { key: 'dec', label: 'dec' },
  ]

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
        {FIELD_ORDER.map(({ key, label }) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm mb-1">{label}</label>
            <input
              className="bg-black/30 border border-space-purple/30 rounded px-3 py-2 text-gray-100"
              placeholder="numeric or text"
              value={inputs[key] ?? ''}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded-md bg-space-purple/80 hover:bg-space-purple text-white disabled:opacity-50"
        >
          {loading ? 'Predicting…' : 'Predict'}
        </button>
        {result && 'proba' in result && (
          <div className="text-sm text-gray-200">
            Probability: <span className="font-semibold">{(result as any).proba.toFixed(3)}</span>{' '}
            → Prediction: <span className="font-semibold">{(result as any).pred}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-300 break-all">{error}</div>
      )}
    </div>
  )
}


