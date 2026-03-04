from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Fraud detection logic
def detect_fraud(amount, failed_pin):
    risk_score = 0

    if amount > 100000:
        risk_score += 50
    elif amount > 50000:
        risk_score += 20

    if failed_pin >= 3:
        risk_score += 40

    status = "Fraud Detected" if risk_score >= 50 else "Transaction Safe"

    return {
        "status": status,
        "risk_score": risk_score
    }


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        amount = float(request.form.get("amount", 0))
        failed_pin = int(request.form.get("failed_pin", 0))

        result = detect_fraud(amount, failed_pin)

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": "Invalid input",
            "message": str(e)
        }), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)