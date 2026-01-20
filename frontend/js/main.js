/**
 * Main orchestrator for Cuerpo Sonoro Web Demo
 */

class App {
    constructor() {
        this.camera = null;
        this.pose = null;
        this.ws = null;
        this.audio = null;
        this.isRunning = false;

        this.initElements();
        this.initEventListeners();
        this.init();
    }

    //   Capture DOM references: Saves all the html elements that need to manipulate
    initElements() {
        this.videoEl = document.getElementById('video');
        this.canvasEl = document.getElementById('canvas');
        this.statusEl = document.getElementById('status');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.wsStatusEl = document.getElementById('wsStatus');
        this.wsTextEl = document.getElementById('wsText');
    }

    //  Buttons events. Connect all the buttons (init/stop) with their functions
    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
    }

    /** Init sequence:
        1.- Create camera handler
        2.- Create pose handler
        3.- Create websocket client
        4.- Create AudioEngine
        5.- Enable init button
    */
    async init() {
        this.updateStatus('Inicializando...');

        try {
            // Initialize camera
            this.camera = new CameraHandler(this.videoEl);
            await this.camera.init();

            // Initialize pose detection
            this.pose = new PoseHandler(this.canvasEl);
            await this.pose.init();

            // Initialize WebSocket
            this.ws = new WebSocketClient(
                this.getWebSocketURL(),
                (features) => this.onFeatures(features)
            );
            this.ws.onStatusChange = (connected) => this.updateWSStatus(connected);

            // Initialize audio engine
            this.audio = new AudioEngine();

            this.updateStatus('Listo');
            this.startBtn.disabled = false;

        } catch (error) {
            this.updateStatus(`Error: ${error.message}`);
            console.error('Initialization error:', error);
        }
    }

    //  Build the WebSocket URL: Automatically detects whether to use ws:// (local) or wss:// (production with HTTPS).
    getWebSocketURL() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        return `${protocol}//${host}/ws`;
    }

    // Boot sequence: Audio first (because the browser requires a user click), then camera, WebSocket, and finally the main loop.
    async start() {
        if (this.isRunning) return;

        try {
            // Resume audio context (required after user interaction)
            await this.audio.start();

            // Start camera
            await this.camera.start();

            // Connect WebSocket
            this.ws.connect();

            // Start pose detection loop
            this.isRunning = true;
            this.processFrame();

            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.updateStatus('Activo');

        } catch (error) {
            this.updateStatus(`Error: ${error.message}`);
            console.error('Start error:', error);
        }
    }

    stop() {
        this.isRunning = false;
        this.camera.stop();
        this.ws.disconnect();
        this.audio.stop();

        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.updateStatus('Detenido');
    }

    /** The main process:
        1.- Detect pose (MediaPipe)
        2. Sketch skeleton in canvas
        3. Send landmarks to server
        4. requestAnimationFrame → repeat
    */
    async processFrame() {
        if (!this.isRunning) return;

        // Get current frame and detect pose
        const results = await this.pose.detect(this.videoEl);

        if (results && results.poseLandmarks) {
            // Draw skeleton
            this.pose.draw(results);

            // Send landmarks to server
            const landmarks = results.poseLandmarks.map(lm => ({
                x: lm.x,
                y: lm.y,
                z: lm.z,
                visibility: lm.visibility
            }));
            this.ws.send(landmarks);
        }

        // Continue loop
        requestAnimationFrame(() => this.processFrame());
    }

    // Callback: It's executed every time the server sends back a calculated feature
    onFeatures(features) {
        // Update audio
        this.audio.update(features);

        // Update UI
        this.updateFeaturesDisplay(features);
    }

    // Update visual bars
    updateFeaturesDisplay(features) {
        for (const [key, value] of Object.entries(features)) {
            const bar = document.getElementById(`bar-${key}`);
            const val = document.getElementById(`val-${key}`);

            if (bar && val) {
                if (key === 'symmetry') {
                    // Symmetry: -1 to 1, centered bar
                    const percent = Math.abs(value) * 50;
                    bar.style.width = `${percent}%`;
                    bar.style.transform = value >= 0
                        ? 'translateX(0)'
                        : `translateX(-100%)`;
                } else {
                    // Normal: 0 to 1
                    bar.style.width = `${value * 100}%`;
                }
                val.textContent = value.toFixed(2);
            }
        }
    }

    updateStatus(text) {
        this.statusEl.textContent = text;
    }

    updateWSStatus(connected) {
        this.wsStatusEl.classList.toggle('connected', connected);
        this.wsStatusEl.classList.toggle('disconnected', !connected);
        this.wsTextEl.textContent = connected ? 'Conectado' : 'Desconectado';
    }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});