#!/usr/bin/env node
'use strict'

const fs = require('fs')
const cli = require('cli')
const path = require('path')
const json = require('jsonfile')
const helpme = require('./lib/helpme')
const extend = require('util')._extend
const generator = require('./lib/generator')
const pkg = json.readFileSync('./package.json', {throws: true}) || null

cli.parse(helpme)

if (require.main === module) {
  cli.main((args, options) => {
    try {
      const file = path.resolve(__dirname, options.config)
      if (fs.existsSync(file)) {
        const settingsFromFile = json.readFileSync(file, { throws: true }) || {}
        const settings = extend(options, settingsFromFile)
        if (options.version) {
          console.log(pkg.version)
        } else {
          generator.build(settings)
        }
      } else {
        cli.error(`File ${options.config} not found!`)
      }
    } catch (e) {
      cli.error(e)
    }
  })
} else {
  module.exports = generator.build
}

