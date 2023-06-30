from flask import Flask, render_template, send_from_directory
app = Flask(__name__)
import os
@app.route("/")
def hello_world():
    return render_template("about.html")


