#!/usr/bin/env node
'use strict'
const cli = require('cli')
const path = require('path')
const fs = require('fs')
const json = require('jsonfile')
const metalsmith = require('metalsmith')
const filter = require('metalsmith-filter')
const ignore = require('metalsmith-ignore')
const excerpt = require('metalsmith-excerpts')
const markdown = require('metalsmith-markdown')
const { transformFileData } = require('./utils')
const pkg =
  json.readFileSync(path.join(__dirname, '/../package.json'), {
    throws: false
  }) || {}

// Global settings
let settings = null

/**
 * To each file gets the data and write a json file.
 *
 * @method writeJson
 * @param {[{}]} files
 * @param metalsmith
 * @param done
 */
const writeJson = (files, metalsmith, done) => {
  const data = {
    app: settings,
    data: []
  }

  data.app.version = pkg ? pkg.version : 'n/a'
  for (const file in files) {
    data.data.push(transformFileData(files[file], file, settings))
  }

  json.writeFileSync(settings.dist, data, { spaces: 2 }, err => {
    cli.fatal(err)
  })

  if (settings.display) {
    cli.info(`Total files: ${Object.keys(files).length}`)
    cli.info(`Output file created on: ${settings.dist}`)
    cli.ok('Markdown to json process has been finished!')
  }

  if (settings.server) {
    serveData(data, settings)
  }
  done()
}

/**
 * Up a server with generated data as response
 *
 * @method serveData
 * @param data
 * @param settings
 */
const serveData = (data, settings) => {
  cli
    .createServer((request, response) => {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(data), 'utf-8')
    })
    .listen(settings.port, () => {
      console.log('Server listening on: http://localhost:%s', settings.port)
    })
}

/**
 * Build all data and creates a json file.
 *
 * @method build
 * @returns {Object} Promise
 * @param {{
 *  name: string,
 *  cwd: string,
 *  src: string,
 *  filePattern: RegExp | String,
 *  ignore: RegExp | String,
 *  dist: string,
 *  display: boolean,
 *  metadata: boolean
 * }} options (settings)
 */

const build = options => {
  const distFolder = path.resolve(
    options.cwd,
    options.src,
    options.dist.replace(/(.*\/).*\.json$/, '$1')
  )
  settings = options
  if (settings.display) {
    cli.info(`Path: ${path.resolve(options.cwd, options.src)}`)
    cli.info(`Pattern: ${options.filePattern}`)
    cli.info(`Ignored: ${options.ignore}`)
    cli.info(`Metadata: ${options.metadata}`)
  }
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder, { recursive: true })
  }
  const ignorePattern = options.ignore
    .toString()
    .replace(/\[|\]/g, '')
    .split(',')

  return new Promise((resolve, reject) => {
    try {
      metalsmith(path.resolve(options.cwd))
        .source(options.src)
        .use(filter(options.filePattern || '**/*.md'))
        .use(ignore(ignorePattern))
        .use(markdown())
        .use(excerpt())
        .use(writeJson)
        .use(data => {
          resolve(data)
        })
        .process((err, files) => {
          if (err) {
            cli.fatal(err)
          }
        })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  build: build
}
