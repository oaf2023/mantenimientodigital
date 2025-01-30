from fastapi import APIRouter, HTTPException
from typing import List
import os
import pymongo
from pathlib import Path

router = APIRouter()

@router.post("/initialize-database")
async def initialize_database(request: dict):
    try:
        path = request.get("path")
        collections = request.get("collections", [])
        
        if not path:
            raise HTTPException(status_code=400, detail="Path is required")
            
        # Create directory if it doesn't exist
        directory = Path(path)
        directory.mkdir(parents=True, exist_ok=True)
        
        print(f"Created directory at: {directory}")

        # Initialize MongoDB connection
        try:
            client = pymongo.MongoClient("mongodb://localhost:27017/")
            print("MongoDB connection successful")
            
            # Create or get database
            db = client["mantenimientodigital"]
            print(f"Database selected: {db.name}")

            # Create collections
            for collection_name in collections:
                if collection_name not in db.list_collection_names():
                    db.create_collection(collection_name)
                    print(f"Created collection: {collection_name}")

            return {
                "success": True,
                "message": "Database initialized successfully",
                "path": str(directory),
                "collections": collections
            }
        except pymongo.errors.ConnectionError as e:
            print(f"MongoDB connection error: {str(e)}")
            raise HTTPException(status_code=500, detail="Could not connect to MongoDB")
            
    except Exception as e:
        print(f"Error in initialize_database: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))