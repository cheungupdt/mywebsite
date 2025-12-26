---
title: Legacy
description: Conference presentations and speaking engagements
layout: layouts/base.njk
permalink: /legacy/
---

# Public Engagements

Welcome to various public engagements display. Here you'll find some of my presentations, workshops, and public demo events.

## Featured Public Engagements

Please contact us to see more!

<div class="speaking-grid">
  {% for engagement in collections.legacy | reverse %}
    {% include "../_includes/components/speaking-card.njk" %}
  {% endfor %}
</div>