# backend/app/models/failure_code.py
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Index
from .base import Base  # si no existe, ver nota al final

class FailureCode(Base):
    __tablename__ = "failure_code"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    empresa_id: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
    # kind: 'falla' | 'causa' | 'accion'
    kind: Mapped[str] = mapped_column(String(10), nullable=False)
    code: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)

    __table_args__ = (
        Index("uq_failure_code", "empresa_id", "kind", "code", unique=True),
    )
