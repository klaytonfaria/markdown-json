const cli = require('cli')
const path = require('path')
const json = require('jsonfile')
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
    if (settings.dist) {
      const data = {
        app: settings,
        data: files.data || []
      }

      data.app.version = pkg ? pkg.version : 'n/a'

      json.writeFileSync(settings.dist, data, { spaces: 2 }, err => {
        cli.fatal(err)
      })
    }

    if (settings.display) {
      cli.info(`Total files: ${Object.keys(files).filter(file => file !== 'data').length}`)
      if (settings.dist) {
        cli.info(`Output file created on: ${settings.dist}`)
      } else {
        cli.info(`Output file creation skipped. Settings Value: ${settings.dist}`)
      }
      cli.ok('Markdown to json process has been finished!')
    }

    done()
  }
}

module.exports = plugin
