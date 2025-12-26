// diagrams.js - Initialize Mermaid and Charts

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Mermaid
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      themeVariables: {
        primaryColor: '#3498db',
        primaryTextColor: '#2c3e50',
        primaryBorderColor: '#3498db',
        lineColor: '#95a5a6',
        secondaryColor: '#ecf0f1',
        tertiaryColor: '#f8f9f8'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
    
    // Initialize Mermaid on code blocks with language-mermaid class
    setTimeout(() => {
      const mermaidCodeBlocks = document.querySelectorAll('pre code.language-mermaid');
      mermaidCodeBlocks.forEach(function(element) {
        // Create a div wrapper for Mermaid
        const mermaidDiv = document.createElement('div');
        mermaidDiv.className = 'mermaid';
        mermaidDiv.textContent = element.textContent;
        
        // Replace the code block with the Mermaid div
        element.parentNode.replaceChild(mermaidDiv, element);
        
        // Initialize Mermaid on the new div
        mermaid.init(undefined, mermaidDiv);
      });
    }, 100);
  }
  
  // Initialize Chart.js defaults
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#2c3e50';
    Chart.defaults.borderColor = '#95a5a6';
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
  }
  
  // Initialize interactive robotics diagrams
  initRoboticsDiagrams();
  
  // Manually initialize charts after a delay
  setTimeout(() => {
    initCharts();
  }, 200);
});

function initCharts() {
  // Initialize Performance Metrics Chart (for main diagrams page)
  const performanceMetricsCtx = document.getElementById('chart-performance-metrics');
  if (performanceMetricsCtx) {
    new Chart(performanceMetricsCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Accuracy (%)',
          data: [85, 88, 92, 90, 94, 96],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }, {
          label: 'Speed (m/s)',
          data: [1.2, 1.3, 1.5, 1.4, 1.6, 1.7],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Initialize Performance Comparison Chart
  const performanceCtx = document.getElementById('chart-performance-comparison');
  if (performanceCtx) {
    new Chart(performanceCtx, {
      type: 'radar',
      data: {
        labels: ['Speed', 'Accuracy', 'Battery Life', 'Payload', 'Navigation', 'Stability'],
        datasets: [{
          label: 'Model A',
          data: [80, 90, 75, 60, 85, 70],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Model B',
          data: [70, 85, 90, 80, 75, 85],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  }
  
  // Initialize Resource Usage Chart
  const resourceCtx = document.getElementById('chart-resource-usage');
  if (resourceCtx) {
    new Chart(resourceCtx, {
      type: 'line',
      data: {
        labels: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30'],
        datasets: [{
          label: 'CPU Usage (%)',
          data: [30, 45, 60, 70, 65, 55, 40],
          yAxisID: 'y',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        }, {
          label: 'Memory Usage (MB)',
          data: [512, 520, 535, 540, 538, 525, 515],
          yAxisID: 'y1',
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'CPU Usage (%)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Memory Usage (MB)'
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        }
      }
    });
  }
}

function initRoboticsDiagrams() {
  const components = document.querySelectorAll('.component');
  
  components.forEach(component => {
    component.addEventListener('click', function() {
      const componentType = this.getAttribute('data-component');
      showComponentDetails(componentType);
    });
    
    component.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });
}

function showComponentDetails(componentType) {
  // This function would show more details about the component
  // Implementation depends on the specific requirements
  console.log(`Showing details for ${componentType}`);
}

// Helper function to create charts from data
function createChart(canvasId, type, data, options = {}) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'X Axis'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Y Axis'
        }
      }
    }
  };
  
  const mergedOptions = mergeDeep(defaultOptions, options);
  
  return new Chart(ctx, {
    type: type,
    data: data,
    options: mergedOptions
  });
}

// Simple deep merge function for objects
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}