from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.work_order import WorkOrder

router = APIRouter()

@router.post("/work-orders/", response_model=WorkOrder)
async def create_work_order(order: WorkOrder):
    new_order = await db.work_orders.insert_one(order.dict())
    created_order = await db.work_orders.find_one({"_id": new_order.inserted_id})
    return created_order
