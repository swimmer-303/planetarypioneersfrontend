"use client"

import { useMemo } from 'react'

export default function PredictionPage() {
  const predictorUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      const envUrl = (process as any).env.NEXT_PUBLIC_PREDICTOR_URL as string | undefined
      if (envUrl && /^https?:\/\//.test(envUrl)) return envUrl
    }
    return "https://"
  }, [])

  const showPlaceholder = !predictorUrl || predictorUrl === "https://"

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">Exoplanet Candidate Predictor</h1>
      <p className="text-gray-300 mb-6">
        Enter KOI-like parameters or upload a CSV to estimate candidate probability.
      </p>

      {showPlaceholder ? (
        <div className="rounded-lg border border-space-purple/30 bg-space-navy/60 p-6 text-gray-300">
          <p className="mb-2">
            Prediction UI requires an external app URL. Set <code>NEXT_PUBLIC_PREDICTOR_URL</code> in your environment to the deployed predictor (e.g., a Streamlit app).
          </p>
          <p className="text-sm text-gray-400">
            Example: <code>https://your-streamlit-app.streamlit.app</code>
          </p>
        </div>
      ) : (
        <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-space-purple/30 bg-black/30">
          <iframe
            src={predictorUrl}
            title="Exoplanet Predictor"
            className="h-full w-full"
            allow="clipboard-read; clipboard-write; fullscreen"
          />
        </div>
      )}
    </div>
  )
}


