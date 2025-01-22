from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class WorkOrder(BaseModel):
    id: Optional[str]
    title: str
    description: str
    status: str
    created_at: datetime = datetime.now()
