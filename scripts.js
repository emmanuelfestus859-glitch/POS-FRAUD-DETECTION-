const form = document.getElementById("fraudForm");
const amountInput = document.getElementById("amount");
const failedPinInput = document.getElementById("failed_pin");
const resultDiv = document.getElementById("result");
const riskBar = document.getElementById("riskBar");

function calculateRisk(amount, failedPin) {
    let risk = 0;

    if (amount > 100000) risk += 50;
    if (failedPin >= 3) risk += 40;
    if (amount > 50000) risk += 20;

    return Math.min(risk, 100);
}

function updateRiskBar(risk) {
    riskBar.style.width = risk + "%";

    if (risk < 40) {
        riskBar.style.background = "lime";
    } else if (risk < 70) {
        riskBar.style.background = "orange";
    } else {
        riskBar.style.background = "red";
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const failedPin = parseInt(failedPinInput.value);

    const risk = calculateRisk(amount, failedPin);
    updateRiskBar(risk);

    if (risk < 50) {
        resultDiv.innerHTML = "✅ Transaction Safe";
        resultDiv.style.color = "lime";
    } else {
        resultDiv.innerHTML = "🚨 Fraud Detected!";
        resultDiv.style.color = "red";
    }
});