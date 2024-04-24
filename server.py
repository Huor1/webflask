from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flasgger import Swagger, swag_from
import pandas as pd
import io
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.compose import ColumnTransformer
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)
swagger = Swagger(app)

@app.route("/")
def Home():
    return render_template("index.html")

@app.route("/housesPriceEstimation", methods=["POST"])
def housesPriceEstimation():
    request_data = request.json

    new_request_data = pd.DataFrame({
        'mark': [request_data.get("mark")],
        'model': [request_data.get("model")],
        'year': [request_data.get("year")],
        'mileage': [request_data.get("mileage")],
        'vol_engine': [request_data.get("vol_engine")],
        'fuel': [request_data.get("fuel")]
    })

    return 10

@app.route("/About")
def About():
    return render_template("about.html")

@app.route("/Login")
def Login():
    return render_template("login.html")

@app.route("/Register")
def Register():
    return render_template("register.html")

@app.route("/function1")
def function1():
    return render_template("function1.html")  # Nowa funkcja zwraca szablon function1.html

@app.route("/carsPriceEstimation", methods=["POST"])
def carsPriceEstimation():

    request_data = request.json

    new_request_data = pd.DataFrame({
        'mark': [request_data.get("mark")],
        'model': [request_data.get("model")],
        'year': [request_data.get("year")],
        'mileage': [request_data.get("mileage")],
        'vol_engine': [request_data.get("vol_engine")],
        'fuel': [request_data.get("fuel")]
    })

    # Step 2: Load the uploaded file into a Pandas DataFrame
    data = pd.read_csv('../Models/Task1/Car_Prices_Poland_Kaggle.csv')

    # Preprocessing setup (repeat the steps we discussed earlier)
    categorical_cols = ['mark', 'model', 'fuel']
    numerical_cols = ['year', 'mileage', 'vol_engine']
    preprocessor = ColumnTransformer(transformers=[
        ('num', MinMaxScaler(), numerical_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ])

    # Dopasuj preprocessor do całego zestawu danych
    preprocessor.fit(data)

    # Wczytaj model
    loaded_model = load_model('../Models/Task1/cars_model')

    # Przetwarzanie nowych danych wejściowych
    new_data_transformed = preprocessor.transform(new_request_data)

    # Dokonaj predykcji na nowych danych
    predicted_price = loaded_model.predict(new_data_transformed)

    # return str(predicted_price)+" €"
    return str(predicted_price[0][0])

if __name__ == '__main__':
    # app.run()
    app.run(debug=True)
