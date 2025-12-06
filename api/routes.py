from flask import Blueprint, jsonify, render_template
from api import db

api_bp = Blueprint('api', __name__)

@api_bp.route("/")
def index():
    return render_template("index.html")

@api_bp.route("/new_game")
def new_game():
    return render_template("new_game.html")