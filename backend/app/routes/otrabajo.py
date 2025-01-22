from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.otrabajo import Otrabajo

router = APIRouter()

@router.post("/otrabajo/", response_model=Otrabajo)
async def crear_otrabajo(orden: Otrabajo):
    # Validar y generar número de orden con base en el TAG proporcionado
    nuevo_orden = await db.otrabajo.insert_one(orden.dict())
    return await db.otrabajo.find_one({"_id": nuevo_orden.inserted_id})
