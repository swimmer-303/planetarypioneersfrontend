# app_streamlit.py
# Streamlit UI for your tuned RandomForest pipeline (preprocessor + model)
# Expects:
#   models/rf_pipeline.joblib
#   models/koi_schema.json
#   models/categorical_values.json  (optional, for dropdowns)

import json
import joblib
import pandas as pd
import streamlit as st
from pathlib import Path

st.set_page_config(page_title="Exoplanet Candidate Predictor", page_icon="🪐", layout="centered")
st.title("🪐 Exoplanet Candidate Predictor")
st.caption("Enter KOI-like parameters to estimate whether a target is a candidate.")

# ---------- Sidebar: model paths & threshold ----------
MODEL_DIR = Path("models")
model_path = st.sidebar.text_input("Model path", str(MODEL_DIR / "rf_pipeline.joblib"))
schema_path = st.sidebar.text_input("Schema path", str(MODEL_DIR / "koi_schema.json"))
catvals_path = st.sidebar.text_input("Categorical values path", str(MODEL_DIR / "categorical_values.json"))
threshold = st.sidebar.slider("Decision threshold (positive class)", 0.05, 0.95, 0.50, 0.01)
st.sidebar.caption("Tip: Adjust threshold to balance precision/recall.")

# ---------- Load resources (cached) ----------
@st.cache_resource(show_spinner=True)
def load_resources(_model_path: str, _schema_path: str, _catvals_path: str):
    model = joblib.load(_model_path)
    with open(_schema_path) as f:
        schema = json.load(f)
    try:
        with open(_catvals_path) as f:
            catvals = json.load(f)
    except Exception:
        catvals = {}
    return model, schema, catvals

try:
    model, schema, catvals = load_resources(model_path, schema_path, catvals_path)
except Exception as e:
    st.error(f"Failed to load model or schema: {e}")
    st.stop()

feature_cols = schema["feature_cols"]
num_cols = set(schema.get("num_cols", []))
cat_cols = set(schema.get("cat_cols", []))

# ---------- Upload CSV (batch scoring) ----------
st.subheader("Batch prediction (optional)")
uploaded = st.file_uploader("Upload CSV with columns matching the schema", type=["csv"])
if uploaded:
    try:
        df_in = pd.read_csv(uploaded)
        # Ensure missing columns exist (preprocessor will impute)
        for c in feature_cols:
            if c not in df_in.columns:
                df_in[c] = None
        df_in = df_in[feature_cols]
        p = model.predict_proba(df_in)[:, 1]
        pred = (p >= threshold).astype(int)
        out = df_in.copy()
        out["prob_candidate"] = p
        out["prediction"] = pred
        st.success(f"Predicted {len(out)} rows.")
        st.dataframe(out.head(25))
        st.download_button("Download results CSV", out.to_csv(index=False), file_name="predictions.csv")
    except Exception as e:
        st.error(f"Batch prediction failed: {e}")

st.divider()

# ---------- Single-row form ----------
st.subheader("Single prediction (form)")
with st.form("koi_form"):
    inputs = {}
    left, right = st.columns(2)
    for i, c in enumerate(feature_cols):
        target_col = left if i % 2 == 0 else right
        with target_col:
            if c in num_cols:
                # number_input returns 0.0 if value is None unless we use placeholder-only pattern
                val = st.text_input(c, placeholder="numeric (leave blank for missing)").strip()
                if val == "":
                    inputs[c] = None
                else:
                    try:
                        inputs[c] = float(val)
                    except ValueError:
                        st.warning(f"'{c}' should be numeric; leaving blank.")
                        inputs[c] = None
            elif c in cat_cols:
                options = catvals.get(c, [])
                if options:
                    sel = st.selectbox(c, ["(leave blank)"] + options, index=0)
                    inputs[c] = None if sel == "(leave blank)" else sel
                else:
                    txt = st.text_input(c, placeholder="text (optional)").strip()
                    inputs[c] = txt or None
            else:
                txt = st.text_input(c, placeholder="value (optional)").strip()
                inputs[c] = txt or None

    submitted = st.form_submit_button("Predict")

if submitted:
    try:
        row = {c: inputs.get(c, None) for c in feature_cols}
        X_df = pd.DataFrame([row])
        proba = float(model.predict_proba(X_df)[0, 1])
        pred = int(proba >= threshold)
        label = "🟢 CANDIDATE (1)" if pred == 1 else "🔵 CONFIRMED (0)"
        st.success(label)
        st.metric("Probability (candidate)", f"{proba:.3f}")
        st.caption("Model: saved sklearn pipeline (preprocessor + tuned RandomForest).")
    except Exception as e:
        st.error(f"Prediction failed: {e}")

st.divider()
with st.expander("About this model"):
    st.markdown(
        "- Input columns come from the KOI cumulative schema you trained on.\n"
        "- Missing values are imputed by the pipeline.\n"
        "- The decision threshold can be adjusted in the sidebar.\n"
        "- Batch and single predictions use the same saved pipeline."
    )
