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



module.exports = {
  formatBytes,
  FILE_SIZES
}
