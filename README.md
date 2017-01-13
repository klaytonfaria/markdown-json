markdown-json [![npm](https://img.shields.io/npm/dt/markdown-json.svg)]() [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
===

## Introduction

Markdown to json has yaml support and converts your markdown files to json so you can use them as a static api.


### Installation

```
npm install markdown-json
```

### Usage

```
markdown-json [OPTIONS] [ARGS]

Options:
  -c, --config [STRING]  settings file (Default is ./settings.json)
  -w, --cwd [STRING]     work directory (Default is ./)
  -d, --src [STRING]     file(s) directory (Default is ./)
  -p, --filePattern [STRING]file(s) directory (Default is **/*.md)
  -d, --dist [STRING]    output file directory (Default is /app/settings.json)
  -h, --help             Display help and usage details
```


# Examples

Cli example
```
markdown-json -c ~/app/my-app-settings.json
```

## Settings file

Using a json file as settings.

```json
{
  "name": "markdown-json",
  "cwd": "./",
  "src": "example/content/",
  "filePattern": "**/*.md",
  "dist": "example/output.json"
}
```

## Files

### File example 1

```markdown
---
section: Elements
title: icons
tags: 
- icons
- base
---

# Icons

Our icons list still is empty :(
```

### File example 2
```markdown
---
section: Elements
title: buttons
device: 
- desktop
- mobile
styles: 
- https://lalao.com/styles/structure.min.css
- https://lalao.com/styles/app.min.css
---

Follow some application examples of buttons

Types
============

## Base

Base button layout sample:

<button type="button" class="buy-button btn btn-success">
  <span class="icon"></span>
  <span class="text">Button</span>
</button>

\~~~scss
.btn-primary {
  @include states(#1A75CE, #086B9C);
}
\~~~

\~~~html
<button type="button" class="buy-button btn btn-success">
  <span class="icon"></span>
  <span class="text">Button</span>
</button>
\~~~
```


## Output:
```json
{
  "app": {
    "config": "./settings.json",
    "cwd": "./",
    "src": "example/content/",
    "filePattern": "**/*.md",
    "dist": "example/output.json",
    "name": "markdown-json",
    "version": "0.0.1"
  },
  "data": [
    {
      "section": "Elements",
      "title": "buttons",
      "device": [
        "desktop",
        "mobile"
      ],
      "styles": [
        "https://lalao.com/styles/structure.min.css",
        "https://lalao.com/styles/app.min.css"
      ],
      "contents": "<p>Follow some application examples of buttons</p>\n<h1 id=\"types\">Types</h1>\n<h3 id=\"base\">Base</h3>\n<p>Base button layout sample:</p>\n<button type=\"button\" class=\"buy-button btn btn-success\">\n  <span class=\"icon\"></span>\n  <span class=\"text\">Button</span>\n</button>\n\n<pre><code class=\"lang-scss\">.btn-primary {\n  @include states(#1A75CE, #086B9C);\n}\n</code></pre>\n<pre><code class=\"lang-html\">&lt;button type=&quot;button&quot; class=&quot;buy-button btn btn-success&quot;&gt;\n  &lt;span class=&quot;icon&quot;&gt;&lt;/span&gt;\n  &lt;span class=&quot;text&quot;&gt;Button&lt;/span&gt;\n&lt;/button&gt;\n</code></pre>\n",
      "excerpt": "<p>Follow some application examples of buttons</p>",
      "id": "buttons"
    },
    {
      "section": "Elements",
      "title": "icons",
      "tags": [
        "icons",
        "base"
      ],
      "contents": "<h1 id=\"icons\">Icons</h1>\n<p>Our icons list still is empty :(</p>\n",
      "excerpt": "<p>Our icons list still is empty :(</p>",
      "id": "icons"
    }    
  ]
}
```


## TODOS
- [ ] Node api with promises
- [ ] Code review
- [ ] some unit tests
