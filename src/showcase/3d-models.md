---
title: 3D Models Showcase
layout: layouts/showcase.njk
permalink: /showcase/3d-models/
---

<div class="showcase-header">
  <h1>Interactive 3D Models</h1>
  <p>Explore these interactive 3D models of robotics systems and components. Use your mouse or touch to rotate and zoom in on the models.</p>
</div>

<div class="models-showcase">
  <div class="model-showcase-item">
    <h2>Robotic Arm</h2>
    <div class="model-container">
      <div class="model-viewer">
        <div class="model-loading">
          <div class="loading-spinner"></div>
          <p>Loading 3D model...</p>
        </div>
        <canvas id="robotic-arm-canvas"></canvas>
      </div>
      <div class="model-controls">
        <button class="btn btn-small" id="rotate-robotic-arm">Toggle Rotation</button>
        <button class="btn btn-small" id="reset-robotic-arm">Reset View</button>
      </div>
    </div>
    <p>This interactive 3D model demonstrates a robotic arm with articulated joints, similar to those used in industrial automation. The model can be rotated and zoomed to examine the different components and mechanisms.</p>
  </div>
  
  <div class="model-showcase-item">
    <h2>Automation System</h2>
    <div class="model-container">
      <div class="model-viewer">
        <div class="model-loading">
          <div class="loading-spinner"></div>
          <p>Loading 3D model...</p>
        </div>
        <canvas id="automation-system-canvas"></canvas>
      </div>
      <div class="model-controls">
        <button class="btn btn-small" id="rotate-automation-system">Toggle Rotation</button>
        <button class="btn btn-small" id="reset-automation-system">Reset View</button>
      </div>
    </div>
    <p>This model represents a complete automation system with multiple components working together. It showcases how different elements can be integrated to create a cohesive workflow.</p>
  </div>
</div>