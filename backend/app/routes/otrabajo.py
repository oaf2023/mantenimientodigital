from fastapi import APIRouter, HTTPException, Depends
from pymongo import MongoClient
from app.models.otrabajo import Otrabajo
from typing import List
from datetime import datetime

router = APIRouter()

# Configuración de MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mantenimientodigital"]

@router.post("/otrabajo/")
async def crear_otrabajo(orden: dict):
    try:
        # Generar número de orden
        numero_orden = await Otrabajo.generar_numero_orden(db, orden["codigo_equipo_tag"])
        orden["numero_orden"] = numero_orden
        
        # Insertar en MongoDB
        result = db.otrabajo.insert_one(orden)
        
        if result.inserted_id:
            orden["_id"] = str(result.inserted_id)
            return orden
        raise HTTPException(status_code=500, detail="Error al crear la orden de trabajo")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ordenes_pendientes")
async def obtener_ordenes_pendientes():
    try:
        ordenes = list(db.otrabajo.find(
            {"estado_trabajo": "Pendiente"},
            {"_id": 0}  # Excluir el campo _id
        ).limit(10))
        
        return [
            {
                "title": orden["numero_orden"],
                "orderDetails": {
                    "date": datetime.strptime(orden["fecha_emision"], "%Y-%m-%dT%H:%M:%S.%f").strftime("%d%m%Y") if isinstance(orden["fecha_emision"], str) else orden["fecha_emision"].strftime("%d%m%Y"),
                    "time": datetime.strptime(orden["fecha_emision"], "%Y-%m-%dT%H:%M:%S.%f").strftime("%H%M") if isinstance(orden["fecha_emision"], str) else orden["fecha_emision"].strftime("%H%M"),
                    "area": orden.get("area", ""),
                    "tag": orden["codigo_equipo_tag"],
                    "equipment": orden["nombre_equipo_sistema"],
                    "priority": orden["prioridad"],
                    "description": orden.get("descripcion_detallada", ""),
                    "assignedTo": orden["responsable_mantenimiento"]
                }
            } for orden in ordenes
        ]
    except Exception as e:
        print(f"Error al obtener órdenes pendientes: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener las órdenes pendientes")

@router.get("/equipos_criticos")
async def obtener_equipos_criticos():
    try:
        equipos = list(db.activos.find(
            {"importancia_critica": "Alta"},
            {"_id": 0, "nombre": 1}
        ).limit(5))
        
        return [{"title": equipo["nombre"]} for equipo in equipos]
    except Exception as e:
        print(f"Error al obtener equipos críticos: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener los equipos críticos")