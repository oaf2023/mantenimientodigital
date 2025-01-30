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
        
        print(f"Created directory at: {mdigital_path}")  # Debug log

        # Initialize MongoDB connection
        try:
            client = pymongo.MongoClient("mongodb://localhost:27017/")
            print("MongoDB connection successful")  # Debug log
            
            # Create or get database
            db = client["mantenimientodigital"]
            print(f"Database selected: {db.name}")  # Debug log

            # Create collections
            for collection_name in collections:
                if collection_name not in db.list_collection_names():
                    db.create_collection(collection_name)
                    print(f"Created collection: {collection_name}")

            return {"success": True, "message": "Database initialized successfully"}
        except pymongo.errors.ConnectionError as e:
            print(f"MongoDB connection error: {str(e)}")  # Debug log
            raise HTTPException(status_code=500, detail="Could not connect to MongoDB")
            
    except Exception as e:
        print(f"Error in initialize_database: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))