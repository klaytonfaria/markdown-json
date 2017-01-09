#!/usr/bin/env node
"use strict"
var cli = require("cli"),
    json = require("jsonfile"),
    metalsmith = require("metalsmith"),
    filter = require("metalsmith-filter"),
    markdown = require("metalsmith-markdown"),
    collections = require("metalsmith-collections"),
    prompt = require("metalsmith-prompt"),
    pkg = json.readFileSync(__dirname + "/../package.json", { throws: true }) || {},
    options = json.readFileSync(__dirname + "/../reactdocs.json", { throws: true }) || {},
    destFile = __dirname + "/../app/resources";

module.exports = (function(obj) {

  var setHome = (data) => {
    return data;
  };

  var writeJson = (files, metalsmith, done) => {
    var data = {
      app: obj || options,
      data: []
    };

    data.app.version = pkg.version;

    for (var file in files) {
      files[file].contents = files[file].contents.toString();
      files[file].section = files[file].section || "others";
      files[file].id = file.replace(/\.md|\.html/, "").replace(/\//g, "__");
      if (files[file].scripts) {
        files[file].scripts = files[file].scripts.replace(/\s/g, "").split(",");
      }

      if (files[file].styles) {
        files[file].styles = files[file].styles.replace(/\s/g, "").split(",");
      }

      data.app.home = options.home.replace(".md", "");

      // Removing unnecessaries properties...
      delete files[file].mode;
      delete files[file].stats;
      delete files[file].template;
      data.data.push(files[file]);
    }
    cli.info("Creating data with markdown founded...");
    json.writeFileSync(destFile + "/data.json", { data: data }, { spaces: 2 }, function(err) {
      cli.fatal(err);
    });
    cli.ok("Reactdocs data created!");
    if (cli.options.compile) {
      cli.spinner("Compiling app...", false);
    }
    done();
  }

  function build(optionsObj) {
    var options = optionsObj || options;
    cli.info("Reading all markdown files from " + options.cwd);
    metalsmith(options.cwd || ".")
      .source(options.src)
      .use(filter(options.filePattern || "**/*.md"))
      .use(markdown())
      .use(writeJson)
      .build(function(err, files) {
        if (err) {
          cli.fatal(err);
        }
      });
  }

  return {
    init: function(config) {
      build(config);
    }
  }
})();
