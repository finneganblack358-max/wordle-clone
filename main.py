from api import init_app, db
from flask import Flask

app = Flask(__name__)
init_app(app, db)

if __name__ == "__main__":
    
    app.run(debug=True)