---
title: RSS Feed
description: "Subscribe to our RSS feed for the latest updates"
link: http://localhost:8080/feed.xml
layout: layouts/base.njk
---

<section class="rss-header">
    <h1>RSS Feed</h1>
    <p class="lead">Subscribe to our RSS feed to get the latest blog posts delivered directly to your feed reader</p>
</section>

<section class="rss-content">
    <div class="rss-info">
        <h2>What is RSS?</h2>
        <p>RSS (Really Simple Syndication) is a web feed that allows you to access updates to online content in a standardized format. You can subscribe to our RSS feed using a feed reader to get the latest blog posts without having to visit our website.</p>
        
        <h2>How to Subscribe</h2> <h1>In Progress... Coming Soon!</h1>
        <ol>
            <li>Copy the RSS feed URL: <code> </code></li>
            <li>Paste it into your favorite RSS reader (like Feedly, Inoreader, or Feedbin)</li>
            <li>Enjoy automatic updates whenever we publish new content!</li>
        </ol>
        
        <div class="rss-button">
            <a href="/feed.xml" class="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 11a9 9 0 0 1 9 9v1.5a1.5 1.5 0 0 1-3 0V20a7 7 0 0 0-7-7v-1.5a1.5 1.5 0 0 1 3 0V11Z" fill="currentColor"/>
                    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3v1.5a10.5 10.5 0 0 1 10.5 10.5v1.5a1.5 1.5 0 0 1-3 0V15A7.5 7.5 0 0 0 5.5 7.5V6A1.5 1.5 0 0 1 4 4.5Z" fill="currentColor"/>
                    <circle cx="6" cy="18" r="1.5" fill="currentColor"/>
                </svg>
                Come Back Later to Subscribe to My RSS Feed
            </a>
        </div>
    </div>
</section>

<style>
.rss-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
}

.rss-header h1 {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--spacing-lg);
}

.rss-content {
    max-width: 800px;
    margin: 0 auto;
}

.rss-info {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-2xl);
}

.rss-info h2 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-md);
    color: var(--color-accent);
}

.rss-info p, .rss-info li {
    color: var(--color-primary);
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
}

.rss-info ol {
    margin-left: var(--spacing-lg);
}

.rss-info code {
    background-color: var(--color-secondary-light);
    color: var(--color-secondary-dark);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-family: var(--font-family-mono);
}

.rss-button {
    text-align: center;
    margin-top: var(--spacing-xl);
}

.rss-button .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
}

@media (max-width: 768px) {
    .rss-info {
        padding: var(--spacing-lg);
    }
}
</style>
