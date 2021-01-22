const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");

module.exports = {
  dir: {
    output: "_site",
    includes: "_includes"
  }
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