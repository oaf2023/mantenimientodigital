from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

# Configuración de conexión a la base de datos
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "mantenimiento"

async def crear_indices():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]

    print("Creando índices en la base de datos...")

    # Índices para la colección 'Activos'
    await db.Activos.create_index("codigo_equipo_tag", unique=True)
    await db.Activos.create_index("area")

    # Índices para la colección 'otrabajo'
    await db.otrabajo.create_index("numero_orden", unique=True)
    await db.otrabajo.create_index("fecha_emision")

    print("Índices creados exitosamente.")

    # Cerrar la conexión con la base de datos
    await client.close()

async def eliminar_indices():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]

    print("Eliminando índices innecesarios...")

    await db.Activos.drop_index("codigo_equipo_tag_1")
    await db.otrabajo.drop_index("numero_orden_1")

    print("Índices eliminados correctamente.")

    await client.close()




if __name__ == "__main__":
    asyncio.run(crear_indices())
