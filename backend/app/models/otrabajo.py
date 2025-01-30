from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from app.databases import Base
from datetime import datetime

class Otrabajo(Base):
    __tablename__ = "otrabajo"

    id = Column(Integer, primary_key=True, index=True)
    numero_orden = Column(String(50), unique=True, index=True)
    fecha_emision = Column(DateTime, default=datetime.now)
    fecha_ejecucion_programada = Column(DateTime)
    prioridad = Column(String(20))
    solicitante = Column(String(100))
    nombre_equipo_sistema = Column(String(100))
    codigo_equipo_tag = Column(String(50))
    ubicacion_equipo_pid = Column(String(100))
    ubicacion_fisica = Column(String(100))
    en_altura = Column(Boolean, default=False)
    detalles = Column(Text)
    fabricante = Column(String(100))
    modelo_numero_serie = Column(String(100))
    horas_operacion = Column(Integer)
    tipo_mantenimiento = Column(String(50))
    descripcion_detallada = Column(Text)
    materiales_repuestos = Column(Text)
    herramientas_especiales = Column(Text)
    mano_obra_requerida = Column(Text)
    tiempo_estimado = Column(Integer)
    peligros_identificados = Column(Text)
    medidas_seguridad_aplicadas = Column(Text)
    impacto_ambiental_potencial = Column(Text)
    fecha_inicio_real = Column(DateTime)
    fecha_finalizacion_real = Column(DateTime)
    estado_trabajo = Column(String(20))
    resultados_inspeccion = Column(Text)
    observaciones_tecnico = Column(Text)
    responsable_mantenimiento = Column(String(100))
    supervisor_aprobador = Column(String(100))
    fecha_cierre = Column(DateTime)

    @classmethod
    async def generar_numero_orden(cls, db, codigo_equipo_tag):
        # Obtener el área del equipo desde la tabla Activos
        equipo = db.query(Activos).filter(Activos.codigo_tag == codigo_equipo_tag).first()
        if not equipo:
            raise ValueError("El equipo con el TAG especificado no existe.")
        
        area = equipo.area if equipo else "00"
        fecha_actual = datetime.now().strftime("%d%m%Y_%H%M")
        return f"{fecha_actual}_{area}_{codigo_equipo_tag}"