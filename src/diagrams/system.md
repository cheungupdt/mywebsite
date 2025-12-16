---
title: System Diagrams
description: Detailed system architecture diagrams for various robotics components
layout: ../_includes/layouts/base.njk
---

# System Diagrams

This section contains detailed system architecture diagrams for various robotics components and subsystems.

## Control System Architecture

<div class="diagram-container mermaid-diagram">
  <h3 class="diagram-title">Control System Architecture</h3>
  <p class="diagram-description">Hierarchical structure of the control system</p>
  <div class="mermaid" id="mermaid-control-system">
graph TB
    A[Mission Planner] --> B[Task Scheduler]
    B --> C[Path Planner]
    B --> D[Behavior Controller]
    C --> E[Motor Controller]
    D --> E
    D --> F[Sensor Interface]
    E --> G[Motors]
    F --> H[Sensors]
    H --> F
  </div>
</div>

## Data Flow Diagram

<div class="diagram-container mermaid-diagram">
  <h3 class="diagram-title">Data Flow in the System</h3>
  <p class="diagram-description">How data flows through different components</p>
  <div class="mermaid" id="mermaid-data-flow">
graph LR
    A[Sensor Data] --> B[Preprocessing]
    B --> C[Feature Extraction]
    C --> D[Decision Making]
    D --> E[Control Commands]
    E --> F[Actuators]
    G[Environment Model] --> D
    C --> G
    H[Feedback] --> G
    F --> H
  </div>
</div>

## Component Interaction

<div class="diagram-container robotics-diagram">
  <h3 class="diagram-title">Component Interaction Model</h3>
  <p class="diagram-description">Interactive model showing how components interact</p>
  <div class="robotics-diagram-content" id="robotics-component-interaction">
    <div class="system-model">
      <div class="system-layer" data-layer="perception">
        <h4>Perception Layer</h4>
        <div class="components">
          <div class="component" data-component="camera">
            <h5>Camera</h5>
            <p>Captures visual data</p>
          </div>
          <div class="component" data-component="lidar">
            <h5>LiDAR</h5>
            <p>Measures distances</p>
          </div>
          <div class="component" data-component="imu">
            <h5>IMU</h5>
            <p>Tracks orientation</p>
          </div>
        </div>
      </div>
      
      <div class="system-layer" data-layer="processing">
        <h4>Processing Layer</h4>
        <div class="components">
          <div class="component" data-component="slam">
            <h5>SLAM</h5>
            <p>Maps environment</p>
          </div>
          <div class="component" data-component="object-detection">
            <h5>Object Detection</h5>
            <p>Identifies objects</p>
          </div>
        </div>
      </div>
      
      <div class="system-layer" data-layer="control">
        <h4>Control Layer</h4>
        <div class="components">
          <div class="component" data-component="path-planning">
            <h5>Path Planning</h5>
            <p>Calculates routes</p>
          </div>
          <div class="component" data-component="motor-control">
            <h5>Motor Control</h5>
            <p>Controls movement</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .system-model {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .system-layer {
    padding: 1.5rem;
    border-radius: 8px;
    background-color: var(--bg-secondary, #f8f9fa);
  }
  
  .system-layer h4 {
    margin-top: 0;
    color: var(--primary-color, #2c3e50);
  }
  
  .components {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .component {
    flex: 1;
    min-width: 150px;
    padding: 1rem;
    border-radius: 6px;
    background-color: var(--bg-primary, #ffffff);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .component:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .component h5 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--primary-color, #2c3e50);
  }
  
  .component p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary, #6c757d);
  }
</style>