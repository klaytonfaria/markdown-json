markdown-json [![npm](https://img.shields.io/npm/dt/markdown-json.svg)]() [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) ![Publish packages](https://github.com/klaytonfaria/markdown-json/workflows/Publish%20packages/badge.svg)
===

Markdown to json has yaml support and converts your markdown files to json so you can use them as a static api.


## Installation

```
npm install markdown-json
```

### Command line usage:
```
markdown-json [OPTIONS] [ARGS]

Options:
  -c, --config [STRING]              settings file (Default is ./settings.json)
  -D, --display BOOLEAN              enable display mode
  -d, --dist [STRING]                output file directory (Default is ./dist/output.json)
  -i, --ignore STRING                ignore file pattern
  -o, --deterministicOrder BOOLEAN   enable deterministic output ordering
  -p, --filePattern [STRING]         file(s) directory (Default is **/*.md)
  -P, --port [NUMBER]                server port (Default is 3001)
  -S, --server BOOLEAN               enable server
  -s, --src [STRING]                 file(s) directory (Default is ./)
  -w, --cwd [STRING]                 work directory (Default is ./)
  -h, --help                         display help and usage details
```

### Require module usage:
```JavaScript
const markdownJson = require('markdown-json');

markdownJson(<settingsObj>) // => returns a Promise
```

## Usage Example:
---

#### Settings example
*Use a object with all settings or save as a json file*

```json
{
  "name": "markdown-json",
  "cwd": "./",
  "src": "example/content/",
  "filePattern": "**/*.md",
  "ignore": "*(icon|input)*",
  "dist": "example/output.json",
  "metadata": true,
  "server": true,
  "port": 3001,
  "deterministicOrder": false
}
```

#### Call through command line example:
```
markdown-json -c ~/app/my-app-settings.json
```

#### Call through require module example:
```JavaScript
const markdownJson = require('markdown-json');
const settings = {
        name: 'markdown-json',
      	cwd: './',
      	src: 'example/content/',
        filePattern: '**/*.md',
        ignore: "*(icon|input)*",
        dist: 'example/output.json',
        metadata: true,
        server: false,
        port: 3001,
        deterministicOrder: false
      };

markdownJson(settings).then((data) => {
  console.log('data:', data);
}).catch((err) => {
  console.log('error:', err);
})
```



## Files input

#### File example 1

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

#### File example 2
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
      "id": "buttons",
      "meta": {
        "relativePath": "content/buttons.html",
        "createdAt": "2020-10-08T16:05:30.415Z",
        "lastModified": "2020-10-08T16:05:14.452Z",
        "size": 2095,
        "formattedSize": "2.0 KB"
      }
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
      "id": "icons",
      "meta": {
        "relativePath": "content/globals/js-utils.html",
        "createdAt": "2019-08-27T18:01:33.747Z",
        "lastModified": "2019-08-27T18:01:33.747Z",
        "size": 331,
        "formattedSize": "331 Bytes"
      }
    }
  ]
}
```


## TODOS
- [X] Node api with promises
- [ ] Unit tests
- [X] Run with http server
- [X] Add file metadata
