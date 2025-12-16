---
title: Nucleus
layout: layouts/showcase.njk
permalink: /showcase/
---

<div class="showcase-intro">
  <p>Welcome to my technical showcase, where I demonstrate various interactive elements, animations, and visual effects that highlight my technical capabilities. Explore the different examples below to see how I combine technical expertise with creative design.</p>
</div>

<div class="showcase-grid">
  {% for element in showcase.elements %}
    {% include "components/showcase-card.njk" %}
  {% endfor %}
</div>