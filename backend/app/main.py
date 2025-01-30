from fastapi import FastAPI
from app.routes import work_orders, database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mantenimiento Digital")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(work_orders.router, prefix="/api/v1")
app.include_router(database.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "API de mantenimiento digital funcionando correctamente"}