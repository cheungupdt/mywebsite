class VoiceSynthesis {
    constructor() {
        console.log('VoiceSynthesis constructor called');
        
        if (!('speechSynthesis' in window)) {
            console.error('Speech synthesis not supported');
            this.showBrowserError();
            return;
        }
        
        console.log('Speech synthesis supported');
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentUtterance = null;
        this.isSpeaking = false;
        this.isPaused = false;
        
        this.init();
    }
    
    showBrowserError() {
        const statusElement = document.getElementById('voice-status');
        if (statusElement) {
            statusElement.textContent = 'Speech synthesis not supported';
            statusElement.className = 'status-indicator error';
        }
        
        const speakBtn = document.getElementById('speak-btn');
        if (speakBtn) speakBtn.disabled = true;
    }
    
    init() {
        console.log('Initializing VoiceSynthesis');
        this.loadVoices();
        this.setupEventListeners();
        
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
    }
    
    loadVoices() {
        this.voices = this.synth.getVoices();
        const voiceSelect = document.getElementById('voice-select');
        
        if (!voiceSelect) return;
        
        voiceSelect.innerHTML = '<option value="">Default</option>';
        
        this.voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners');
        
        const speakBtn = document.getElementById('speak-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const stopBtn = document.getElementById('stop-btn');
        const textInput = document.getElementById('voice-text');
        
        if (!speakBtn) {
            console.error('Speak button not found');
            return;
        }
        
        // Speak button - FIXED: removed .bind(this) and fixed syntax
        speakBtn.addEventListener('click', () => {
            const text = document.getElementById('voice-text').value.trim();
            if (!text) return;
            
            if (this.isPaused) {
                this.synth.resume();
                this.isPaused = false;
                this.updateStatus('Speaking...', 'speaking');
            } else {
                this.speak();
            }
        });
        
        // Pause button
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                if (this.isSpeaking && !this.isPaused) {
                    this.synth.pause();
                    this.isPaused = true;
                    this.updateStatus('Paused', 'paused');
                }
            });
        }
        
        // Stop button
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                this.stop();
            });
        }
        
        // Text input
        if (textInput && speakBtn) {
            textInput.addEventListener('input', (e) => {
                speakBtn.disabled = !e.target.value.trim();
            });
            speakBtn.disabled = !textInput.value.trim();
        }
        
        console.log('Event listeners setup complete');
    }
    
    speak() {
        const text = document.getElementById('voice-text').value.trim();
        if (!text) return;
        
        this.stop();
        
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Set voice
        const voiceSelect = document.getElementById('voice-select');
        if (voiceSelect && voiceSelect.value) {
            this.currentUtterance.voice = this.voices[voiceSelect.value];
        }
        
        // Set rate and pitch
        const rateInput = document.getElementById('voice-rate');
        const pitchInput = document.getElementById('voice-pitch');
        
        if (rateInput) {
            this.currentUtterance.rate = parseFloat(rateInput.value);
        }
        
        if (pitchInput) {
            this.currentUtterance.pitch = parseFloat(pitchInput.value);
        }
        
        // Event handlers
        this.currentUtterance.onstart = () => {
            this.isSpeaking = true;
            this.isPaused = false;
            this.updateStatus('Speaking...', 'speaking');
        };
        
        this.currentUtterance.onend = () => {
            this.isSpeaking = false;
            this.isPaused = false;
            this.updateStatus('Ready', 'ready');
        };
        
        this.currentUtterance.onerror = (event) => {
            console.error('Speech error:', event.error);
            this.isSpeaking = false;
            this.isPaused = false;
            this.updateStatus(`Error: ${event.error}`, 'error');
        };
        
        this.synth.speak(this.currentUtterance);
    }
    
    stop() {
        this.synth.cancel();
        this.isSpeaking = false;
        this.isPaused = false;
        this.updateStatus('Ready', 'ready');
    }
    
    updateStatus(message, status) {
        const statusElement = document.getElementById('voice-status');
        if (!statusElement) return;
        
        statusElement.textContent = message;
        statusElement.className = `status-indicator ${status}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Checking for voice synthesis elements');
    
    if (document.getElementById('voice-text')) {
        console.log('Voice synthesis elements found');
        try {
            new VoiceSynthesis();
            console.log('VoiceSynthesis initialized successfully');
        } catch (error) {
            console.error('Failed to initialize VoiceSynthesis:', error);
        }
    } else {
        console.log('No voice synthesis elements found');
    }
});