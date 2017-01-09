#!/usr/bin/env node
"use strict"

var cli = require("cli"),
    utils = require("./lib/utils"),
    json = require("jsonfile"),
    helpme = require("./lib/helpme"),
    options = cli.parse(helpme),
    pkg = json.readFileSync("package.json", {throws : true}) || null;

cli.main(function(args, options) {
  if(options.version) {
    console.log(pkg.version);
  } else {
    var settingsGenerator = require("./lib/settingsGenerator")(options),
        content = settingsGenerator.readFile(options.cwd + options.src);
    utils.writeJson(options.dist, content);
  }
});
