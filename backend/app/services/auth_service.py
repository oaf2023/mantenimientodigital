# backend/services/auth_service.py
from datetime import datetime, timedelta
import jwt
from ..config import Config
from ..models.user import User

class AuthService:
    @staticmethod
    def register_user(name, email, password):
        if User.find_user_by_email(email):
            raise ValueError('El usuario ya existe')
        return User.create_user(name, email, password)

    @staticmethod
    def login_user(email, password):
        user = User.find_user_by_email(email)
        if not user:
            raise ValueError('Usuario no encontrado')
        if not User.verify_password(user, password):
            raise ValueError('Contraseña incorrecta')
        return jwt.encode({
            'email': user['email'],
            'exp': datetime.utcnow() + timedelta(hours=1)
        }, Config.SECRET_KEY, algorithm='HS256')

    @staticmethod
    def verify_token(token):
        try:
            return jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise ValueError('Token expirado')
        except jwt.InvalidTokenError:
            raise ValueError('Token inválido')
