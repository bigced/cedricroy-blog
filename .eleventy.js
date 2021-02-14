const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

module.exports = {
  dir: {
    output: "_site",
    includes: "_includes"
  },
  htmlTemplateEngine: "njk"
};

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

    // Add Tailwind Output CSS as Watch Target
  eleventyConfig.addWatchTarget("./_tmp/static/css/style.css");
   // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./_tmp/static/css/style.css": "./static/css/style.css",
    "./admin/config.yml": "./admin/config.yml",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css"});

  // This will copy these folders to the output without modifying them at all
  eleventyConfig.addPassthroughCopy("./static/assets/");

  eleventyConfig.addCollection('tagList', function(collection) {
  	let tagSet = new Set();
  	collection.getAll().forEach(function(item){
  		if ("tags" in item.data) {
  			let tags = item.data.tags.filter(function(item){
  				switch(item) {

	  				case "all":
	  				case "nav":
	  				case "post":
	  				case "posts":
	  					return false;
  				}
  				return true;
  			});

  			for (const tag of tags) {
  				tagSet.add(tag);
  			}
  		}
  	});
  	return [...tagSet];
  });

};