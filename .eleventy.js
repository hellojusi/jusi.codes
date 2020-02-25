const markdownIt = require('markdown-it');
const htmlmin = require('html-minifier');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(eleventyConfig) {
  // replicare Jekyll's markdownify filter
  const markdownItRenderer = new markdownIt();
  eleventyConfig.addFilter('markdownify', function(str) {
    return markdownItRenderer.render(str);
  });

  // syntax highlighting (prism)
  eleventyConfig.addPlugin(syntaxHighlight);

  // minify html output
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // responsive project images shortcode
  eleventyConfig.addShortcode('projectImage', function(content, slug, alt) {
    return `
    <picture class="card__picture--front">
      <source srcset="./images/${slug}-front@1x.webp 1x, ./images/${slug}-front@2x.webp 2x" type="image/webp">
      <source srcset="./images/${slug}-front@1x.jpg 1x, ./images/${slug}-front@2x.jpg 2x" role="presentation" alt="${alt}" width="450">
      <img src="./images/${slug}-front@2x.jpg" role="presentation" alt="${alt}" loading="lazy" width="450">
    </picture>
    <picture class="card__picture--back">
      <source srcset="./images/${slug}-back@1x.webp 1x, ./images/${slug}-back@2x.webp 2x " type="image/webp">
      <source srcset="./images/${slug}-back@1x.jpg 1x, ./images/${slug}-back@2x.jpg 2x" role="presentation" alt="${alt}" width="450">
      <img src="./images/${slug}-back@2x.jpg" role="presentation" alt="${alt}" loading="lazy" width="450">
    </picture>
    `;
  });

  // reponsive content images shortcode
  eleventyConfig.addShortcode('imgPng', function(name, alt, caption, dir) {
    return `
<figure class="illustration wide">
  <picture>
    <source srcset="/images/${name}@05x.webp 600w, /images/${name}@1x.webp 1200w, /images/${name}@2x.webp 2x" type="image/webp">
    <source srcset="/images/${name}@05x.png 600w, /images/${name}@1x.png 1200w, /images/${name}@2x.png 2x" width="1200" alt="${alt}">
    <img src="/images/${name}@1x.png" width="1200" role="presentation" alt="${alt}" loading="lazy">
  </picture>
  <figcaption class="illustration__caption illustration__caption--${dir}">${caption}</figcaption>
</figure>
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
