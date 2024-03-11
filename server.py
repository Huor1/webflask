from flask import Flask, render_template, request, jsonify
from flasgger import Swagger, swag_from
import yaml

app = Flask(__name__)
swagger = Swagger(app)

@app.route("/")
def Home():
    return render_template("index.html")

@app.route('/estimate_price', methods=['POST'])
@swag_from({
    'parameters': [
        {
            'name': 'offer_type',
            'in': 'formData',
            'type': 'string',
            'required': True,
            'description': 'Typ oferty'
        },
        {
            'name': 'area',
            'in': 'formData',
            'type': 'number',
            'format': 'float',
            'required': True,
            'description': 'Metraż nieruchomości'
        },
        {
            'name': 'rooms',
            'in': 'formData',
            'type': 'integer',
            'required': True,
            'description': 'Liczba pokoi'
        },
        {
            'name': 'offer_type_of_building',
            'in': 'formData',
            'type': 'string',
            'required': True,
            'description': 'Typ budynku'
        },
        {
            'name': 'market',
            'in': 'formData',
            'type': 'string',
            'required': True,
            'description': 'Rynek'
        },
        {
            'name': 'city_name',
            'in': 'formData',
            'type': 'string',
            'required': True,
            'description': 'Miasto'
        },
        {
            'name': 'voivodeship',
            'in': 'formData',
            'type': 'string',
            'required': True,
            'description': 'Województwo'
        }
    ],
    'responses': {
        200: {
            'description': 'Estymowana cena',
            'schema': {
                'type': 'object',
                'properties': {
                    'estimated_price': {
                        'type': 'number',
                        'format': 'float'
                    }
                }
            }
        }
    }
})
def estimate_price():
    # Odbieranie danych z formularza
    offer_type = request.form.get('offer_type')
    area = request.form.get('area', type=float)
    rooms = request.form.get('rooms', type=int)
    offer_type_of_building = request.form.get('offer_type_of_building')
    market = request.form.get('market')
    city_name = request.form.get('city_name')
    voivodeship = request.form.get('voivodeship')

    # Tutaj implementuj swoją logikę estymacji ceny na podstawie danych z żądania
    # W tym przykładzie zwracamy estymowaną cenę jako odpowiedź JSON
    estimated_price = area+rooms

    return jsonify({'estimated_price': estimated_price})

@app.route("/About")
def About():
    return render_template("about.html")

@app.route("/Login")
def Login():
    return render_template("test_login.html")

@app.route("/function1")
def function1():
    return render_template("function1.html")  # Nowa funkcja zwraca szablon function1.html

if __name__ == '__main__':
    app.run()
