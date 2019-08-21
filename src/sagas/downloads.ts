import { PermissionsAndroid, Platform } from 'react-native'
import { call, put, select, take } from 'redux-saga/effects'
import { eventChannel, buffers, END } from 'redux-saga'
import RNFetchBlob from 'rn-fetch-blob'
import Toast from 'react-native-simple-toast'
import firebase from 'react-native-firebase'
import { Track } from 'react-native-track-player'

import {
  addDownloads,
  removeDownloads,
} from '../store/lists/actions'
import {
  addToDownloadsQueue,
  removeFromDownloadsQueue,
  setDownloading,
  downloadProgress,
} from '../store/downloadsQueue/actions'
import * as selectors from '../reducers/selectors'
import { ContentTypes } from '../constants'
import I18n from '../../locales'

const DOWNLOAD_DIR = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir

async function requestReadExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch (err) {
    console.log(err)
  }
}

interface Download {
  type: string
  item: {}
  downloadPath: string
  downloadUrl: string
  fileName: string
  bitRate: string
  cb?: () => {}
}

interface Item extends Track {
  dir: string
  downloadPath: string
  downloadUrl: string
  fileName: string
  bitRate: string
  [key: string]: any
}

interface DownloadQueueItem {
  data: Item
  cb?: () => void
}

/** 
 * Download
*/
export function* download({ item, downloadPath, downloadUrl, fileName, bitRate, cb }: Download) {
  const permission = Platform.OS === 'ios' ? true : yield call(requestReadExternalStoragePermission)
  if (permission) {
    const dir = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir
    yield put(addToDownloadsQueue({
      data: {
        ...item,
        dir: dir,
        downloadPath: downloadPath,
        downloadUrl,
        fileName,
        bitRate
      },
      cb
    }))
    Toast.show(I18n.t('Added_to_download_queue'))
    yield call(downloadNext)
  }
}

const fetchBlob = (item: Item) => {
  return eventChannel(emitter => {
    RNFetchBlob
    .config({
      path: `${item.dir}/${item.downloadPath}/${encodeURIComponent(item.fileName)}`, // when using DownloadManager on android 'path' will not take effect
      addAndroidDownloads : {
        useDownloadManager : true,
        notification: true,
        path: `${item.dir}/${item.downloadPath}/${encodeURIComponent(item.fileName)}`
      }
    })
    .fetch('GET', item.downloadUrl)
    // .fetch('GET', 'https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3')
    // listen to download progress event
    .progress({ interval : 3000 }, (received, total) => {
      emitter({ progress: (received / total).toFixed(2) })
    })
    .then(res => {
      emitter({ res })
      emitter(END)
    })
    .catch(err => {
      emitter({ err })
      emitter(END)
    })
    return () => {
      console.log('unsubscribe')
    }
  }, buffers.sliding(2))
}

/** 
 * Download next
*/
export function* downloadNext(): any {
  const downloading = yield select(selectors.getDownloading)
  const queue: DownloadQueueItem[] = yield select(selectors.getDownloadsQueue)

  if (!downloading && queue.length) {
    const item = queue[0]
    yield put(setDownloading(true))

    const channel = yield call(fetchBlob, item.data)
    while(true) {
      const { progress = 0, err, res } = yield take(channel)
      console.log('progress', progress, 'err', err, 'res', res)
      if (progress) {
        yield put(downloadProgress(item.data, progress))
      } else if (res) {
        yield put(setDownloading(false))
        yield put(removeFromDownloadsQueue(item.data))
        const downloads = yield select(selectors.getDownloads)
        const exists = downloads.some((el: Item) => el.id === item.data.id && el.bitRate === item.data.bitRate)
        // if it is a sermon and is not in the downloads list then add it to downloads list
        if (item.data.contentType === ContentTypes.sermon && !exists) {
          yield put(addDownloads([item.data]))
        }
        // analytics
        firebase.analytics().logEvent('download', {
          content_type: Object.keys(ContentTypes).find(key => ContentTypes[key] === item.data.contentType),
          item_id: item.data.id,
          title: item.data.title,
          bit_rate: item.data.bitRate,
          file_name: item.data.fileName
        })
        // notification
        Toast.show(I18n.t('Downloaded'))
        if (item.cb) {
          yield call(item.cb)
        }
        yield call(downloadNext)
      } else { // err
        yield put(setDownloading(false))
        yield put(removeFromDownloadsQueue(item.data))
      }
    }
  }
}

/** 
 * Download next
*/
export function* remove({ item }: {[key: string]: any}) {
  const file = `${Platform.OS === 'android' && item.recovered ? item.dir : DOWNLOAD_DIR}/${item.downloadPath}/${encodeURIComponent(item.fileName)}`
  const exists = yield call(RNFetchBlob.fs.exists, file)
  console.log('exists', exists)
  try {
    if (exists) {
      yield call(RNFetchBlob.fs.unlink, file)
    }
  } catch(err) {
    console.log(err)
  }
  yield put(removeDownloads(item))
}
