/**
 * Format number to two digits
 * @param {int} n number
 */
function formatTwoDigits(n) {
  return n < 10 ? '0' + n : n
}

/**
 * Format seconds to hh:mm:ss
 * @param {int} seconds number
 */
export const formatTime = seconds => {
  const ss = Math.floor(seconds) % 60
  const mm = Math.floor(seconds / 60) % 60
  const hh = Math.floor(seconds / 3600)

  if (hh > 0) {
    return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss)
  } else {
    return formatTwoDigits(mm) + ':' + formatTwoDigits(ss)
  }
}

/**
 * Get media file
 * @param {object} item 
 * @param {string} bitRate 
 */
export const getMediaFile = (mediaFiles, bitRate) => {
  const index = mediaFiles.findIndex(el => el.bitrate === bitRate)
  return mediaFiles[index !== -1 ? index : mediaFiles.length - 1]
}
