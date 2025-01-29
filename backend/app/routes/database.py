from fastapi import APIRouter, HTTPException
from typing import List
import os
import pymongo
from pathlib import Path

router = APIRouter()

@router.post("/initialize-database")
async def initialize_database(collections: List[str]):
    try:
        # Create mdigital directory if it doesn't exist
        mdigital_path = Path("C:/mdigital")
        mdigital_path.mkdir(parents=True, exist_ok=True)

        # Initialize MongoDB connection
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["mantenimientodigital"]

        # Create collections
        for collection_name in collections:
            if collection_name not in db.list_collection_names():
                db.create_collection(collection_name)
                print(f"Created collection: {collection_name}")

        return {"success": True, "message": "Database initialized successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))