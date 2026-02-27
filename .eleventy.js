module.exports = function (eleventyConfig) {
  // Ignore template files (they have placeholder dates)
  eleventyConfig.ignores.add("src/journal/during/_template.md");

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/photos");

  // Collections for journal phases
  eleventyConfig.addCollection("before", function (collectionApi) {
    return collectionApi.getFilteredByTag("before").sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addCollection("during", function (collectionApi) {
    return collectionApi.getFilteredByTag("during").sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addCollection("after", function (collectionApi) {
    return collectionApi.getFilteredByTag("after").sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addCollection("journal", function (collectionApi) {
    return collectionApi.getFilteredByTag("journal").sort((a, b) => a.date - b.date);
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateDisplay", function (dateObj) {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Short date filter
  eleventyConfig.addFilter("dateShort", function (dateObj) {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  });

  // ISO date filter
  eleventyConfig.addFilter("dateISO", function (dateObj) {
    if (!dateObj) return "";
    return new Date(dateObj).toISOString();
  });

  // Slug filter for phase labels
  eleventyConfig.addFilter("lower", function (str) {
    return str ? str.toLowerCase() : "";
  });

  // String startsWith filter for nav highlighting
  eleventyConfig.addFilter("startsWith", function (str, prefix) {
    return str ? str.startsWith(prefix) : false;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
