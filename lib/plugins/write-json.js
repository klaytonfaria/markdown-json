const cli = require('cli')
const path = require('path')
const json = require('jsonfile')
const { transformFileData } = require('../utils')
const pkg =
  json.readFileSync(path.join(__dirname, '/../package.json'), {
    throws: false
  }) || {}

/**
 * @param settings
 * @returns {(function(*, *, *))|*}
 */
const plugin = settings => {
  /**
   * To each file gets the data and write a json file.
   *
   * @method writeJson
   * @param {[{}]} files
   * @param metalsmith
   * @param done
   */
  return function writeJson (files, metalsmith, done) {
    const data = {
      app: settings,
      data: []
    }

    data.app.version = pkg ? pkg.version : 'n/a'

    for (const file in files) {
      data.data.push(transformFileData(files[file], file, settings))
    }
    if (settings.deterministicOrder) {
      data.data.sort((firstFile, secondFile) => firstFile.id < secondFile.id ? -1 : 1)
    }

    json.writeFileSync(settings.dist, data, { spaces: 2 }, err => {
      cli.fatal(err)
    })

    if (settings.display) {
      cli.info(`Total files: ${Object.keys(files).length}`)
      cli.info(`Output file created on: ${settings.dist}`)
      cli.ok('Markdown to json process has been finished!')
    }

    done()
  }
}

module.exports = plugin
