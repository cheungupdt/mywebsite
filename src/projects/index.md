---
title: Projects
description: Showcase of my projects and work
layout: ../_includes/layouts/base.njk
---

# Projects

Welcome to my project portfolio, where engineering excellence meets creative execution. Over my career, I've successfully delivered 200+ animatronics figures, 30+ parade floats, and numerous complex structural installations across global theme parks including Disney resorts in Hong Kong, Shanghai, Paris, Tokyo, and Anaheim, as well as major projects for Universal Beijing, Chimelong, and Dubai's Motiongate.

Each project represents a unique convergence of technical precision, safety compliance, and artistic vision. From Asia's largest indoor animatronics at Chimelong Spaceship to intricate parade floats for Universal's opening celebration, I've consistently delivered solutions that balance creative intent with engineering feasibility, budget constraints, and aggressive timelines. My hands-on approach ensures that from initial concept through fabrication, installation, and long-term maintenance, every detail receives meticulous attention.

## Featured Projects

<div class="projects-grid">
  <!-- {% for project in collections.projects | reverse %} {% endfor %}-->
  {% for project in collections.projects | reverse %}
    {% include "../_includes/components/project-card.njk" %}
  {% endfor %}
</div>

### **Global Project Expertise:**
- **Hong Kong**: First outdoor animatronics for Entertainment Department, TPPE structures, Building Department negotiations
- **Mainland China**: Major installations in Beijing, Shanghai, Zhuhai including parade floats and indoor/outdoor animatronics
- **International**: Projects in Malaysia (Independence Day Monster), Dubai, France, Tokyo with varying regulatory requirements
- **Safety-First Construction**: Developed protocols for water hygiene, overhead structures, pyrotechnics, drone shows, and temporary installations

My project philosophy centers on sustainable design—creating systems that not only meet immediate show requirements but endure for years with minimal maintenance. This longevity-focused approach has saved clients significant operational costs while ensuring consistent show quality across hundreds of performances.