from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.databases import get_db
from app.models.otrabajo import Otrabajo
from typing import List
from datetime import datetime

router = APIRouter()

@router.post("/otrabajo/")
async def crear_otrabajo(orden: dict, db: Session = Depends(get_db)):
    db_orden = Otrabajo(**orden)
    db_orden.numero_orden = await Otrabajo.generar_numero_orden(db, orden["codigo_equipo_tag"])
    db.add(db_orden)
    db.commit()
    db.refresh(db_orden)
    return db_orden

@router.get("/ordenes_pendientes")
async def obtener_ordenes_pendientes(db: Session = Depends(get_db)):
    ordenes = db.query(Otrabajo).filter(Otrabajo.estado_trabajo == "Pendiente").limit(10).all()
    return [
        {
            "title": orden.numero_orden,
            "orderDetails": {
                "date": orden.fecha_emision.strftime("%d%m%Y"),
                "time": orden.fecha_emision.strftime("%H%M"),
                "area": orden.area,
                "tag": orden.codigo_equipo_tag,
                "equipment": orden.nombre_equipo_sistema,
                "priority": orden.prioridad,
                "description": orden.descripcion_detallada,
                "assignedTo": orden.responsable_mantenimiento
            }
        } for orden in ordenes
    ]

@router.get("/equipos_criticos")
async def obtener_equipos_criticos(db: Session = Depends(get_db)):
    equipos = db.query(Activos).filter(Activos.importancia_critica == "Alta").limit(5).all()
    return [{"title": equipo.nombre} for equipo in equipos]