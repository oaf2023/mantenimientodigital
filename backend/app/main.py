from fastapi import FastAPI
from app.routes import work_orders, database

app = FastAPI(title="Mantenimiento Digital ")

app.include_router(work_orders.router, prefix="/api/v1")
app.include_router(database.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "API de mantenimiento digital funcionando correctamente"}