#!/usr/bin/env node
'use strict'
const cli = require('cli')
const json = require('jsonfile')
const metalsmith = require('metalsmith')
const filter = require('metalsmith-filter')
const updated = require('metalsmith-updated')
const excerpt = require('metalsmith-excerpts')
const markdown = require('metalsmith-markdown')
const pkg = json.readFileSync(__dirname + '/../package.json', { throws: true }) || {}
var settings = '/../settings.json'

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
    data.data.push(files[file])
  }

  cli.info(`Total files: ${Object.keys(files).length}`)

  json.writeFileSync(settings.dist, data, { spaces: 2 }, (err) => {
    cli.fatal(err)
  })
  cli.info(`Output file created on: ${settings.dist}`)
  cli.ok('Markdown to json process has been finished!')

  done()
}

const build = (settingsFile) => {
  settings = json.readFileSync(__dirname + (settingsFile || settings), { throws: true }) || {}
  cli.info(`Path: ${settings.cwd}${settings.src}`)
  cli.info(`Pattern: ${settings.filePattern}`)

  metalsmith(settings.cwd)
	.source(settings.src)
	.use(filter(settings.filePattern || '**/*.md'))
	.use(markdown())
	.use(excerpt())
	.use(updated())
	.use(writeJson)
	.build((err, files) => {
  	    if (err) {
    		cli.fatal(err)
  		}
	})
}

module.exports = {
  build: build
}
