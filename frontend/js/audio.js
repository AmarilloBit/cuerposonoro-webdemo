/**
 * Audio synthesis engine using Web Audio API
 * Simple but expressive sound design for the web demo
 */

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.isRunning = false;

        // Audio nodes
        this.osc1 = null;      // Main oscillator
        this.osc2 = null;      // Detuned oscillator for richness
        this.filter = null;    // Low-pass filter
        this.panner = null;    // Stereo panning
        this.gainNode = null;  // Master volume
        this.lfo = null;       // LFO for vibrato/tremolo
        this.lfoGain = null;   // LFO depth
    }

    async start() {
        if (this.isRunning) return;

        // Create audio context (must be after user interaction)
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        // Resume if suspended
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        this.setupNodes();
        this.isRunning = true;
    }

    setupNodes() {
        const ctx = this.ctx;

        // Main oscillator (sawtooth for harmonics)
        this.osc1 = ctx.createOscillator();
        this.osc1.type = 'sawtooth';
        this.osc1.frequency.value = 220;

        // Second oscillator (slightly detuned)
        this.osc2 = ctx.createOscillator();
        this.osc2.type = 'sawtooth';
        this.osc2.frequency.value = 220 * 1.005; // Slight detune

        // Oscillator gains
        this.osc1Gain = ctx.createGain();
        this.osc1Gain.gain.value = 0.3;
        this.osc2Gain = ctx.createGain();
        this.osc2Gain.gain.value = 0.2;

        // Mix oscillators
        this.oscMix = ctx.createGain();

        // Filter
        this.filter = ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.value = 800;
        this.filter.Q.value = 2;

        // Panner
        this.panner = ctx.createStereoPanner();
        this.panner.pan.value = 0;

        // Master gain
        this.gainNode = ctx.createGain();
        this.gainNode.gain.value = 0;

        // LFO for subtle movement
        this.lfo = ctx.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.value = 4; // 4 Hz wobble
        this.lfoGain = ctx.createGain();
        this.lfoGain.gain.value = 5; // 5 Hz modulation depth

        // Connect LFO to oscillator frequencies
        this.lfo.connect(this.lfoGain);
        this.lfoGain.connect(this.osc1.frequency);
        this.lfoGain.connect(this.osc2.frequency);

        // Main signal chain
        this.osc1.connect(this.osc1Gain);
        this.osc2.connect(this.osc2Gain);
        this.osc1Gain.connect(this.oscMix);
        this.osc2Gain.connect(this.oscMix);
        this.oscMix.connect(this.filter);
        this.filter.connect(this.panner);
        this.panner.connect(this.gainNode);
        this.gainNode.connect(ctx.destination);

        // Start oscillators
        this.osc1.start();
        this.osc2.start();
        this.lfo.start();
    }

    update(features) {
        if (!this.isRunning || !this.ctx) return;

        const now = this.ctx.currentTime;
        const rampTime = 0.08; // Smooth transitions

        // Energy → Volume
        const volume = features.energy * 0.4; // Max 0.4 to avoid clipping
        this.gainNode.gain.linearRampToValueAtTime(volume, now + rampTime);

        // Arm angle → Pitch (pentatonic scale for musicality)
        const baseFreq = this.mapToPentatonic(features.armAngle);
        this.osc1.frequency.linearRampToValueAtTime(baseFreq, now + rampTime);
        this.osc2.frequency.linearRampToValueAtTime(baseFreq * 1.005, now + rampTime);

        // Smoothness → Filter cutoff
        const cutoff = 200 + (features.smoothness * 3000); // 200-3200 Hz
        this.filter.frequency.linearRampToValueAtTime(cutoff, now + rampTime);

        // Symmetry → Stereo pan
        this.panner.pan.linearRampToValueAtTime(features.symmetry, now + rampTime);

        // Vertical extension → LFO depth (more extended = less vibrato)
        const lfoDepth = (1 - features.verticalExtension) * 15;
        this.lfoGain.gain.linearRampToValueAtTime(lfoDepth, now + rampTime);

        // Energy also affects filter resonance
        const resonance = 1 + (features.energy * 8);
        this.filter.Q.linearRampToValueAtTime(resonance, now + rampTime);
    }

    mapToPentatonic(value) {
        // Map 0-1 to pentatonic scale notes
        // A minor pentatonic: A, C, D, E, G
        const baseFreq = 110; // A2
        const ratios = [1, 1.2, 1.333, 1.5, 1.778, 2, 2.4, 2.667, 3]; // 2 octaves

        const index = Math.floor(value * (ratios.length - 1));
        const ratio = ratios[Math.min(index, ratios.length - 1)];

        return baseFreq * ratio;
    }

    stop() {
        if (!this.isRunning) return;

        // Fade out
        if (this.gainNode) {
            this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
        }

        // Stop and clean up after fade
        setTimeout(() => {
            if (this.osc1) this.osc1.stop();
            if (this.osc2) this.osc2.stop();
            if (this.lfo) this.lfo.stop();
            if (this.ctx) this.ctx.close();

            this.ctx = null;
            this.isRunning = false;
        }, 150);
    }
}