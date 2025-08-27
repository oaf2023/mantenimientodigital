# backend/app/models/work_order.py
from datetime import datetime
from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import relationship
from .base import Base  # ver nota en punto 1
# Importar el catálogo
from .failure_code import FailureCode

class WorkOrder(Base):
    __tablename__ = "work_order"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    empresa_id: Mapped[int] = mapped_column(Integer, index=True, nullable=False)

    equipo_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("equipo.id"), index=True)
    type: Mapped[str] = mapped_column(String(5), nullable=False)  # CM|PM|PdM|INSP|IMPR
    status: Mapped[str] = mapped_column(String(20), index=True, nullable=False, default="Draft")
    priority: Mapped[int] = mapped_column(Integer, default=3)

    summary: Mapped[str] = mapped_column(String(255), nullable=False)
    scheduled_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    closed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # Campos de cierre ISO 14224 (opcionales hasta cerrar)
    failure_code_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("failure_code.id"))
    cause_code_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("failure_code.id"))
    action_code_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("failure_code.id"))

    failure_code = relationship("FailureCode", foreign_keys=[failure_code_id])
    cause_code = relationship("FailureCode", foreign_keys=[cause_code_id])
    action_code = relationship("FailureCode", foreign_keys=[action_code_id])
