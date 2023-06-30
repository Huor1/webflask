from flask import Flask, render_template, send_from_directory
app = Flask(__name__)
import os
@app.route("/")
def Home():
    return render_template("index.html")

@app.route("/About")
def About():
    return render_template("about.html")

@app.route("/Login")
def Login():
    return render_template("test_login.html")

