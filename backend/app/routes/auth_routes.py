# backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from ..services.auth_service import AuthService

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        AuthService.register_user(data['name'], data['email'], data['password'])
        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@auth_routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        token = AuthService.login_user(data['email'], data['password'])
        return jsonify({'token': token}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 401

@auth_routes.route('/api/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token no proporcionado'}), 401
    try:
        decoded = AuthService.verify_token(token)
        return jsonify({'message': 'Acceso concedido', 'user': decoded['email']}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 401
