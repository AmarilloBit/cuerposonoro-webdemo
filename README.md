# Cuerpo Sonoro — Web Demo

**Browser-based demo of the [Cuerpo Sonoro](https://github.com/AmarilloBit/cuerposonoro) interactive installation.**

Try the experience from your own webcam — no software installation required. The web demo captures your body movement through MediaPipe pose detection running directly in the browser, sends landmarks to a server for feature extraction, and generates real-time audio synthesis through the Web Audio API.

**Live at:** [cuerposonoro.art](https://cuerposonoro.art)

> 🎓 Part of the Final Degree Project (TFG) · Software Engineering · Universidad Rey Juan Carlos · 2025/2026

---

## Table of Contents

- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Frontend Components](#frontend-components)
- [Backend Components](#backend-components)
- [Features & Audio Mapping](#features--audio-mapping)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Run Locally (without Docker)](#run-locally-without-docker)
  - [Run with Docker](#run-with-docker)
- [Deployment](#deployment)
  - [Server Setup (Hetzner VPS)](#server-setup-hetzner-vps)
  - [Domain & SSL Configuration](#domain--ssl-configuration)
  - [Deploy with Docker Compose](#deploy-with-docker-compose)
  - [SSL Certificate Renewal](#ssl-certificate-renewal)
- [Browser Compatibility](#browser-compatibility)
- [Troubleshooting](#troubleshooting)
- [Relationship to Main Project](#relationship-to-main-project)
- [Tech Stack](#tech-stack)
- [License](#license)
- [Author](#author)

---

## How It Works

1. **Camera** — The browser requests webcam access via `getUserMedia` API.
2. **Pose Detection** — MediaPipe Pose (loaded via CDN) detects 33 body landmarks in real time, directly in the browser.
3. **Feature Extraction** — Landmarks are sent to the FastAPI backend via WebSocket. The server calculates motion features: energy, symmetry, smoothness, arm angle, and vertical extension.
4. **Audio Synthesis** — Features are returned to the browser and mapped to audio parameters using the Web Audio API: dual detuned sawtooth oscillators through a dynamic low-pass filter with stereo panning.

The entire experience runs at ~30 FPS with low latency.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                                                              │
│  Webcam → MediaPipe.js → WebSocket Client → Web Audio API    │
│  (camera.js) (pose.js)   (websocket.js)     (audio.js)       │
│                    ↘                    ↙                    │
│                       main.js (orchestrator)                 │
│                                                              │
│  config.js ─── centralized configuration for all modules     │
└──────────────────────────┬───────────────────────────────────┘
                           │ landmarks (JSON via WebSocket)
                           │ features  (JSON via WebSocket)
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    Docker (Production)                       │
│                                                              │
│  ┌──────────────┐          ┌───────────────────────────┐     │
│  │    Nginx     │          │        Backend            │     │
│  │   :80/:443   │─────────►│        :8000              │     │
│  │              │   /ws    │  FastAPI + WebSocket      │     │
│  │  (static     │          │  Feature extraction       │     │
│  │   files)     │          │  (features.py)            │     │
│  └──────────────┘          └───────────────────────────┘     │
│         │                                                    │
│         │ serves frontend/                                   │
│         ▼                                                    │
│  ┌──────────────┐                                            │
│  │   Frontend   │                                            │
│  │   (volume)   │                                            │
│  └──────────────┘                                            │
└──────────────────────────────────────────────────────────────┘
```

In **local development**, FastAPI serves both the frontend static files and the WebSocket endpoint. In **production**, Nginx handles static file serving and proxies WebSocket connections to the backend.

---

## Frontend Components

| File | Responsibility |
|------|----------------|
| `index.html` | Page structure, feature display bars, start/stop controls |
| `css/style.css` | Dark theme UI, responsive layout, visual feedback bars |
| `js/config.js` | Centralized configuration for all frontend modules |
| `js/main.js` | App orchestrator — coordinates camera, pose, WebSocket, and audio at ~30 FPS |
| `js/camera.js` | Webcam access via `getUserMedia` API |
| `js/pose.js` | MediaPipe Pose detection wrapper + skeleton overlay drawing |
| `js/websocket.js` | WebSocket client with auto-reconnect and exponential backoff |
| `js/audio.js` | Web Audio API synthesis engine (oscillators, filter, panner, LFO) |

### Audio Engine Details

The synthesis engine creates a rich sound from simple building blocks: two slightly detuned sawtooth oscillators are mixed and routed through a dynamic low-pass filter, then into a stereo panner and master gain node. An LFO adds subtle modulation. All parameter transitions use `linearRampToValueAtTime` for smooth, click-free changes.

### Pose Detection

MediaPipe Pose runs at `model_complexity: 1` in the browser, providing a good balance between accuracy and performance. The video feed is displayed with a mirror effect for natural interaction, and the skeleton overlay is drawn on a canvas layer on top.

---

## Backend Components

| File | Responsibility |
|------|----------------|
| `app.py` | FastAPI server with WebSocket endpoint (`/ws`) and health check (`/health`) |
| `features.py` | `FeatureExtractor` class — calculates motion features from landmark data |
| `requirements.txt` | Python dependencies |
| `Dockerfile` | Python 3.11-slim container image |

### Feature Extraction

The backend `FeatureExtractor` receives raw landmark arrays (33 points × 4 values each) and computes 5 motion descriptors:

| Feature | Description | Range |
|---------|-------------|-------|
| `energy` | Overall body motion intensity (velocity between frames) | 0.0 – 1.0 |
| `symmetry` | Left-right body balance | -1.0 – 1.0 |
| `smoothness` | Movement fluidity vs abruptness (jerk-based) | 0.0 – 1.0 |
| `armAngle` | Average arm extension angle | 0.0 – 1.0 |
| `verticalExtension` | Vertical reach of hands relative to body | 0.0 – 1.0 |

Features are smoothed with an exponential moving average (configurable smoothing factor) to prevent jitter in the audio output.

---

## Features & Audio Mapping

| Feature | Audio Parameter | Effect |
|---------|----------------|--------|
| `energy` | Volume + filter resonance | More movement → louder, brighter sound |
| `symmetry` | Stereo panning | Body tilted left → sound pans left |
| `smoothness` | Filter cutoff frequency | Smooth motion → open filter; abrupt → closed |
| `armAngle` | Pitch (pentatonic scale) | Arms extended → higher pitch |
| `verticalExtension` | LFO depth (vibrato) | Hands raised → more modulation |

The UI displays real-time feature bars so the performer can see how their movement maps to each parameter.

---

## Project Structure

```
cuerposonoro-webdemo/
├── backend/
│   ├── Dockerfile           # Python 3.11-slim container
│   ├── app.py               # FastAPI server + WebSocket endpoint
│   ├── features.py          # Motion feature extraction
│   ├── requirements.in      # Top-level dependencies
│   └── requirements.txt     # Pinned dependencies
├── frontend/
│   ├── index.html           # Main page
│   ├── css/
│   │   └── style.css        # Dark theme, feature bars, responsive layout
│   └── js/
│       ├── config.js        # Centralized configuration
│       ├── main.js          # App orchestrator
│       ├── camera.js        # Webcam access
│       ├── pose.js          # MediaPipe pose detection
│       ├── websocket.js     # WebSocket client
│       └── audio.js         # Web Audio synthesis engine
├── docker-compose.yml       # Backend + Nginx orchestration
├── nginx.conf               # Reverse proxy + SSL + WebSocket
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python 3.10+**
- **Docker** (recommended for production-like setup)
- A **webcam**
- A modern browser (Chrome, Firefox, Safari, or Edge)

### Run Locally (without Docker)

1. **Clone the repository:**

```bash
git clone https://github.com/AmarilloBit/cuerposonoro-webdemo.git
cd cuerposonoro-webdemo
```

2. **Set up the backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate        # macOS/Linux
pip install -r requirements.txt
```

3. **Start the server:**

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

4. **Open in browser:**

Navigate to `http://localhost:8000`. You must use `localhost` (not `0.0.0.0` or `127.0.0.1`) for the browser to grant camera access over HTTP.

5. Click **Start** and allow camera access when prompted.

### Run with Docker

1. **Clone and build:**

```bash
git clone https://github.com/AmarilloBit/cuerposonoro-webdemo.git
cd cuerposonoro-webdemo
docker compose up --build
```

2. **Open in browser:**

Navigate to `http://localhost`. Nginx serves the frontend on port 80 and proxies WebSocket connections to the backend.

3. **Stop:**

```bash
docker compose down
```

---

## Deployment

The live demo at [cuerposonoro.art](https://cuerposonoro.art) is deployed on a Hetzner cloud VPS. HTTPS is required for browser camera access in production.

### Server Setup (Hetzner VPS)

1. **Create a VPS:** Ubuntu 24.04, CX22 (2 vCPU, 4 GB RAM), European datacenter.

2. **Install Docker on the server:**

```bash
ssh root@your-server-ip
apt update && apt upgrade -y
apt install -y docker.io docker-compose-v2
systemctl enable docker
```

3. **Clone the repo on the server:**

```bash
git clone https://github.com/AmarilloBit/cuerposonoro-webdemo.git ~/cuerposonoro-webdemo
```

### Domain & SSL Configuration

1. **Configure DNS:** Add an `A` record pointing your domain to the server's IP address (e.g., via CDMON, Namecheap, Cloudflare, etc.).

2. **Wait for DNS propagation.** Verify with:

```bash
ping cuerposonoro.art
```

3. **Generate SSL certificate with Certbot:**

```bash
apt install -y certbot
docker compose down                              # Free port 80
certbot certonly --standalone -d your-domain.art
```

4. **Update `nginx.conf`** with your domain and certificate paths:

```nginx
ssl_certificate /etc/letsencrypt/live/your-domain.art/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.art/privkey.pem;
```

### Deploy with Docker Compose

```bash
cd ~/cuerposonoro-webdemo
docker compose up -d --build
```

The Nginx configuration handles HTTP → HTTPS redirection, serves the frontend as static files, and proxies `/ws` to the FastAPI backend with WebSocket upgrade support.

### SSL Certificate Renewal

Certbot sets up automatic renewal. To renew manually:

```bash
docker compose down
certbot renew
docker compose up -d
```

---

## Browser Compatibility

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ (recommended on iPhone) |
| Edge | ✅ | ✅ |

**Note on mobile:** HTTPS is required for camera access. On iPhone, Safari provides the most reliable camera experience — Chrome on iOS has known limitations with `getUserMedia`.

---

## Troubleshooting

**Camera permission denied:**
- Make sure you're accessing the site via `https://` (production) or `http://localhost` (development).
- Check browser settings: Site Settings → Camera → Allow for the domain.
- On iPhone with Chrome: go to iOS Settings → Chrome → Camera → Allow. Alternatively, use Safari.

**WebSocket not connecting:**
- Verify the backend is running: `curl http://localhost:8000/health` should return `{"status": "ok"}`.
- Check browser console for WebSocket errors.
- In Docker: `docker compose logs -f backend` to see server logs.

**CONFIG is not defined:**
- Make sure `config.js` is included in `index.html` before all other scripts.

**No sound:**
- Click the "Start" button — the Web Audio API requires a user interaction before playing audio.
- Check that your browser tab is not muted.

---

## Relationship to Main Project

This web demo is a companion to the main [Cuerpo Sonoro](https://github.com/AmarilloBit/cuerposonoro) project. The main project runs a full local pipeline with SuperCollider audio synthesis and MIDI/MPE output, supporting all 12 MPE features for detailed musical control.

The web demo is a simplified version with 5 core features and browser-based audio synthesis, designed to make the experience accessible to anyone with a webcam and a modern browser.

| Aspect | Main Project | Web Demo |
|--------|-------------|----------|
| Pose detection | MediaPipe (Python) | MediaPipe.js (browser) |
| Audio synthesis | SuperCollider / Surge XT | Web Audio API |
| Communication | OSC / MIDI | WebSocket |
| Features | 12 MPE features | 5 core features |
| Deployment | Local (Docker) | Cloud (Hetzner + HTTPS) |
| Use case | Live installation / performance | Remote demo / showcase |

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Pose Detection | [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose.html) (CDN) |
| Audio Synthesis | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) |
| Backend Framework | [FastAPI](https://fastapi.tiangolo.com/) + WebSocket |
| Frontend | Vanilla HTML/CSS/JavaScript |
| Containerization | [Docker](https://www.docker.com/) + Docker Compose |
| Web Server | [Nginx](https://nginx.org/) (Alpine) |
| SSL | [Let's Encrypt](https://letsencrypt.org/) via Certbot |
| Cloud Hosting | [Hetzner Cloud](https://www.hetzner.com/cloud) (CX22 VPS) |
| Domain Registrar | [CDMON](https://www.cdmon.com/) |
| Language | Python 3.11 (backend), JavaScript (frontend) |

---

## License

This project is open source. See the [LICENSE](LICENSE) file for details.

- **Code:** [Unlicense](LICENSE)
- **Documentation:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

---

## Author

**Ana María Jurado Crespo**
- GitHub: [@AmarilloBit](https://github.com/AmarilloBit)
- GitHub: [@maramotto](https://github.com/maramotto)
- Email: am.juradoc@alumnos.urjc.es
- University: ETSII, Universidad Rey Juan Carlos

---

*This is the web demo companion of [Cuerpo Sonoro](https://github.com/AmarilloBit/cuerposonoro), a Final Degree Project (TFG) exploring the intersection of software engineering, AI, and digital art.*
