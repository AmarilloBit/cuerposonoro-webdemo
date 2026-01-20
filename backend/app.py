"""
Cuerpo Sonoro Web - Backend Server
FastAPI application with WebSocket for real-time pose feature extraction
"""

import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
import json
import logging
from features import FeatureExtractor

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Cuerpo Sonoro Web")
extractor = FeatureExtractor()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time landmark processing.
    Receives: landmarks array from MediaPipe (33 points)
    Sends: calculated features (energy, symmetry, smoothness, etc.)
    """
    await websocket.accept()
    logger.info("Client connected")

    prev_landmarks = None

    try:
        while True:
            data = await websocket.receive_text()
            landmarks = json.loads(data)

            features = extractor.calculate(landmarks, prev_landmarks)
            prev_landmarks = landmarks

            await websocket.send_text(json.dumps(features))

    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Error: {e}")


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "ok"}


# Serve frontend static files (only for local development)
# In Docker, Nginx serves the frontend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

if os.path.exists(FRONTEND_DIR):
    app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
    logger.info(f"Serving frontend from {FRONTEND_DIR}")
else:
    logger.info("Frontend directory not found - running in API-only mode (Docker)")
