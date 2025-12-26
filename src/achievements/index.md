---
title: Achievements
description: Professional achievements and recognitions
layout: ../_includes/layouts/base.njk
---

# Achievements

Welcome to my achievements showcase. Here you'll find a collection of my professional accomplishments, and recognitions across various domains.

## Featured Achievements

<div class="achievements-grid">
  {% for achievement in collections.achievements | reverse %}
    {% include "../_includes/components/achievement-card.njk" %}
  {% endfor %}
</div>

## Certifications & Training

<div class="certifications">
  <div class="cert-item">
    <h4> PPDOHS Safety Officer (In Progress, completion in 2026)</h4>
    <p>Strive to be recognized in being safe for company and for project I work on</p>
  </div>
  <div class="cert-item">
    <h4>AI Agent Certification</h4>
    <p>Leadership in AI-driven organizations</p>
  </div>
  <div class="cert-item">
    <h4>Professional Engineering Exmain(NCESS)</h4>
    <p>Passed Professional Engineering in Mechanical Design Discipline</p>
  </div>
</div>
