from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime
from app.databases import db

class Otrabajo(BaseModel):
    numero_orden: Optional[str] = None
    fecha_emision: datetime
    fecha_ejecucion_programada: datetime
    prioridad: str
    solicitante: str
    nombre_equipo_sistema: str
    codigo_equipo_tag: str
    ubicacion_equipo_pid: str
    ubicacion_fisica: str
    en_altura: bool
    detalles: Optional[str]
    fabricante: Optional[str]
    modelo_numero_serie: Optional[str]
    horas_operacion: Optional[int]
    tipo_mantenimiento: str
    descripcion_detallada: Optional[str]
    materiales_repuestos: Optional[str]
    herramientas_especiales: Optional[str]
    mano_obra_requerida: Optional[str]
    tiempo_estimado: Optional[int]
    peligros_identificados: Optional[str]
    medidas_seguridad_aplicadas: Optional[str]
    impacto_ambiental_potencial: Optional[str]
    fecha_inicio_real: Optional[datetime]
    fecha_finalizacion_real: Optional[datetime]
    estado_trabajo: str
    resultados_inspeccion: Optional[str]
    observaciones_tecnico: Optional[str]
    responsable_mantenimiento: str
    supervisor_aprobador: str
    fecha_cierre: Optional[datetime]

    @validator("numero_orden", pre=True, always=True)
    async def generar_numero_orden(cls, v, values):
        if "codigo_equipo_tag" in values and values["codigo_equipo_tag"]:
            # Obtener el área del equipo desde la colección "Activos"
            equipo = await db.Activos.find_one({"codigo_tag": values["codigo_equipo_tag"]})
            if not equipo:
                raise ValueError("El equipo con el TAG especificado no existe.")
            
            area = equipo.get("area", "00")  # Por defecto "00" si no se encuentra
            fecha_actual = datetime.now().strftime("%d%m%Y_%H%M")
            tag = values["codigo_equipo_tag"]
            return f"{fecha_actual}_{area}_{tag}"
        raise ValueError("El campo 'codigo_equipo_tag' es requerido para generar el número de orden.")
