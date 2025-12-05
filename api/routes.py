from flask import Blueprint, jsonify, render_template
from api import db

api_bp = Blueprint('api', __name__)

@api_bp.route("/")
def index():
    return render_template("index.html")