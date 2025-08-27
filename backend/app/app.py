# backend/app.py
from flask import Flask
from .routes.auth_routes import auth_routes

# backend/app/app.py  (o main.py según uses)
from fastapi import FastAPI
from .routes import work_orders, failure_codes, dashboard  # asegurate que el paquete routes tenga __init__.py

app = FastAPI(title="ManteGral API")

app.include_router(work_orders.router)
app.include_router(failure_codes.router)
app.include_router(dashboard.router)




