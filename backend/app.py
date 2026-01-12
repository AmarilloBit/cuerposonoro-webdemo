"""
Cuerpo Sonoro Web - Backend Server
FastAPI application with WebSocket for real-time pose feature extraction
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
import json
import logging
from features import FeatureExtractor

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Cuerpo Sonoro Web") # var that uvicorn searches for
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
            # Receive landmarks from browser
            data = await websocket.receive_text()
            landmarks = json.loads(data)

            # Calculate features using existing code
            features = extractor.calculate(landmarks, prev_landmarks)
            prev_landmarks = landmarks

            # Send features back
            await websocket.send_text(json.dumps(features))

    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Error: {e}")


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "ok"}


# Serve frontend static files:
#   Mounts frontend/ folder at root. When access http://localhost:8000/, serves index.html.
# In production, Nginx handles this, but useful for local development
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
