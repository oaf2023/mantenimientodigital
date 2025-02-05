# backend/config.py
import os
from pymongo import MongoClient

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'tu_clave_secreta')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
    DATABASE_NAME = 'mantenimientodigital'

client = MongoClient(Config.MONGO_URI)
db = client[Config.DATABASE_NAME]
