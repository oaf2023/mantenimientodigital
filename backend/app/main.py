from fastapi import FastAPI
from app.routes import work_orders

app = FastAPI(title="Mantenimiento Digital API")

app.include_router(work_orders.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "API de mantenimiento digital funcionando correctamente"}
