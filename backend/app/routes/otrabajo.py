from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.otrabajo import Otrabajo

router = APIRouter()

@router.post("/otrabajo/", response_model=Otrabajo)
async def crear_otrabajo(orden: Otrabajo):
    # Validar y generar número de orden con base en el TAG proporcionado
    nuevo_orden = await db.otrabajo.insert_one(orden.dict())
    return await db.otrabajo.find_one({"_id": nuevo_orden.inserted_id})

@router.get("/ordenes_pendientes")
async def obtener_ordenes_pendientes():
    ordenes = await db.otrabajo.find({"estado_trabajo": "Pendiente"}).to_list(10)
    return [
        {
            "title": orden["numero_orden"],
            "orderDetails": {
                "date": orden["fecha_emision"].strftime("%d%m%Y"),
                "time": orden["fecha_emision"].strftime("%H%M"),
                "area": orden["area"],
                "tag": orden["codigo_equipo_tag"],
                "equipment": orden["nombre_equipo_sistema"],
                "priority": orden["prioridad"],
                "description": orden["descripcion_detallada"],
                "assignedTo": orden["responsable_mantenimiento"]
            }
        } for orden in ordenes
    ]

@router.get("/equipos_criticos")
async def obtener_equipos_criticos():
    equipos = await db.Activos.find({"importancia_critica": "Alta"}).to_list(5)
    return [{"title": equipo["nombre"]} for equipo in equipos]
