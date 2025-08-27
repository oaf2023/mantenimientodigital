# backend/app/main.py  (agregar si falta)
from fastapi import FastAPI
from .routes import work_orders, failure_codes, dashboard

app = FastAPI(title="ManteGral API")

app.include_router(work_orders.router)
app.include_router(failure_codes.router)
app.include_router(dashboard.router)
