/**
 * Pose detection handler using MediaPipe Pose
 */

class PoseHandler {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.pose = null;
        this.lastResults = null;
    }

    async init() {
        this.pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });

        this.pose.setOptions({
            modelComplexity: 1,      // 0, 1, or 2. Higher = more accurate but slower
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        // Set up results callback
        this.pose.onResults((results) => {
            this.lastResults = results;
        });

        // Initialize model by sending a dummy frame
        // This preloads the model
        console.log('Loading pose model...');
    }

    async detect(videoElement) {
        // Resize canvas to match video
        if (this.canvas.width !== videoElement.videoWidth) {
            this.canvas.width = videoElement.videoWidth;
            this.canvas.height = videoElement.videoHeight;
        }

        // Send frame to pose detection
        await this.pose.send({ image: videoElement });

        return this.lastResults;
    }

    draw(results) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!results.poseLandmarks) return;

        // Draw connections
        drawConnectors(this.ctx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: 'rgba(102, 126, 234, 0.6)',
            lineWidth: 2
        });

        // Draw landmarks
        drawLandmarks(this.ctx, results.poseLandmarks, {
            color: 'rgba(118, 75, 162, 0.8)',
            lineWidth: 1,
            radius: 4
        });
    }
}