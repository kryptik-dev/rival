from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
import motor.motor_asyncio
from pymongo import MongoClient
import uvicorn

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="RIVAL API", description="RIVAL Xbox 360 Stealth Server API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/rival_db")

try:
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
    database = client.get_database()
    print(f"Connected to MongoDB at {MONGO_URL}")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    database = None

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "RIVAL API is running", "status": "active", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    db_status = "connected" if database is not None else "disconnected"
    return {
        "status": "healthy",
        "database": db_status,
        "service": "RIVAL API"
    }

@app.get("/api/features")
async def get_features():
    """Get stealth features"""
    features = [
        {
            "id": 1,
            "title": "KV Protection",
            "description": "Advanced console key vault protection",
            "icon": "shield"
        },
        {
            "id": 2,
            "title": "Real-Time Stealth",
            "description": "Live stealth monitoring and protection",
            "icon": "eye-slash"
        },
        {
            "id": 3,
            "title": "Bypasses Latest Dash",
            "description": "Works with all current dashboard versions",
            "icon": "check-circle"
        },
        {
            "id": 4,
            "title": "Compatible with All Consoles",
            "description": "Supports all Xbox 360 console types",
            "icon": "gamepad"
        },
        {
            "id": 5,
            "title": "High Uptime",
            "description": "99.9% server uptime guarantee",
            "icon": "server"
        },
        {
            "id": 6,
            "title": "Frequent Updates",
            "description": "Regular updates for latest protections",
            "icon": "refresh"
        }
    ]
    return {"features": features}

@app.get("/api/pricing")
async def get_pricing():
    """Get pricing tiers"""
    pricing = [
        {
            "id": 1,
            "name": "Trial",
            "price": 1.99,
            "duration": "3 Days",
            "popular": False,
            "features": ["Basic stealth protection", "Email support", "Standard uptime"]
        },
        {
            "id": 2,
            "name": "Bronze",
            "price": 3.99,
            "duration": "1 Week",
            "popular": False,
            "features": ["Full stealth protection", "Priority support", "High uptime"]
        },
        {
            "id": 3,
            "name": "Silver",
            "price": 5.99,
            "duration": "2 Weeks",
            "popular": True,
            "features": ["Full stealth protection", "Priority support", "Premium uptime", "Advanced features"]
        },
        {
            "id": 4,
            "name": "Gold",
            "price": 9.99,
            "duration": "1 Month",
            "popular": False,
            "features": ["Full stealth protection", "VIP support", "Premium uptime", "All features", "Early access"]
        },
        {
            "id": 5,
            "name": "Lifetime",
            "price": 19.99,
            "duration": "Forever",
            "popular": False,
            "features": ["Full stealth protection", "VIP support", "Premium uptime", "All features", "Early access", "Lifetime updates"]
        }
    ]
    return {"pricing": pricing}

@app.get("/api/status")
async def get_server_status():
    """Get server status"""
    return {
        "server_status": "online",
        "uptime": "99.9%",
        "active_users": 1247,
        "last_update": "2024-03-15T10:30:00Z"
    }

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)