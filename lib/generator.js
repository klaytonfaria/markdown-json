#!/usr/bin/env node

const cli = require('cli')
const path = require('path')
const fs = require('fs')

const metalsmith = require('metalsmith')
const filter = require('metalsmith-filter')
const ignore = require('@metalsmith/remove')
const excerpt = require('@metalsmith/excerpts')
const markdown = require('metalsmith-markdown')

// Plugins
const writeJsonPlugin = require('./plugins/write-json')
const transformDataPlugin = require('./plugins/transform-data')
const serveDataPlugin = require('./plugins/serve-data')

// Global settings
let settings = null

/**
 * Build all data and creates a json file.
 *
 * @method build
 * @returns {Object} Promise
 * @param {{cwd: string, filePattern: string, metadata: boolean, src: string, deterministicOrder: boolean, name: string, ignore: string, dist: string}} options (settings)
 */

const build = options => {
  settings = options
  if (options.display) {
    cli.info(`Path: ${path.resolve(options.cwd, options.src)}`)
    cli.info(`Pattern: ${options.filePattern}`)
    cli.info(`Ignored: ${options.ignore}`)
    cli.info(`Metadata: ${options.metadata}`)
  }

  // Plugins
  const writeJson = writeJsonPlugin(settings)
  const transformData = transformDataPlugin(settings)
  const serveData = serveDataPlugin(settings)

  if (options.dist) {
    const distFolder = path.resolve(
      options.cwd,
      options.dist.replace(/(.*\/).*\.json$/, '$1')
    )
    if (!fs.existsSync(distFolder)) {
      fs.mkdirSync(distFolder, { recursive: true })
    }
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
        .use(markdown({}))
        .use(excerpt())
        .use(transformData)
        .use(writeJson)
        .use(serveData)
        .use((data) => {
          resolve(data)
        })
        .process((err) => err && cli.fatal(err))
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  build
}
