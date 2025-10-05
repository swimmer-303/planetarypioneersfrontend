from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
import joblib
import pandas as pd

ARTIFACT_BASE = os.getenv("ARTIFACT_BASE", "https://raw.githubusercontent.com/tobywooo/exoplanet-predictor/main")


def load_json(name: str, default: dict):
    try:
        if os.path.exists(name):
            with open(name) as f:
                return json.load(f)
    except Exception:
        pass
    # fallback to remote
    import requests
    r = requests.get(f"{ARTIFACT_BASE}/{name}")
    if r.ok:
        return r.json()
    return default


def load_model():
    import requests, tempfile
    if os.path.exists("rf_pipeline.joblib"):
        return joblib.load("rf_pipeline.joblib")
    # Download to temp then load
    url = f"{ARTIFACT_BASE}/rf_pipeline.joblib"
    r = requests.get(url)
    r.raise_for_status()
    with open("rf_pipeline.joblib", "wb") as f:
        f.write(r.content)
    return joblib.load("rf_pipeline.joblib")

# Parse allowed origins from env (comma-separated). Fallback to * for dev/testing
raw_origins = os.getenv("ALLOW_ORIGINS", "*")
allow_all = raw_origins.strip() == "*"
allowed_origins = [o.strip() for o in raw_origins.split(",") if o.strip()] if not allow_all else ["*"]

app = FastAPI(title="Exoplanet Predictor API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    inputs: dict
    threshold: float = 0.5


model = load_model()
schema = load_json("koi_schema.json", {"feature_cols": []})


@app.get("/")
def root():
    return {"status": "ok", "features": len(schema.get("feature_cols", []))}


@app.post("/predict")
def predict(req: PredictRequest):
    try:
        cols = schema["feature_cols"]
        row = {c: req.inputs.get(c, None) for c in cols}
        X = pd.DataFrame([row])
        proba = float(model.predict_proba(X)[0, 1])
        pred = int(proba >= req.threshold)
        return {"proba": proba, "pred": pred}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


