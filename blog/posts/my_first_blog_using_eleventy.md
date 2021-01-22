---
title: Site creation using Agile Principles and Eleventy
description: This is a post on My Blog about agile frameworks.
date: Created
layout: layouts/post.njk
---

# Background
I had the desire to blog on my experience at leading and coaching teams on agile product development for a long time. I always think that in order to fully understand something, it is good to synthetize, organize and socialize your learnings. By doing blog posts on things that I learned will help me fully understand and be able to better coach people.


# Prerequisites of the blogging platform
Here is what I wanted for my blogging platform:
1. No server maintenance.
1. Easy to use editor.
1. Flexible on the page template.
1. Good for SEO.
1. Using my cedricroy.com domain.1. 


Nice to have:
1. Can use the full potential of my domain name. Might be used for other things than a blog.
1. Lowest price possible since it's not my day to day job to blog.

I looked at different existing blogging platforms like:

### [Medium](https://medium.com)
Medium as a wonderful editor. It's pretty easy to create content. Also, the content can be tagged and Medium is providing a newsletter to their members to recommend some articles.

But, Medium put a paywall over a year ago. For me it's a big blocker because my content might not be easily accessible to some readers.


### [Linkedin](https://linkedin.com)
Linkedin is also providing a blogging platform. The advantages would be that it will be tied up to my profile and my connections will be notified when a post is published. But I find that linkedin is not easy to browse the content if you don't have the direct link to an article.

### [Wordpress](https://wordpress.com)
First of all, I'm not a big fan of wordpress. I saw a lot of websites getting hacked because of a flaw in a Wordpress plugin. Also, there is a fee to use your own domain name.

### Static Site generator

Static site generators came around a couple of years ago. I found an article in July 2015 [An Introduction to Static Site Generators](https://archive.vn/20150721063623/http://davidwalsh.name/introduction-static-site-generators). The idea is that your website will only be served through static files. It has a lot of advantages:
* SEO friendly because they are fast to load. No server side rendering time.
* It's secured because they are not accessing a server and a database.
* Hosting is pretty cheap because it only needs to serve static files.

I decided to take a stab at it and build my blogging platform using one of these after reading this post of [Yann. B. on linkedin](https://www.linkedin.com/posts/yann-boisselier_mes-4-coups-de-coeurs-parmi-les-technologies-activity-6748974841447096320-sKwx).

# Strategy

The strategy that I want to use is the same that I’m proning on every project.  Deliver an MVP in order to get quick feedback or assess the risks.

## MVP Vision

>  Being able to easily publish and update a website using a static site generator.

That vision will help me to keep focus on delivering value

## What are the desired outcomes?
1. Website at cedricroy.com deployed and available for search engines.
1. New pages and blog posts are easy to deploy.


# Deliverables

I decided to use Eleventy to generate my static website and Netlify for hosting.  Netlify has a free tier that allows me to host my website.  Netlify has also an integration with Github to automate builds and deployments of generated content.

Every update to the website will be done using git and GitHub.  The repository of my website can be found on [GitHub](https://github.com/bigced/cedricroy-blog) .  

Eleventy is providing a lot of tutorials.   The tutorial that I’m using for inspiration is this: [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog)

I tried to stay away from styling and adding javascript.  They are not mandatory to have a website and a first blog post delivered in production.

# How?

## Step 1 - Learn 11th

First of all, I created a github repository to store my website code.  Then I cloned the repository onto my computer.

```
~ $ git clone git@github.com:bigced/cedricroy-blog.git
~ $ cd cedricroy-blog
```
Then I headed down to the Eleventy website.

Eleventy is based on node.js.  It’s really flexible and you can have different types of templating engine like markdown or mozilla nunjucks.  You can also augment the behavior by creating different filters to format the data.  Let’s create an 11ty project.

```
~ $ nvm use 10
~ $ npm init -y
~ $ npm install --save-dev @11ty/eleventy
```

Now let’s validate the installation:
```
~ $ npx @11ty/eleventy
Processed 0 files in 0.03 seconds (v0.11.1)

```

Let's create an `index.html`

```
~ $ echo '<!doctype html><html><head><title>Page title</title></head><body><p>Hi</p></body></html>' > index.html
```

And finally, 11ty has a built-in server with auto reload on any file change.  Let’s use that in order to see the `index.html`
```
~ $ npx @11ty/eleventy --serve
```

If you point your browser to the url provided in the terminal, you should see the page with the *Hi*.

## Step 2 - Create base template

Each file in 11ty can be based on a template.  A template can extend another template.  I need to create the base one that will contain the theme of my site.

```
<!doctype html>
<html class="text-gray-900 antialiased leading-tight" lang="en">
	<head>
	   <meta charset="utf-8">
	   <meta name="viewport" content="width=device-width, initial-scale=1.0">
	   <title>Cedric Roy's corner | {{ title or metadata.title }}</title>
	   <meta name="description" content="{{ description or metadata.description }}">
 </head>
 <body>
   <header>
    </header>
   <main{% if templateClass %} class="{{ templateClass }}"{% endif %}>
     {{ content | safe }}
   </main>
   <footer></footer>
   <!-- Current page: {{ page.url | url }} -->
 </body>
</html>

```

It’s a basic HTML page with some variable that will be defined by the underlying pages.  If the variable is not defined, it will be replaced by an empty string.  The base template is waiting for the following variable:
* Title - This will be appended to the page title.
* Description - It will be used in the meta description for SEO.
* templateClass - Will be used to insert classes on the main object.
* content - The content to be published.

Let’s save the template under `⁄cedricroy-blog⁄_includes⁄layouts⁄base.njk`

I created a home template.  But it’s empty at this moment other than the templateClass and it’s located at `⁄cedricroy-blog⁄_includes⁄layouts⁄home,njk`
```
layout: layouts/base.njk
templateClass: tmpl-home
---
{{ content | safe }}

```

Finally let’s put the home page in place.  I created the file  `⁄cedricroy-blog⁄index.njk`

```
---

layout: layouts/home.njk
title: Home
description: Building software development team that delivers value.
---



<h1>About Me</h1>
<p>I'm Cedric Roy</p>
<p>I've been developing and building software teams for over 15 years around the Agile principles.</p>
<p>This blog will be around product development, feature prioritization and how to scale a product team through the use of the Product Operations Manager role.</p>
```

The header it’s where we are defining the variables of the project.  I’m telling the framework to use layouts⁄home.njk as a template.  Also the title of the page will be Home.

### Configuring 11ty

I need to configure the includes for the layouts and the output folder for the generated website.  By editing the `⁄cedricroy-blog⁄.eleventy.js` file I was able to set that up.

```

module.exports = {

	 dir: {
	   output: "_site",
	   includes: "_includes"
	 }
};

Now it’s time to commit and push the changes.
```

## Step 3 - Deploying to netlify
* Step one: connect with the cloud git provider.  I picked github.
* Step two: pick the repository of your blog.
* Step three: deploy - I picked the main branch to deploy.  Also, I picked eleventy as my build command and the `_site` folder to be deployed.

Now everytime I’m pushing my changes to github, my site is being deployed.

I updated the nameservers in my domain registrar with the one provided by netlify and I was easily able to have a secure website.

