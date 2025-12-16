---
title: Legacy
description: Conference presentations and speaking engagements
layout: layouts/base.njk
permalink: /legacy/
---

# Speaking Engagements

Welcome to my speaking engagements showcase. Here you'll find a collection of my conference presentations, workshops, and public speaking events.

## Featured Speaking Engagements

<div class="speaking-grid">
  {% for engagement in collections.speaking | reverse %}
    {% include "../_includes/components/speaking-card.njk" %}
  {% endfor %}
</div>