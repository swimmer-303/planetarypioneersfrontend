Run locally

1) Create venv with Python 3.11
2) pip install -r requirements.txt
3) export ARTIFACT_BASE=https://raw.githubusercontent.com/tobywooo/exoplanet-predictor/main
4) uvicorn main:app --reload --port 8000

Set NEXT_PUBLIC_PREDICT_API=http://localhost:8000 in the frontend and use the Prediction page form.

Deploy quickly (Render/Cloud Run/Fly.io) – point to `uvicorn main:app`. Ensure Python 3.11 and enough memory for sklearn.

