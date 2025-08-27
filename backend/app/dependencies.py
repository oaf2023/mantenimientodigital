# backend/app/dependencies.py
from fastapi import Depends, Header, HTTPException

def get_empresa_id(x_empresa_id: int | None = Header(default=None)):
    # Placeholder: si ya tenés JWT, extraelo del token.
    if x_empresa_id is None:
        raise HTTPException(status_code=400, detail="Falta encabezado X-Empresa-Id")
    return x_empresa_id
