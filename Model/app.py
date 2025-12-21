from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import io

app = FastAPI(title="Fraud Detection API")

# Load model & features
model = joblib.load("fraud_model.pkl")
feature_names = joblib.load("feature_names.pkl")

# ---------- SINGLE TRANSACTION ----------
class Transaction(BaseModel):
    features: list[float]

@app.post("/predict")
def predict_fraud(transaction: Transaction):
    if len(transaction.features) != len(feature_names):
        return {
            "error": f"Expected {len(feature_names)} features, got {len(transaction.features)}"
        }

    data = np.array(transaction.features).reshape(1, -1)
    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]

    return {
        "fraud": bool(prediction),
        "fraud_probability": round(float(probability), 4)
    }

# ---------- CSV UPLOAD ----------
@app.post("/predict-csv")
async def predict_csv(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    # Ensure correct columns
    df = df[feature_names]

    predictions = model.predict(df)
    probabilities = model.predict_proba(df)[:, 1]

    df["fraud"] = predictions
    df["fraud_probability"] = probabilities

    return {
        "total_records": len(df),
        "fraud_count": int(df["fraud"].sum()),
        "results": df.to_dict(orient="records")
    }

