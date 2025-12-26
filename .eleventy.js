// .eleventy.js

const pluginRss = require("@11ty/eleventy-plugin-rss");
const { minify } = require("html-minifier-terser");
const CleanCSS = require("clean-css");

// Detect production environment
const isProduction = process.env.CONTEXT === "production" || process.env.NODE_ENV === "production";

module.exports = function(eleventyConfig) {
  // Add RSS plugin
  eleventyConfig.addPlugin(pluginRss);
  
  // Add passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  
  // Add minification for production only
  if (isProduction) {
    eleventyConfig.addTransform("html", function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        return minify(content, {
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          minifyJS: true
        });
      }
      return content;
    });
  }

  // Add minification for production
  eleventyConfig.addPlugin(CleanCSS, {
    output: "dist/assets/css/style.min.css",
    options: {
      level: 2
    }
  });
  
  // Add transform for production
  eleventyConfig.addTransform("html", function(content, outputPath) {
    if (process.env.NODE_ENV === "production") {
      return minify(content, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true,
        minifyJS: true
      });
    }
    return content;
  });
  
  // Add collections
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/_subsites/blog/posts/**/*.md")
      .filter(item => item.data.date) // Only include items with a date
      .sort((a, b) => b.date - a.date); // Sort by date, newest first  
  });
  
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("src/projects/**/*.md");
  });
  
  eleventyConfig.addCollection("achievements", function(collection) {
    return collection.getFilteredByGlob("src/achievements/**/*.md");
  });
  
  eleventyConfig.addCollection("legacy", function(collection) {
    return collection.getFilteredByGlob("src/legacy/**/*.md");
  });
  
  eleventyConfig.addCollection("robotics", function(collection) {
    return collection.getFilteredByGlob("src/robotics/**/*.md");
  });
  
  eleventyConfig.addCollection("n8nchief", function(collection) {
    return collection.getFilteredByGlob("src/n8nchief/**/*.md");
  });
  
  eleventyConfig.addCollection("leadership", function(collection) {
    return collection.getFilteredByGlob("src/leadership/**/*.md");
  });
  
  eleventyConfig.addCollection("innovation", function(collection) {
    return collection.getFilteredByGlob("src/innovation/**/*.md");
  });
  
  eleventyConfig.addCollection("contact", function(collection) {
    return collection.getFilteredByGlob("src/contact/**/*.md");
  });
  
  eleventyConfig.addCollection("nucleus", function(collection) {
    return collection.getFilteredByGlob("src/nucleus/**/*.md");
  });
  
  // Add tag collection
  eleventyConfig.addCollection("tagList", function(collection) {
    const tagSet = new Set();
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }
        tags.forEach(tag => tagSet.add(tag));
      }
    });
    return [...tagSet].sort();
  });
  
  // Add tagPages collection
  eleventyConfig.addCollection("tagPages", function(collection) {
    const tagPages = [];
    const tagList = [];
    
    // Get all unique tags
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }
        tags.forEach(tag => tagList.push(tag));
      }
    });
    
    // Create unique tag list
    const uniqueTags = [...new Set(tagList)].sort();
    
    // Create tag pages with posts
    uniqueTags.forEach(tag => {
      const posts = collection.getFilteredByTag(tag);
      tagPages.push({
        tag: tag,
        posts: posts
      });
    });
    
    return tagPages;
  });
  
  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });
  
  // Add readable date filter
  eleventyConfig.addFilter("readableDate", function(date) {
    const d = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });

  // Add HTML date string filter
  eleventyConfig.addFilter("htmlDateString", function(date) {
    return new Date(date).toISOString().slice(0, 10);
  });  
  
  // Add limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Add where filter
  eleventyConfig.addFilter("where", function(array, key, value) {
    return array.filter(item => {
      if (typeof item.data === "undefined") {
        return false;
      }
      const itemValue = item.data[key];
      if (Array.isArray(itemValue)) {
        return itemValue.includes(value);
      }
      return itemValue === value;
    });
  });
  
  // Add getNewestCollectionItemDate filter for RSS
  eleventyConfig.addFilter("getNewestCollectionItemDate", function(collection) {
    if (collection.length === 0) {
      return new Date();
    }
    return new Date(Math.max(...collection.map(item => new Date(item.date))));
  });
  
  // Add diagram data filter
  eleventyConfig.addFilter("diagramData", function(data, type) {
    if (type === "mermaid") {
      return data;
    } else if (type === "chart") {
      return JSON.stringify(data);
    }
    return data;
  });
  
  // Add shortcodes for charts and robotics diagrams
  eleventyConfig.addPairedShortcode("chartContainer", function(content, id, title, description) {
    return `
<div class="diagram-container chart-container">
  <h3 class="diagram-title">${title}</h3>
  <p class="deployment section">
    <h3 class="deployment-title">Deployment</h3>
    <div class="deployment-content">
      <h4>Production</h4>
      <p>Deployed to Netlify with automatic builds from main branch</p>
      <div class="deployment-badge">Live</div>
    </div>
  </p>
  <div class="chart-wrapper">
    <canvas id="chart-${id}" width="400" height="200"></canvas>
  </div>
  <script>
 ${content}
  </script>
</div>`;
  });
  
  eleventyConfig.addPairedShortcode("roboticsDiagram", function(content, id, title, description) {
    return `
<div class="diagram-container robotics-diagram">
  <h3 class="diagram-title">${title}</h3>
  <p class="diagram-description">${description}</p>
  <div class="robotics-diagram-content" id="robotics-${id}">
 ${content}
  </div>
</div>`;
  });
 
  // Configure Nunjucks
  eleventyConfig.setNunjucksEnvironmentOptions({
    autoescape: false
  });
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};