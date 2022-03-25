const cli = require('cli')
/**
 * @param settings
 * @returns {(function(*, *, *))|*}
 */
const plugin = (settings) => {
  /**
   * Up a server with generated data as response
   *
   * @method serveData
   * @param data
   * @param settings
   */
  return function serveData (data, metalsmith, done) {
    if (settings.server) {
      cli
        .createServer((request, response) => {
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify(data), 'utf-8')
        }).listen(settings.port, () => {
          console.log('Server listening on: http://localhost:%s', settings.port)
        })
    } else {
      done()
    }
  }
}

module.exports = plugin
