# backend/app/routes/failure_codes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from ..dependencies import get_empresa_id
from ..databases import get_async_session
from ..models.failure_code import FailureCode

router = APIRouter(prefix="/api/failure_codes", tags=["failure_codes"])

class FailureCodeIn(BaseModel):
    kind: str  # 'falla'|'causa'|'accion'
    code: str
    description: str

@router.get("/")
async def list_codes(
    kind: str | None = None,
    empresa_id: int = Depends(get_empresa_id),
    db: AsyncSession = Depends(get_async_session),
):
    q = select(FailureCode).where(FailureCode.empresa_id == empresa_id)
    if kind:
        q = q.where(FailureCode.kind == kind)
    res = await db.execute(q)
    return res.scalars().all()

@router.post("/")
async def create_code(
    payload: FailureCodeIn,
    empresa_id: int = Depends(get_empresa_id),
    db: AsyncSession = Depends(get_async_session),
):
    fc = FailureCode(empresa_id=empresa_id, **payload.model_dump())
    db.add(fc)
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise HTTPException(400, "Código duplicado o inválido")
    await db.refresh(fc)
    return fc
