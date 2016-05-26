Junio Summerjobs 2016
=====================

## Setup

### Prerequisites

1. NodeJS
2. `npm update npm`
3. `[sudo] npm install -g grunt grunt-cli`
4. Ruby
5. `[sudo] gem install jekyll`
6. `[sudo] gem install jekyll-minibundle`
7. `[sudo] gem install jekyll-sitemap`


### Development

```
npm install
grunt development
jekyll serve
# open localhost:4000 to see the website
```

### Build

```
npm install
grunt production
jekyll build
# the build is in located in _site/
```

## Edit content

### Add a new company/job

  1. Make a copy of the template folder:

  ```
  cp template-company [company-name]
  ```
    where `[company-name]` is the lowercased company name joined by '-' (e.g., 'Eau de Web' becomes 'eau-de-web').

  2. Edit [company-name]/index.html

  3. Edit job template:

  ```
  # in [company-name]/
  mv template-job.html [job-title].html
  ```
    where `[job-title]` is the lowercased job title joined by '-' (e.g., 'Junior Frontend Developer' becomes 'junior-frontend-developer').

    Be sure not to leave template-job.html in the folder. It will show up in the company's job listing.


  4. Add logos, images

    All images and assets for the company and its jobs are placed inside the company folder. This includes logos, job thumbnails, company cover and job cover.

    Logos and thumbnails need to be specified in the company/job template.
    Covers are added using inline CSS.


The result should look something like this:

```
/company
  index.html               # the company page
  company-logo.png         # default company logo
  company-logo-alt.png     # optional logo for dark backgrounds
  company-name-cover.png   # company page cover
  job-title.html           # job page
  job-title-thumb.jpg      # job page thumbnail
  job-title-cover.png      # job page cover
  
  ...
  # other photos
```

### Sort jobs/companies

Add `weight: [int]` to sort jobs/companies like so:

```
job:
  title: 'Job example'
  weight: 10
```

Jobs and companies are sorted by weight from largest number to lowest.
Default is 0 for opened jobs and -1 for closed jobs.

### Close jobs

Add `status: closed` to job like so:

```
job:
  title: 'Job example'
  status: closed
  ...
```

## Plugins

### Asset versioning

CSS and JS files are versioned using the `jekyll-minibundle` gem. For that to work, we need to build the files in `_static/` and the gem takes care of the rest.

In order to correctly link to assets read [the jekyll-minibundle documentation](https://github.com/tkareine/jekyll-minibundle)


### Sitemap

Most of the sitemap is generated automatically by the _jekyll-sitemap_ gem.
In order to add `<changefreq/>` or `<priority/>` to some locations you need to add:

  1. Add `sitemap: false` to the front matter of that page. This excludes it from the automatic sitemap generator, then
  2. Add that url and additional properties in `sitemap_handmade.xml`
