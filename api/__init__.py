db = None

def init_app(app, db_instance=None):
    global db
    if db_instance is not None:
        db = db_instance
    from .routes import api_bp
    if 'api' not in app.blueprints:
        app.register_blueprint(api_bp)