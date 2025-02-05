# backend/app.py
from flask import Flask
from .routes.auth_routes import auth_routes

app = Flask(__name__)
app.config.from_object('backend.config.Config')

# Registrar rutas
app.register_blueprint(auth_routes)

if __name__ == '__main__':
    app.run(debug=True)
