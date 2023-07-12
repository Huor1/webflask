from flask import Flask, render_template, send_from_directory,request, jsonify
app = Flask(__name__)
import os
import requests
import json
@app.route("/")
def Home():
    return render_template("index.html")

# Obsługa żądania estymacji ceny
@app.route("/estimate_price", methods=["POST"])
def estimate_price():
    # Pobieranie danych z formularza
    offer_type = request.form.get("offer_type")
    area = float(request.form.get("area"))
    rooms = int(request.form.get("rooms"))
    offer_type_of_building = request.form.get("offer_type_of_building")
    market = request.form.get("market")
    city_name = request.form.get("city_name")
    voivodeship = request.form.get("voivodeship")

    # Przygotowanie danych do przekazania do Azure Machine Learning
    data = {
        "offer_type": offer_type,
        "area": area,
        "rooms": rooms,
        "offer_type_of_building": offer_type_of_building,
        "market": market,
        "city_name": city_name,
        "voivodeship": voivodeship
    }

    # Wysłanie danych do Azure Machine Learning za pomocą żądania POST
    endpoint = "https://your-azure-endpoint-url"  # Zmień na rzeczywisty URL endpointu Azure Machine Learning
    headers = {"Content-Type": "application/json"}
    response = requests.post(endpoint, headers=headers, data=json.dumps(data))

    # Sprawdzenie statusu odpowiedzi
    if response.status_code == 200:
        # Przetworzenie odpowiedzi JSON
        result = response.json()
        estimated_price = result["estimated_price"]

        # Zwrócenie estymowanej ceny jako odpowiedź w formacie JSON
        return jsonify({"estimated_price": estimated_price})
    else:
        return jsonify({"error": "Błąd podczas estymacji ceny"})


@app.route("/About")
def About():
    return render_template("about.html")

@app.route("/Login")
def Login():
    return render_template("test_login.html")

