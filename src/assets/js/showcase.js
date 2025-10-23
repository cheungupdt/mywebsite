// src/assets/js/showcase.js
console.log('showcase.js loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing showcase...');
  
  // Initialize 3D models (canvas-based)
  try {
    init3DModels();
    console.log('3D models initialized');
  } catch (error) {
    console.error('Error initializing 3D models:', error);
  }
  
  // Initialize animation demos
  try {
    initAnimationDemos();
    console.log('Animation demos initialized');
  } catch (error) {
    console.error('Error initializing animation demos:', error);
  }
  
  // Initialize parallax effects
  try {
    initParallaxEffects();
    console.log('Parallax effects initialized');
  } catch (error) {
    console.error('Error initializing parallax effects:', error);
  }
  
  // Initialize performance demo
  try {
    initPerformanceDemo();
    console.log('Performance demo initialized');
  } catch (error) {
    console.error('Error initializing performance demo:', error);
  }
  
  // Initialize chatbot demo
  try {
    initChatbotDemo();
    console.log('Chatbot demo initialized');
  } catch (error) {
    console.error('Error initializing chatbot demo:', error);
  }
});

// 3D Models Initialization (Canvas-based)
function init3DModels() {
  console.log('Initializing 3D models...');
  
  const modelContainers = document.querySelectorAll('.model-container');
  console.log(`Found ${modelContainers.length} model containers`);
  
  modelContainers.forEach((container, index) => {
    const canvas = container.querySelector('canvas');
    const loading = container.querySelector('.model-loading');
    const rotateBtn = container.querySelector('[id^="rotate-"]');
    const resetBtn = container.querySelector('[id^="reset-"]');
    
    console.log(`Setting up model ${index + 1}`);
    
    if (canvas && loading) {
      // Set up canvas
      const ctx = canvas.getContext('2d');
      
      // Animation variables
      let isRotating = false;
      let rotation = 0;
      let isDragging = false;
      let startX = 0;
      
      // Set canvas size
      function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawRoboticArm(ctx, canvas.width, canvas.height, rotation);
      }
      
      // Draw robotic arm function
      function drawRoboticArm(ctx, width, height, rotation = 0) {
        ctx.clearRect(0, 0, width, height);
        
        // Set up the drawing context
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(rotation);
        
        // Draw base
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(-40, 20, 80, 20);
        
        // Draw first segment
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(-15, -60, 30, 80);
        
        // Draw joint
        ctx.beginPath();
        ctx.arc(0, -60, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#718096';
        ctx.fill();
        
        // Draw second segment
        ctx.save();
        ctx.translate(0, -60);
        ctx.rotate(rotation * 2);
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(-10, -50, 20, 50);
        
        // Draw joint
        ctx.beginPath();
        ctx.arc(0, -50, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#718096';
        ctx.fill();
        
        // Draw third segment
        ctx.save();
        ctx.translate(0, -50);
        ctx.rotate(rotation * 3);
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(-8, -40, 16, 40);
        
        // Draw end effector
        ctx.beginPath();
        ctx.arc(0, -40, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#e53e3e';
        ctx.fill();
        
        ctx.restore();
        ctx.restore();
        ctx.restore();
      }
      
      // Animation loop
      function animate() {
        if (isRotating) {
          rotation += 0.01;
          drawRoboticArm(ctx, canvas.width, canvas.height, rotation);
          requestAnimationFrame(animate);
        }
      }
      
      // Mouse controls
      canvas.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        isRotating = false;
        if (rotateBtn) rotateBtn.textContent = 'Toggle Rotation';
      });
      
      canvas.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        rotation += deltaX * 0.01;
        startX = e.clientX;
        
        drawRoboticArm(ctx, canvas.width, canvas.height, rotation);
      });
      
      canvas.addEventListener('mouseup', function() {
        isDragging = false;
      });
      
      // Touch controls for mobile
      canvas.addEventListener('touchstart', function(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        isRotating = false;
        if (rotateBtn) rotateBtn.textContent = 'Toggle Rotation';
      });
      
      canvas.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - startX;
        rotation += deltaX * 0.01;
        startX = e.touches[0].clientX;
        
        drawRoboticArm(ctx, canvas.width, canvas.height, rotation);
      });
      
      canvas.addEventListener('touchend', function() {
        isDragging = false;
      });
      
      // Button controls
      if (rotateBtn) {
        rotateBtn.addEventListener('click', function() {
          isRotating = !isRotating;
          this.textContent = isRotating ? 'Stop Rotation' : 'Toggle Rotation';
          
          if (isRotating) {
            animate();
          }
        });
      }
      
      if (resetBtn) {
        resetBtn.addEventListener('click', function() {
          rotation = 0;
          isRotating = false;
          if (rotateBtn) rotateBtn.textContent = 'Toggle Rotation';
          drawRoboticArm(ctx, canvas.width, canvas.height, rotation);
        });
      }
      
      // Handle resize
      window.addEventListener('resize', resizeCanvas);
      
      // Initialize canvas and hide loading
      resizeCanvas();
      
      setTimeout(() => {
        if (loading) loading.style.display = 'none';
      }, 1000);
    }
  });
}

// Animation Demos
function initAnimationDemos() {
  console.log('Initializing animation demos...');
  
  const animationButtons = document.querySelectorAll('.demo-controls button');
  console.log(`Found ${animationButtons.length} animation buttons`);
  
  animationButtons.forEach(button => {
    button.addEventListener('click', function() {
      const animation = this.getAttribute('data-animation');
      const demoBox = this.closest('.demo-element').querySelector('.demo-box');
      
      if (demoBox) {
        // Remove any existing animation classes
        demoBox.className = 'demo-box';
        
        // Force reflow to restart animation
        void demoBox.offsetWidth;
        
        // Add the new animation class
        demoBox.classList.add(animation);
      }
    });
  });
}

// Parallax Effects
function initParallaxEffects() {
  console.log('Initializing parallax effects...');
  
  const parallaxDemos = document.querySelectorAll('.parallax-demo');
  console.log(`Found ${parallaxDemos.length} parallax demos`);
  
  parallaxDemos.forEach(demo => {
    const layers = demo.querySelectorAll('.parallax-layer');
    
    if (layers.length === 0) return;
    
    // Mouse movement parallax
    demo.addEventListener('mousemove', function(e) {
      const rect = demo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
        const xPos = (x - 0.5) * 30 * speed;
        const yPos = (y - 0.5) * 30 * speed;
        
        layer.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.1)`;
        layer.style.transition = 'transform 0.1s ease-out';
      });
    });
    
    // Reset on mouse leave
    demo.addEventListener('mouseleave', function() {
      layers.forEach(layer => {
        layer.style.transform = 'translate(0, 0) scale(1)';
        layer.style.transition = 'transform 0.3s ease-out';
      });
    });
  });
}

// Performance Demo
function initPerformanceDemo() {
  console.log('Initializing performance demo...');
  
  const runTestBtn = document.getElementById('run-performance-test');
  
  if (runTestBtn) {
    runTestBtn.addEventListener('click', function() {
      console.log('Running performance test...');
      
      this.textContent = 'Running...';
      this.disabled = true;
      
      // Show progress
      const metricsContainer = document.querySelector('.performance-metrics');
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBar.innerHTML = '<div class="progress-fill"></div>';
      metricsContainer.appendChild(progressBar);
      
      const progressFill = progressBar.querySelector('.progress-fill');
      let progress = 0;
      
      const progressInterval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          
          setTimeout(() => {
            // Update metrics with new values
            const metrics = document.querySelectorAll('.metric-value');
            if (metrics[0]) metrics[0].textContent = '0.8s'; // Load Time
            if (metrics[1]) metrics[1].textContent = '198KB'; // Page Size
            
            // Add new metrics
            const newMetrics = [
              { label: 'Performance Score', value: '95/100' },
              { label: 'First Contentful Paint', value: '0.6s' },
              { label: 'Largest Contentful Paint', value: '1.2s' }
            ];
            
            newMetrics.forEach(metric => {
              const metricElement = document.createElement('div');
              metricElement.className = 'metric';
              metricElement.innerHTML = `
                <span class="metric-label">${metric.label}</span>
                <span class="metric-value">${metric.value}</span>
              `;
              metricsContainer.appendChild(metricElement);
            });
            
            // Remove progress bar
            progressBar.remove();
            
            this.textContent = 'Test Complete';
            
            setTimeout(() => {
              this.textContent = 'Run Test';
              this.disabled = false;
            }, 2000);
          }, 500);
        }
      }, 100);
    });
  }
}
/*
// Chatbot Demo
function initChatbotDemo() {
  console.log('Initializing chatbot demo...');
  
  const tryChatbotBtn = document.getElementById('try-chatbot-btn');
  
  if (tryChatbotBtn) {
    tryChatbotBtn.addEventListener('click', () => {
      console.log('Opening chatbot...');
      
      // Open the floating chatbot instead of the old one
      const floatingChatbot = document.getElementById('floating-chatbot');
      const chatbotToggle = document.getElementById('chatbot-toggle');
      
      if (floatingChatbot && chatbotToggle) {
        floatingChatbot.classList.remove('minimized');
      }
    });
  }
}
*/

// Floating Chatbot toggle functionality
function initFloatingChatbot() {
    console.log('Initializing floating chatbot...');
    
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const floatingChatbot = document.getElementById('floating-chatbot');
    const chatbotClose = document.getElementById('floating-chatbot-close');
    
    if (chatbotToggle && floatingChatbot) {
        console.log('Found floating chatbot elements');
        chatbotToggle.addEventListener('click', () => {
            console.log('Chatbot toggle clicked');
            floatingChatbot.classList.toggle('minimized');
        });
        
        if (chatbotClose) {
            chatbotClose.addEventListener('click', (e) => {
                e.stopPropagation();
                floatingChatbot.classList.add('minimized');
            });
        }
    } else {
        console.log('Floating chatbot elements not found:', {
            toggle: !!chatbotToggle,
            chatbot: !!floatingChatbot,
            close: !!chatbotClose
        });
    }
}
/*
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing showcase chatbots');
    initFloatingChatbot();
    initChatbotDemo();
});
*/