class VoiceSynthesis {
  constructor() {
    console.log('VoiceSynthesis constructor called');
    
    // Check if speech synthesis is available
    if (!('speechSynthesis' in window)) {
      console.error('❌ Speech Synthesis API not supported in this browser');
      this.showBrowserError();
      return;
    }
    
    console.log('✅ Speech Synthesis API is supported');
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
      statusElement.textContent = 'Speech synthesis not supported in your browser';
      statusElement.className = 'status-indicator error';
    }
    
    const speakBtn = document.getElementById('speak-btn');
    if (speakBtn) speakBtn.disabled = true;
  }
  
  init() {
    console.log('Initializing VoiceSynthesis...');
    
    // Load voices
    this.loadVoices();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Update voices when they change
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        console.log('Voices changed event fired');
        this.loadVoices();
      };
    }
    
    console.log('VoiceSynthesis initialization complete');
  }
  
  loadVoices() {
    console.log('Loading voices...');
    this.voices = this.synth.getVoices();
    const voiceSelect = document.getElementById('voice-select');
    
    console.log(`Found ${this.voices.length} voices`);
    
    if (!voiceSelect) {
      console.error('Voice select element not found');
      return;
    }
    
    // Clear existing options
    voiceSelect.innerHTML = '<option value="">Default</option>';
    
    // Add voice options
    this.voices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
    
    console.log('Voice options populated');
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    const speakBtn = document.getElementById('speak-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const textInput = document.getElementById('voice-text');
    
    if (!speakBtn) {
      console.error('Speak button not found');
      return;
    }
    
    // Speak button
    speakBtn.addEventListener('click', () => {
      console.log('Speak button clicked');
      const text = document.getElementById('voice-text').value.trim();
      console.log('Text to speak:', text);
      
      if (!text) {
        console.warn('No text to speak');
        return;
      }
      
      if (this.isPaused) {
        console.log('Resuming speech');
        this.synth.resume();
        this.isPaused = false;
        this.updateStatus('Speaking...', 'speaking');
      } else {
        console.log('Starting new speech');
        this.speak();
      }
    });
    
    // Pause button
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        console.log('Pause button clicked');
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
        console.log('Stop button clicked');
        this.stop();
      });
    }
    
    // Text input
    if (textInput && speakBtn) {
      textInput.addEventListener('input', (e) => {
        speakBtn.disabled = !e.target.value.trim();
      });
      
      // Initial state
      speakBtn.disabled = !textInput.value.trim();
    }
    
    console.log('Event listeners setup complete');
  }
  
  speak() {
    console.log('speak() method called');
    
    const text = document.getElementById('voice-text').value.trim();
    if (!text) {
      console.error('No text to speak');
      return;
    }
    
    // Stop any current speech
    this.stop();
    
    // Create utterance
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    console.log('SpeechSynthesisUtterance created');
    
    // Set voice
    const voiceSelect = document.getElementById('voice-select');
    if (voiceSelect && voiceSelect.value) {
      const selectedVoice = this.voices[voiceSelect.value];
      this.currentUtterance.voice = selectedVoice;
      console.log('Selected voice:', selectedVoice.name);
    }
    
    // Set rate and pitch
    const rateInput = document.getElementById('voice-rate');
    const pitchInput = document.getElementById('voice-pitch');
    
    if (rateInput) {
      this.currentUtterance.rate = parseFloat(rateInput.value);
      console.log('Rate set to:', this.currentUtterance.rate);
    }
    
    if (pitchInput) {
      this.currentUtterance.pitch = parseFloat(pitchInput.value);
      console.log('Pitch set to:', this.currentUtterance.pitch);
    }
    
    // Set up event handlers with detailed logging
    this.currentUtterance.onstart = () => {
      console.log('✅ Speech started successfully');
      this.isSpeaking = true;
      this.isPaused = false;
      this.updateStatus('Speaking...', 'speaking');
      this.startVisualization();
    };
    
    this.currentUtterance.onend = () => {
      console.log('✅ Speech ended normally');
      this.isSpeaking = false;
      this.isPaused = false;
      this.updateStatus('Ready', 'ready');
      this.stopVisualization();
    };
    
    this.currentUtterance.onerror = (event) => {
      console.error('❌ Speech error:', event.error, event);
      this.isSpeaking = false;
      this.isPaused = false;
      this.updateStatus(`Error: ${event.error}`, 'error');
      this.stopVisualization();
    };
    
    this.currentUtterance.onpause = () => {
      console.log('Speech paused');
      this.isPaused = true;
      this.updateStatus('Paused', 'paused');
    };
    
    this.currentUtterance.onresume = () => {
      console.log('Speech resumed');
      this.isPaused = false;
      this.updateStatus('Speaking...', 'speaking');
    };
    
    // Start speaking
    console.log('Attempting to speak...');
    try {
      this.synth.speak(this.currentUtterance);
      console.log('speak() method called successfully');
    } catch (error) {
      console.error('❌ Error calling speak():', error);
      this.updateStatus(`Error: ${error.message}`, 'error');
    }
  }
  
  stop() {
    console.log('Stopping speech synthesis');
    this.synth.cancel();
    this.isSpeaking = false;
    this.isPaused = false;
    this.updateStatus('Ready', 'ready');
    this.stopVisualization();
  }
  
  updateStatus(message, status) {
    console.log(`Status: ${message} (${status})`);
    const statusElement = document.getElementById('voice-status');
    if (!statusElement) {
      console.error('Status element not found');
      return;
    }
    
    statusElement.textContent = message;
    statusElement.className = `status-indicator ${status}`;
  }
  
  startVisualization() {
    console.log('Starting visualization');
    // ... keep your existing visualization code
  }
  
  stopVisualization() {
    console.log('Stopping visualization');
    // ... keep your existing visualization code
  }
}

// Enhanced initialization with error handling
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - checking for voice synthesis elements');
  
  const voiceText = document.getElementById('voice-text');
  if (voiceText) {
    console.log('Voice synthesis elements found, initializing...');
    try {
      new VoiceSynthesis();
      console.log('VoiceSynthesis initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize VoiceSynthesis:', error);
      const statusElement = document.getElementById('voice-status');
      if (statusElement) {
        statusElement.textContent = `Initialization failed: ${error.message}`;
        statusElement.className = 'status-indicator error';
      }
    }
  } else {
    console.log('No voice synthesis elements found on this page');
  }
});

// Add a test function to call from browser console
window.testVoiceSynthesis = function(text = 'Hello this is a test') {
  console.log('Testing voice synthesis...');
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.onstart = () => console.log('Test: Speech started');
  utterance.onend = () => console.log('Test: Speech ended');
  utterance.onerror = (e) => console.log('Test: Speech error:', e.error);
  window.speechSynthesis.speak(utterance);
};