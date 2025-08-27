from fastapi import APIRouter
from app.databases import db

router = APIRouter()

# backend/app/routes/dashboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..dependencies import get_empresa_id
from ..databases import get_async_session
from ..models.work_order import WorkOrder

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/kpis")
async def kpis(
    empresa_id: int = Depends(get_empresa_id),
    db: AsyncSession = Depends(get_async_session),
):
    total = (await db.execute(
        select(func.count()).select_from(WorkOrder).where(WorkOrder.empresa_id == empresa_id)
    )).scalar_one()

    cerradas = (await db.execute(
        select(func.count()).select_from(WorkOrder).where(
            WorkOrder.empresa_id == empresa_id, WorkOrder.status == "Closed")
    )).scalar_one()

    # Placeholder: MTBF/MTTR requieren tiempos/fallas por equipo. Dejamos 0 hasta tener datos.
    return {
        "total_ot": total,
        "ot_cerradas": cerradas,
        "mtbf_horas": 0,
        "mttr_horas": 0,
        "pm_on_time": 0,  # para sprint 2
    }



@router.get("/dashboard")
async def obtener_dashboard():
    ordenes_activas = await db.otrabajo.count_documents({"estado_trabajo": "Activa"})
    completadas_hoy = await db.otrabajo.count_documents({"estado_trabajo": "Completada"})
    
    # Consulta para calcular tiempo medio de reparación
    tiempo_medio_reparacion_pipeline = [
        {"$match": {"estado_trabajo": "Completada"}},
        {"$project": {"tiempo_reparacion": {"$subtract": ["$fecha_finalizacion_real", "$fecha_inicio_real"]}}},
        {"$group": {"_id": None, "promedio": {"$avg": "$tiempo_reparacion"}}}
    ]
    resultado_tiempo = await db.otrabajo.aggregate(tiempo_medio_reparacion_pipeline).to_list(1)
    tiempo_medio_reparacion = resultado_tiempo[0]["promedio"] / 3600000 if resultado_tiempo else 0

    # Datos de órdenes pendientes y equipos críticos
    ordenes_pendientes = await db.otrabajo.find({"estado_trabajo": "Pendiente"}).to_list(5)
    estado_mensual = [
        {"name": "Completadas", "value": 120},
        {"name": "Falta Repuestos", "value": 20},
        {"name": "Falta Tiempo", "value": 15},
        {"name": "Falta Personal", "value": 10},
    ]

    return {
        "ordenes_activas": ordenes_activas,
        "tiempo_medio_reparacion": round(tiempo_medio_reparacion, 2),
        "completadas_hoy": completadas_hoy,
        "costo_medio_reparacion": 2450,  # Puedes obtener esto de la DB si lo necesitas
        "personal_por_orden": 3.5,       # Puedes obtener esto de la DB si lo necesitas
        "ordenes_pendientes": ordenes_pendientes,
        "estado_mensual": estado_mensual
    }
"""
async def obtener_dashboard():
    ordenes_activas = await db.otrabajo.count_documents({"estado_trabajo": "Activa"})
    completadas_hoy = await db.otrabajo.count_documents({"estado_trabajo": "Completada"})
    tiempo_medio_reparacion = await calcular_tiempo_medio()
    costo_medio_reparacion = await calcular_costo_medio()
    personal_por_orden = await calcular_personal_promedio()

    return {
        "ordenes_activas": ordenes_activas,
        "tiempo_medio_reparacion": round(tiempo_medio_reparacion, 2),
        "completadas_hoy": completadas_hoy,
        "costo_medio_reparacion": round(costo_medio_reparacion, 2),
        "personal_por_orden": round(personal_por_orden, 2),
    }
"""
async def calcular_tiempo_medio():
    pipeline = [
        {"$match": {"estado_trabajo": "Completada"}},
        {"$project": {"duracion": {"$subtract": ["$fecha_finalizacion_real", "$fecha_inicio_real"]}}},
        {"$group": {"_id": None, "promedio": {"$avg": "$duracion"}}}
    ]
    resultado = await db.otrabajo.aggregate(pipeline).to_list(1)
    return resultado[0]["promedio"] / 3600000 if resultado else 0  # Convertir milisegundos a horas

async def calcular_costo_medio():
    pipeline = [
        {"$match": {"estado_trabajo": "Completada"}},
        {"$group": {"_id": None, "promedio": {"$avg": "$costo_total"}}}
    ]
    resultado = await db.otrabajo.aggregate(pipeline).to_list(1)
    return resultado[0]["promedio"] if resultado else 0

async def calcular_personal_promedio():
    pipeline = [
        {"$match": {"estado_trabajo": "Completada"}},
        {"$group": {"_id": None, "promedio": {"$avg": "$personal_requerido"}}}
    ]
    resultado = await db.otrabajo.aggregate(pipeline).to_list(1)
    return resultado[0]["promedio"] if resultado else 0
