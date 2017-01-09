#!/usr/bin/env node
'use strict'

const cli = require('cli')
const json = require('jsonfile')
const helpme = require('./lib/helpme')
const generator = require('./lib/generator')
const pkg = json.readFileSync('./package.json', {throws: true}) || null

cli.parse(helpme)

cli.main((args, options) => {
  if (options.version) {
    console.log(pkg.version)
  } else {
    generator.init()
  }
})
