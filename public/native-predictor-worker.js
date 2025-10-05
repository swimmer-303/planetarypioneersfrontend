/*
  Web Worker: loads Pyodide and the saved sklearn pipeline, then performs predictions.
  Artifacts are fetched from a configurable base URL (env override) or a GitHub raw URL.
*/

let pyodide = null
let initialized = false

const DEFAULT_BASE = 'https://raw.githubusercontent.com/tobywooo/exoplanet-predictor/main'

async function ensurePyodide() {
  if (pyodide) return pyodide
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js')
  // eslint-disable-next-line no-undef
  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
  })
  return pyodide
}

async function initModel(baseUrl) {
  if (initialized) return
  const p = await ensurePyodide()
  const modelBase = baseUrl || DEFAULT_BASE

  const code = `
import js
from pyodide.http import pyfetch
import micropip
import os, json
import pandas as pd
import joblib

# Ensure needed packages are present (pandas, joblib, scikit-learn are bundled in Pyodide)

async def fetch_to_file(url, path):
    resp = await pyfetch(url)
    if not resp.ok:
        raise RuntimeError(f"Failed to fetch {url}: {resp.status}")
    data = await resp.bytes()
    with open(path, 'wb') as f:
        f.write(data)

async def init(model_base):
    # Download artifacts
    await fetch_to_file(model_base + '/rf_pipeline.joblib', 'rf_pipeline.joblib')
    # JSONs are small; pull and write
    for name in ['koi_schema.json', 'categorical_values.json', 'labels.json']:
        r = await pyfetch(model_base + '/' + name)
        if r.ok:
            txt = await r.string()
            with open(name, 'w') as f:
                f.write(txt)
        else:
            with open(name, 'w') as f:
                f.write('{}')

    model = joblib.load('rf_pipeline.joblib')
    with open('koi_schema.json') as f:
        schema = json.load(f)
    return model, schema

model, schema = await init(js.modelBase)

def predict_one(payload: dict, threshold: float = 0.5):
    cols = schema['feature_cols']
    row = {c: payload.get(c, None) for c in cols}
    X = pd.DataFrame([row])
    proba = float(model.predict_proba(X)[0, 1])
    pred = int(proba >= threshold)
    return { 'proba': proba, 'pred': pred }
  `

  p.globals.set('modelBase', modelBase)
  await p.runPythonAsync(code)
  initialized = true
}

self.onmessage = async (e) => {
  const { type, payload } = e.data || {}
  try {
    if (type === 'init') {
      await initModel(payload?.baseUrl)
      self.postMessage({ type: 'inited' })
      return
    }
    if (type === 'predict') {
      await ensurePyodide()
      if (!initialized) throw new Error('Model not initialized')
      const threshold = typeof payload?.threshold === 'number' ? payload.threshold : 0.5
      const result = await pyodide.runPythonAsync(`predict_one(${JSON.stringify(payload?.inputs || {})}, ${threshold})`)
      self.postMessage({ type: 'result', result })
      return
    }
    self.postMessage({ type: 'error', error: 'Unknown message type' })
  } catch (err) {
    self.postMessage({ type: 'error', error: String(err) })
  }
}


