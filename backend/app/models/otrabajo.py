from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Otrabajo(BaseModel):
    numero_orden: str
    fecha_emision: datetime = datetime.now()
    fecha_ejecucion_programada: Optional[datetime]
    prioridad: str
    solicitante: str
    nombre_equipo_sistema: str
    codigo_equipo_tag: str
    ubicacion_equipo_pid: str
    ubicacion_fisica: str
    en_altura: bool = False
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
    supervisor_aprobador: Optional[str]
    fecha_cierre: Optional[datetime]

    @classmethod
    async def generar_numero_orden(cls, db, codigo_equipo_tag: str) -> str:
        try:
            # Buscar el equipo en la colección 'activos' de MongoDB
            activos_collection = db["activos"]
            equipo = activos_collection.find_one({"codigo_tag": codigo_equipo_tag})
            
            if not equipo:
                raise ValueError("El equipo con el TAG especificado no existe.")
            
            area = equipo.get("area", "00")
            fecha_actual = datetime.now().strftime("%d%m%Y_%H%M")
            return f"{fecha_actual}_{area}_{codigo_equipo_tag}"
            
        except Exception as e:
            print(f"Error al generar número de orden: {str(e)}")
            # En caso de error, generamos un número básico
            fecha_actual = datetime.now().strftime("%d%m%Y_%H%M")
            return f"{fecha_actual}_00_{codigo_equipo_tag}"