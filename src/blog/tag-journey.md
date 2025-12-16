---
title: "Tag: journey"
layout: layouts/base.njk
permalink: /blog/tag-pages/journey/
---

<section class="tag-header">
    <h1>Tag: #journey</h1>
    <p class="lead">
        {% set tagPosts = collections.posts | where("data.tags", "journey") %}
        {{ tagPosts.length }} 
        post{% if tagPosts.length != 1 %}s{% endif %}
        with this tag
    </p>
</section>

<section class="blog-posts">
    {% set tagPosts = collections.posts | where("data.tags", "journey") %}
    {% if tagPosts.length > 0 %}
        {% for post in tagPosts %}
        <article class="blog-post-preview">
            <header>
                <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
                <div class="blog-meta">
                    <time datetime="{{ post.date }}">{{ post.date | date("MMMM DD, YYYY") }}</time>
                    <span class="tags">
                        {% for postTag in post.data.tags %}
                        <a href="/blog/tag-pages/{{ postTag }}/" class="tag">#{{ postTag }}</a>
                        {% endfor %}
                    </span>
                </div>
            </header>
            
            {% if post.data.description %}
            <p class="post-excerpt">{{ post.data.description }}</p>
            {% else %}
            <p class="post-excerpt">{{ post.templateContent | striptags | truncate(150) }}...</p>
            {% endif %}
            
            <footer>
                <a href="{{ post.url }}" class="btn btn-outline">Read More</a>
            </footer>
        </article>
        {% endfor %}
    {% else %}
    <div class="no-posts">
        <p>No posts found with this tag.</p>
    </div>
    {% endif %}
</section>

<nav class="tag-navigation">
    <a href="/blog/tags/" class="btn btn-outline">? All Tags</a>
</nav>

<style>
.tag-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
}

.tag-header h1 {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--spacing-lg);
    color: var(--color-accent);
}

.blog-posts {
    max-width: 800px;
    margin: 0 auto;
}

.blog-post-preview {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.blog-post-preview:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.blog-post-preview h2 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-sm);
}

.blog-post-preview h2 a {
    color: var(--color-primary);
    text-decoration: none;
}

.blog-post-preview h2 a:hover {
    color: var(--color-accent);
}

.blog-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    color: var(--color-secondary);
    font-size: var(--font-size-sm);
}

.tags {
    display: flex;
    gap: var(--spacing-sm);
}

.tag {
    background-color: var(--color-secondary-light);
    color: var(--color-secondary-dark);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    text-decoration: none;
    transition: background-color var(--transition-fast);
}

.tag:hover {
    background-color: var(--color-secondary);
    color: var(--color-white);
    text-decoration: none;
}

.post-excerpt {
    color: var(--color-primary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
}

.no-posts {
    text-align: center;
    padding: var(--spacing-3xl) 0;
    color: var(--color-secondary);
}

.tag-navigation {
    text-align: center;
    margin-top: var(--spacing-3xl);
}

@media (max-width: 768px) {
    .blog-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
    }
}
</style>
