Junio Summerjobs 2016
=====================

## Prerequisites

1. NodeJS
2. `npm update npm`
3. `[sudo] npm install -g grunt grunt-cli`
4. Ruby
5. `[sudo] gem install jekyll`


## Development

```
npm install
grunt development
jekyll serve
# open localhost:4000 to see the website
```

## Build

```
npm install
grunt production
jekyll build
# the build is in located in _site/
```


## Add a new company/job

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

    All images and assets for the company and it's jobs are placed inside the company folder.

