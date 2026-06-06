from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "Flask AI Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    attendance = data.get("attendance")
    marks = data.get("marks")

    if attendance is None or marks is None:
        return jsonify({"error": "Invalid input"}), 400

    prediction = model.predict([[attendance, marks]])

    result = "Pass" if prediction[0] == 1 else "Fail"

    return jsonify({
        "attendance": attendance,
        "marks": marks,
        "prediction": result
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)