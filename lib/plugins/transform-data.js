const { formatBytes } = require('../utils')

/**
 * @param settings
 * @returns {(function(*, *, *))|*}
 */
const transformDataPlugin = (settings = {}) => {
  /**
   * @function transformFileData
   *
   * @description transform file payload
   * @param files
   * @param metalsmith
   * @param done
   * @return <Data>
   */

  /**
   *
   * @param files
   * @param metalsmith
   * @param done
   * @returns {*[]}
   */
  function transformData (files, metalsmith, done) {
    let data = []

    for (const file in files) {
      if (file !== 'data') {
        const {
          contents,
          stats,
          mode,
          ...otherProperties
        } = files[file]

        const meta = settings.metadata && {
          meta: {
            relativePath: file,
            createdAt: stats.ctime,
            lastModified: stats.mtime,
            size: stats.size,
            formattedSize: formatBytes(stats.size)
          }
        }

        data.push({
          id: file.replace(/\.md|\.html/, '').replace(/\//g, '__'),
          contents: contents.toString(),
          ...otherProperties,
          ...meta
        })
      }
    }

    if (settings.deterministicOrder) {
      data = data.sort((firstFile, secondFile) => firstFile.id < secondFile.id ? -1 : 1)
    }

    files.data = data
    typeof done === 'function' && done.call()

    return data
  }

  return transformData
}

module.exports = transformDataPlugin
