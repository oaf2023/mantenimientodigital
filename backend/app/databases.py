from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config

MONGO_URI = config("MONGO_URI", default="mongodb://localhost:27017")
DB_NAME = config("DB_NAME", default="mantenimientodigital")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
