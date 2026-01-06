---
title: Projects
description: Showcase of my projects and work
layout: ../_includes/layouts/base.njk
---

# Projects

Welcome to my projects showcase. Here you'll find a collection of my work across various domains including robotics, automation, and software development. Each project represents a unique challenge and solution that I've had the opportunity to work on.

## Featured Projects

<div class="projects-grid">
  <!-- {% for project in collections.projects | reverse %} {% endfor %}-->
  {% for project in collections.projects | reverse %}
    {% include "../_includes/components/project-card.njk" %}
  {% endfor %}
</div>