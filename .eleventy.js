module.exports = function(eleventyConfig) {
  const markdownIt = require('markdown-it');
  const markdownItRenderer = new markdownIt();

  // replicare Jekyll's markdownify filter
  eleventyConfig.addFilter('markdownify', function(str) {
    return markdownItRenderer.render(str);
  });

  // responsive images shortcode
  eleventyConfig.addShortcode('projectImage', function(content, slug, alt) {
    return `
    <picture class="card__picture--front">
      <source srcset="./images/${slug}-front.webp" type="image/webp">
      <source srcset="./images/${slug}-front@1x.jpg 1x, ./images/${slug}-front@2x.jpg 2x" role="presentation" alt="${alt}" width="450">
      <img src="./images/${slug}-front@2x.jpg" role="presentation" alt="${alt}" width="450">
    </picture>
    <picture class="card__picture--back">
      <source srcset="./images/${slug}-back.webp" type="image/webp">
      <source srcset="./images/${slug}-back@1x.jpg 1x, ./images/${slug}-back@2x.jpg 2x" role="presentation" alt="${alt}" width="450">
      <img src="./images/${slug}-back@2x.jpg" role="presentation" alt="${alt}" width="450">
    </picture>
    `;
  });

  // passthrough
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
