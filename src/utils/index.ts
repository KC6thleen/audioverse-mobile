import NetInfo from "@react-native-community/netinfo"
import { Endpoints, ContentTypes } from '../constants'
import { defaultImage } from '../styles'
import { Track } from 'react-native-track-player'

/**
 * Typed keys
 * https://stackoverflow.com/questions/41993515/access-object-key-using-variable-in-typescript
 */
export function typedKeys<T>(o: T): (keyof T)[] {
  // type cast should be safe because that's what really Object.keys() does
  return Object.keys(o) as (keyof T)[]
}

/**
 * Format number to two digits
 * @param {int} n number
 */
function formatTwoDigits(n: number) {
  return n < 10 ? '0' + n : n
}

/**
 * Format seconds to hh:mm:ss
 * @param {int} seconds number
 */
export const formatTime = (seconds: number | undefined) => {
  if (!seconds)
    return ''
  
  const ss = Math.floor(seconds) % 60
  const mm = Math.floor(seconds / 60) % 60
  const hh = Math.floor(seconds / 3600)

  if (hh > 0) {
    return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss)
  } else {
    return formatTwoDigits(mm) + ':' + formatTwoDigits(ss)
  }
}

interface MediaFile {
  downloadURL: string
  bitrate: string
}

/**
 * Get media file
 * @param {object} item 
 * @param {string} bitRate 
 */
export const getMediaFile = (mediaFiles: MediaFile[], bitRate: string) => {
  
  const index = mediaFiles.findIndex((el: {[key: string]: any}) => el.bitrate === bitRate)
  if (index !== -1) {
    return mediaFiles[index]
  } else {
    return mediaFiles[0]
  }
}

/**
 * Get presenter
 * @param {object} item 
 * @param {string} bitRate 
 */
export const getPresenterName = (item: {[key: string]: any}) => {
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
export const getPresenterPicture = (item: {[key: string]: any}) => {
  if (item.presenters && item.presenters.length == 1 && item.presenters[0].photo != "default.png" ) {
    return item.presenters[0].photo256
  } else if (item.conference && item.conference.length && item.conference[0].logo != "" ) {
    return item.conference[0].photo256
  }
  return defaultImage
}

/**
 * Parses the data into Track strcutures
 * https://github.com/react-native-kit/react-native-track-player/wiki/Documentation#track-structure
 * @param {object} item 
 */
export const parseRecording = (item: Track): Track => ({
  ...item,
  artist: getPresenterName(item),
  artwork: getPresenterPicture(item),
  durationFormatted: formatTime(item.duration)
})

/**
 * Parses Bible chapter
 * @param {object} item 
 * @param {object} bible 
 */
export const parseBibleChapter = (item: {[key: string]: any}, bible: {[key: string]: any}) => ({
  id: `${bible.version.id}_${item.book_id}_${item.chapter_id}`,
  title: `${item.book_id} ${item.chapter_id}`,
  artist: bible.version.name,
  artwork: defaultImage,
  fileName: `${bible.version.id}_${item.book_id}_chapter_${item.chapter_id}.mp3`,
  downloadURL: `${Endpoints.bibleCDN}${bible.version.id}_${item.book_id}_chapter_${item.chapter_id}.mp3/${encodeURIComponent(item.path)}`,
  chapter: item.chapter_id,
  contentType: ContentTypes.bible
})


/**
 * Gets NetInfo isConnected property
*/
export const netInfoIsConnected = async () => {
  const state = await NetInfo.fetch()
  return state.isConnected
}
