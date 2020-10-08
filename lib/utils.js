const FILE_SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB']

/**
 * @function formatBytes
 *
 * @description Format a number into file size unit
 * @param bytes
 * @return {string}
 */
const formatBytes = bytes => {
  if (!bytes || bytes === 0) {
    return 'n/a'
  }

  const fileSizeIdx = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  return fileSizeIdx === 0
    ? `${bytes} ${FILE_SIZES[0]}`
    : (bytes / Math.pow(1024, fileSizeIdx)).toFixed(1) +
        ' ' +
        FILE_SIZES[fileSizeIdx]
}

/**
 * @function transformFileData
 *
 * @description transform file payload
 * @param file
 * @param path
 * @param settings
 * @return {({contents: string, id: string} & boolean) | ({contents: string, id: string} & {meta: {createdAt: Date, size: *, relativePath: *, lastModified: *, formattedSize: *}})}
 */

const transformFileData = (file = {}, path = '', settings = {}) => {
  const { contents, stats, mode, ...otherProperties } = file

  return Object.assign(
    {
      id: path.replace(/\.md|\.html/, '').replace(/\//g, '__'),
      contents: contents.toString(),
      ...otherProperties
    },
    settings.metadata && {
      meta: {
        relativePath: path,
        createdAt: stats.ctime,
        lastModified: stats.mtime,
        size: stats.size,
        formattedSize: formatBytes(stats.size)
      }
    }
  )
}

module.exports = {
  transformFileData,
  FILE_SIZES
}
