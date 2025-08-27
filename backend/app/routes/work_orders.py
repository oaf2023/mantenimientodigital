# backend/app/routes/work_orders.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..dependencies import get_empresa_id
from ..databases import get_async_session  # ajustá si tu factory es otra
from ..models.work_order import WorkOrder
from ..models.failure_code import FailureCode
from pydantic import BaseModel

router = APIRouter(prefix="/api/work_orders", tags=["work_orders"])

class WorkOrderIn(BaseModel):
    equipo_id: int | None = None
    type: str
    priority: int = 3
    summary: str

class StatusChange(BaseModel):
    to: str
    failure_code_id: int | None = None
    cause_code_id: int | None = None
    action_code_id: int | None = None

ALLOWED_TRANSITIONS = {
    "Draft": {"Planned"},
    "Planned": {"Assigned"},
    "Assigned": {"InProgress"},
    "InProgress": {"QA", "OnHold"},
    "OnHold": {"InProgress"},
    "QA": {"Closed"},
    "Closed": set(),
}

@router.get("/")
async def list_work_orders(
    empresa_id: int = Depends(get_empresa_id),
    db: AsyncSession = Depends(get_async_session),
):
    q = select(WorkOrder).where(WorkOrder.empresa_id == empresa_id)
    res = await db.execute(q)
    return res.scalars().all()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_work_order(
    payload: WorkOrderIn,
    empresa_id: int = Depends(get_empresa_id),
    db: AsyncSession = Depends(get_async_session),
):
    ot = WorkOrder(
        empresa_id=empresa_id,
        equipo_id=payload.equipo_id,
        type=payload.type,
        priority=payload.priority,
        summary=payload.summary,
        status="Draft",
    )
    db.add(ot)
    await db.commit()
    await db.refresh(ot)
    return ot

@router.patch("/{ot_id}/status")
async def transition_status(
    ot_id: int,
    change: StatusChange,
    empresa_id: int = Depends(get_empresa_id),
    db: AsyncSession = Depends(get_async_session),
):
    ot = await db.get(WorkOrder, ot_id)
    if not ot or ot.empresa_id != empresa_id:
        raise HTTPException(404, "OT no encontrada")

    if change.to not in ALLOWED_TRANSITIONS.get(ot.status, set()):
        raise HTTPException(400, "Transición inválida")

    # Si cierra, validar catálogos
    if change.to == "Closed":
        if not (change.failure_code_id and change.cause_code_id and change.action_code_id):
            raise HTTPException(400, "Para cerrar se requiere falla, causa y acción (ISO 14224)")

        # Validar que los códigos existan y sean de la empresa
        for kind, code_id in (("falla", change.failure_code_id),
                              ("causa", change.cause_code_id),
                              ("accion", change.action_code_id)):
            fc = await db.get(FailureCode, code_id)
            if not fc or fc.empresa_id != empresa_id or fc.kind != kind:
                raise HTTPException(400, f"Código {kind} inválido para esta empresa")

        ot.failure_code_id = change.failure_code_id
        ot.cause_code_id = change.cause_code_id
        ot.action_code_id = change.action_code_id

    ot.status = change.to
    await db.commit()
    await db.refresh(ot)
    return ot
