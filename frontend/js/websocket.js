/**
 * WebSocket client for communication with backend
 */

class WebSocketClient {
    constructor(url, onFeatures) {
        this.url = url;
        this.onFeatures = onFeatures;
        this.onStatusChange = null;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
    }

    connect() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            return;
        }

        try {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                console.log('WebSocket connected');
                this.reconnectAttempts = 0;
                if (this.onStatusChange) {
                    this.onStatusChange(true);
                }
            };

            this.ws.onmessage = (event) => {
                try {
                    const features = JSON.parse(event.data);
                    this.onFeatures(features);
                } catch (e) {
                    console.error('Error parsing features:', e);
                }
            };

            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                if (this.onStatusChange) {
                    this.onStatusChange(false);
                }
                this.attemptReconnect();
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

        } catch (error) {
            console.error('Failed to create WebSocket:', error);
            this.attemptReconnect();
        }
    }

    attemptReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log('Max reconnect attempts reached');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * this.reconnectAttempts;

        console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

        setTimeout(() => {
            this.connect();
        }, delay);
    }

    send(landmarks) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(landmarks));
        }
    }

    disconnect() {
        this.reconnectAttempts = this.maxReconnectAttempts; // Prevent auto-reconnect
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}
