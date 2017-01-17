#!/usr/bin/env node
'use strict'
const cli = require('cli')
const path = require('path')
const json = require('jsonfile')
const metalsmith = require('metalsmith')
const filter = require('metalsmith-filter')
const ignore = require('metalsmith-ignore')
const excerpt = require('metalsmith-excerpts')
const markdown = require('metalsmith-markdown')
const pkg = json.readFileSync(path.join(__dirname, '/../package.json'), { throws: true }) || {}

// Global settings
let settings = null

/**
 * To each file gets the data and write a json file.
 *
 * @method writeJson
 * @param {files} Object.Array
 * @param {metalsmith} Object
 * @param {done} Function
 */

const writeJson = (files, metalsmith, done) => {
  var data = {
    app: settings,
    data: []
  }

  data.app.version = pkg.version
  for (var file in files) {
    files[file].contents = files[file].contents.toString()
    files[file].id = file.replace(/\.md|\.html/, '').replace(/\//g, '__')
// Removing unnecessaries properties...
    delete files[file].mode
    delete files[file].stats
    delete files[file].template
// consolidating data
    data.data.push(files[file])
  }

  json.writeFileSync(settings.dist, data, {spaces: 2}, (err) => {
    cli.fatal(err)
  })

  if (settings.display) {
    cli.info(`Total files: ${Object.keys(files).length}`)
    cli.info(`Output file created on: ${settings.dist}`)
    cli.ok('Markdown to json process has been finished!')
  }

  if (settings.server) {
    serverContent(data, settings)
  }
  done()
}

const serverContent = (data, settings) => {
  cli.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(data), 'utf-8')
  }).listen(settings.port, () => {
    console.log('Server listening on: http://localhost:%s', settings.port)
  })
}

/**
 * Build all data and creates a json file.
 *
 * @method build
 * @param {options} Object
 * @returns {Object} Promise
 */

const build = (options) => {
  settings = options
  if (settings.display) {
    cli.info(`Path: ${options.cwd}${options.src}`)
    cli.info(`Pattern: ${options.filePattern}`)
    cli.info(`Ignored: ${options.ignore}`)
  }
  let ignorePattern = options.ignore.toString().replace(/\[|\]/g, '').split(',')
  let promise = new Promise((resolve, reject) => {
    try {
      metalsmith(options.cwd)
       .source(options.src)
       .use(filter(options.filePattern || '**/*.md'))
       .use(ignore(ignorePattern))
       .use(markdown())
       .use(excerpt())
       .use(writeJson)
       .use((data) => {
         resolve(data)
       })
       .build((err, files) => {
         if (err) {
           cli.fatal(err)
         }
       })
    } catch (err) {
      reject(err)
    }
  })
  return promise
}

module.exports = {
  build: build
}
