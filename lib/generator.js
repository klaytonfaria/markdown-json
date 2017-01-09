#!/usr/bin/env node
'use strict'
const cli = require('cli')
const json = require('jsonfile')
const metalsmith = require('metalsmith')
const filter = require('metalsmith-filter')
const markdown = require('metalsmith-markdown')
// const collections = require('metalsmith-collections')
// const prompt = require('metalsmith-prompt')
const pkg = json.readFileSync(__dirname + '/../package.json', { throws: true }) || {}
const settings = json.readFileSync(__dirname + '/../settings.json', { throws: true }) || {}

const writeJson = (files, metalsmith, done) => {
  var data = {
    app: settings,
    data: []
  }

  data.app.version = pkg.version

  for (var file in files) {
    files[file].contents = files[file].contents.toString()
    //   files[file].section = files[file].section || 'others';
    files[file].id = file.replace(/\.md|\.html/, '').replace(/\//g, '__')
    //   if (files[file].scripts) {
    //     files[file].scripts = files[file].scripts.replace(/\s/g, '').split(',');
    //   }

    //   if (files[file].styles) {
    //     files[file].styles = files[file].styles.replace(/\s/g, '').split(',');
    //   }

    //   data.app.home = options.home.replace('.md', '');

      // Removing unnecessaries properties...
    delete files[file].mode
    delete files[file].stats
    delete files[file].template
    data.data.push(files[file])
  }
  cli.info('Creating data with markdown founded...')

  json.writeFileSync(settings.dist, { data: data }, { spaces: 2 }, (err) => {
    cli.fatal(err)
  })
  cli.ok(`Reactdocs data created on ${settings.dist}`)
  if (cli.options.compile) {
    cli.spinner('Compiling app...', false)
  }
  done()
}

module.exports = ((obj) => {
  const build = () => {
    cli.info(`Reading all markdown files from ${settings.cwd}${settings.src}`)
    metalsmith(settings.cwd)
      .source(settings.src)
      .use(filter(settings.filePattern || '**/*.md'))
      .use(markdown())
      .use(writeJson)
      .build((err, files) => {
        if (err) {
          cli.fatal(err)
        }
      })
  }

  return {
    init: (config) => {
      build(config)
    }
  }
})()
