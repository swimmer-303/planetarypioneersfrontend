import { } from 'react'

export default function PredictionPage() {
  const envUrl = process.env.NEXT_PUBLIC_PREDICTOR_URL
  const predictorUrl = envUrl && /^https?:\/\//.test(envUrl)
    ? envUrl
    : "https://exoplanet-predictor-planetarypioneers.streamlit.app/"

  const showPlaceholder = !predictorUrl || predictorUrl === "https://"

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">Exoplanet Candidate Predictor</h1>
      <p className="text-gray-300 mb-6">
        Enter KOI-like parameters or upload a CSV to estimate candidate probability.
      </p>

      {/* Open external predictor */}
      <div className="mb-8"></div>

      <div className="rounded-lg border border-space-purple/30 bg-space-navy/60 p-6 text-gray-300">
        <p className="mb-4">
          The predictor runs externally. Open it in a new tab below.
        </p>
        <a
          href={predictorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-md bg-space-purple/80 hover:bg-space-purple text-white transition-colors"
        >
          Open Predictor
        </a>
        <p className="mt-3 text-sm text-gray-400 break-all">
          Source: {predictorUrl}
        </p>
      </div>
    </div>
  )
}


