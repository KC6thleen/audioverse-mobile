import defaultImage from 'assets/av-logo.png'

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
 * Parses the data into Track strcutures
 * https://github.com/react-native-kit/react-native-track-player/wiki/Documentation#track-structure
 * @param {object} item 
 */
export const parseRecording = item => {
    
    // artist
    if (item.presenters && item.presenters.length > 1) {
      item.artist = 'Various Presenters'
    } else if (item.presenters && item.presenters.length > 0) {
      item.artist = item.presenters[0].givenName + ' ' + item.presenters[0].surname
    } else {
      item.artist = 'Anonymous Presenter'
    }
    
    // artwork
    if (item.presenters && item.presenters.length) {
      if (item.presenters.length == 1 && item.presenters[0].photo != "default.png" ) {
        item.artwork = item.presenters[0].photo256
      } else if (item.conference.length && item.conference[0].logo != "" ) {
        item.artwork = item.presenters[0].photo256
      }
    }
    item.artwork = item.artwork ? item.artwork : defaultImage

    item.url = item.mediaFiles[item.mediaFiles.length - 1].streamURL

    item.duration = formatTime(item.duration)

    return item
}
