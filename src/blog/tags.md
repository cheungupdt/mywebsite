---
title: Tags
description: "Browse all blog posts by tag"
layout: layouts/base.njk
permalink: /blog/tags/
---

<section class="tags-header">
    <h1>Tags</h1>
    <p class="lead">Browse all blog posts by tag</p>
</section>

<section class="tags-cloud">
    {% for tag in collections.tagList %}
    <a href="/blog/tags/{{ tag }}/" class="tag-cloud-item">
        #{{ tag }}
        <span class="tag-count">{{ collections[tag] | length }}</span>
    </a>
    {% endfor %}
</section>

<style>
.tags-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
}

.tags-header h1 {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--spacing-lg);
}

.tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
}

.tag-cloud-item {
    background-color: var(--color-white);
    color: var(--color-accent);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    text-decoration: none;
    transition: all var(--transition-normal);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.tag-cloud-item:hover {
    background-color: var(--color-accent);
    color: var(--color-white);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    text-decoration: none;
}

.tag-count {
    background-color: var(--color-secondary-light);
    color: var(--color-secondary-dark);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
}

.tag-cloud-item:hover .tag-count {
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--color-white);
}
</style>