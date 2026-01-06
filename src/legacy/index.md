---
title: Legacy
description: Key Comapny Assest Establishment and presentations engagements
layout: layouts/base.njk
permalink: /legacy/
---

# Public Engagements

Welcome to various key company assest establishments and public engagements section. Here you'll find some of my key legacy, and public engagement events.

## Featured Public Engagements

Please contact us to see more!

<div class="speaking-grid">
  {% for engagement in collections.legacy | reverse %}
    {% include "../_includes/components/speaking-card.njk" %}
  {% endfor %}
</div>