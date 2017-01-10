# markdown-json

## Introduction

Markdown to json has yaml support and converts your markdown files to json so you can use them as a static api.


## Installation

`npm install markdown-json`

## Usage

```
markdown-json [OPTIONS]

Options:
      --cwd [STRING]     work directory (Default is ./)
      --src [STRING]     file(s) directory (Default is ./)
      --filePattern [STRING]file(s) directory (Default is **/*.md)
      --dist [STRING]    output file directory (Default is /app/settings.json)
  -h, --help             Display help and usage details
```

## Input example
```markdown
---
section: Elements
title: input
date: 2012-12-07
device: 
- desktop 
- tablet
---

## Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
Ullam aspernatur et natus saepe fugiat, eligendi veniam temporibus accusamus molestiae expedita unde? Totam necessitatibus odit consequatur fugit voluptatem, accusamus qui, voluptas.

```

## Output example
```json
{
  "app": {
    "name": "markdown-json",
    "cwd": "./",
    "src": "example/content/",
    "filePattern": "**/*.md",
    "dist": "example/output.json",
    "version": "0.0.1"
  },
  "data": [    
    {
      "section": "Elements",
      "title": "input",
      "date": "2017-01-01T00:00:00.000Z",
      "device": [
        "desktop",
        "tablet"
      ],
      "contents": "<h2 id=\"lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-\">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>\n<p>Ullam aspernatur et natus saepe fugiat, eligendi veniam temporibus accusamus molestiae expedita unde? Totam necessitatibus odit consequatur fugit voluptatem, accusamus qui, voluptas.</p>\n",
      "excerpt": "<p>Ullam aspernatur et natus saepe fugiat, eligendi veniam temporibus accusamus molestiae expedita unde? Totam necessitatibus odit consequatur fugit voluptatem, accusamus qui, voluptas.</p>",
      "created": "2017-01-10T21:36:55.568Z",
      "updated": "2017-01-10T21:36:55.568Z",
      "modified": false,
      "id": "input"
    }
  ]
}
```


## Settings file

Markdown to json needs follow settings file.

```json
{
  "name": "markdown-json",
  "cwd": "./",
  "src": "example/content/",
  "filePattern": "**/*.md",
  "dist": "example/output.json"
}
```
