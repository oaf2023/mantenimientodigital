from datetime import datetime

# Pipeline para obtener el historial de mantenimiento por equipo
def pipeline_historial_mantenimiento(codigo_equipo):
    return [
        {"$match": {"codigo_equipo_tag": codigo_equipo}},
        {"$project": {
            "numero_orden": 1,
            "fecha_emision": 1,
            "estado_trabajo": 1,
            "responsable_mantenimiento": 1,
            "fecha_inicio_real": 1,
            "fecha_finalizacion_real": 1,
            "_id": 0
        }},
        {"$sort": {"fecha_emision": -1}}
    ]

# Pipeline para calcular el tiempo promedio de resolución de órdenes
def pipeline_tiempo_promedio_resolucion():
    return [
        {"$match": {"fecha_inicio_real": {"$exists": True}, "fecha_finalizacion_real": {"$exists": True}}},
        {"$project": {
            "tiempo_resolucion": {
                "$subtract": ["$fecha_finalizacion_real", "$fecha_inicio_real"]
            }
        }},
        {"$group": {
            "_id": None,
            "tiempo_promedio": {"$avg": "$tiempo_resolucion"}
        }}
    ]

# Pipeline para generar reportes de mantenimiento por prioridad
def pipeline_reporte_prioridad():
    return [
        {"$group": {
            "_id": "$prioridad",
            "total": {"$sum": 1}
        }},
        {"$sort": {"total": -1}}
    ]

# Pipeline para obtener las órdenes de trabajo de los últimos X días
def pipeline_ordenes_recientes(dias):
    fecha_limite = datetime.now().timestamp() - (dias * 86400)
    return [
        {"$match": {"fecha_emision": {"$gte": fecha_limite}}},
        {"$project": {"numero_orden": 1, "estado_trabajo": 1, "prioridad": 1, "fecha_emision": 1}}
    ]
