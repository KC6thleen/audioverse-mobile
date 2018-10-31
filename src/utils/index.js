import { NetInfo } from 'react-native'
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
 * Get media file
 * @param {object} item 
 * @param {string} bitRate 
 */
export const getMediaFile = (mediaFiles, bitRate) => {
  const index = mediaFiles.findIndex(el => el.bitrate === bitRate)
  return mediaFiles[index !== -1 ? index : mediaFiles.length - 1]
}

/**
 * Get presenter
 * @param {object} item 
 * @param {string} bitRate 
 */
export const getPresenterName = (item) => {
  if (item.presenters && item.presenters.length) {
    if (item.presenters.length === 1) {
      return item.presenters[0].givenName + ' ' + item.presenters[0].surname
    } else {
      return 'Various Presenters'
    }
  }
  return 'Anonymous Presenter'
}

/**
 * Get artwork
 * @param {object} item 
 * @param {string} bitRate 
 */
export const getPresenterPicture = (item) => {
  if (item.presenters && item.presenters.length == 1 && item.presenters[0].photo != "default.png" ) {
    return item.presenters[0].photo256
  } else if (item.conference && item.conference.length && item.conference[0].logo != "" ) {
    return item.conference[0].photo256
  }
  return defaultImage
}

/**
 * Gets NetInfo isConnected property
*/
export const netInfoIsConnected = async () => {
  // iOS: NetInfo.isConnected returns always false
  // workaround https://github.com/facebook/react-native/issues/8615#issuecomment-389358993
  const onInitialNetConnection = isConnected => {
    NetInfo.isConnected.removeEventListener(onInitialNetConnection)
  }
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    onInitialNetConnection
  );

  await NetInfo.getConnectionInfo()
  return await NetInfo.isConnected.fetch()
}
