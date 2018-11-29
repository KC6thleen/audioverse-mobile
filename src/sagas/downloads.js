import { PermissionsAndroid, Platform } from 'react-native'
import { call, put, select, take } from 'redux-saga/effects'
import { eventChannel, buffers, END } from 'redux-saga'
import RNFetchBlob from 'rn-fetch-blob'
import Toast from 'react-native-simple-toast'

import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import { MediaTypes } from 'src/constants'
import I18n from 'locales'

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

/** 
 * Download
*/
export function* download({ item, downloadPath, downloadUrl, fileName, bitRate }) { 
  const permission = Platform.OS === 'ios' ? true : yield call(requestReadExternalStoragePermission)
  if (permission) {
    const dir = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir
    yield put(actions.addToDownloadsQueue({
      ...item,
      dir: dir,
      downloadPath: downloadPath,
      downloadUrl,
      fileName,
      bitRate
    }))
    Toast.show(I18n.t('Added_to_download_queue'))
    yield call(downloadNext)
  }
}

const fetchBlob = (item) => {
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
    // listen to download progress event, every 5%
    .progress({ count : 5 }, (received, total) => {
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
export function* downloadNext() {
  const downloading = yield select(selectors.getDownloading)
  const queue = yield select(selectors.getDownloadsQueue)

  if (!downloading && queue.length) {
    const item = queue[0]
    yield put(actions.setDownloading(true))

    const channel = yield call(fetchBlob, item)
    while(true) {
      const { progress = 0, err, res } = yield take(channel)
      console.log('progress', progress, 'err', err, 'res', res)
      if (progress) {
        yield put(actions.downloadProgress(item, progress))
      } else if (res) {
        yield put(actions.setDownloading(false))
        yield put(actions.removeFromDownloadsQueue(item))
        if (item.mediaType === MediaTypes.sermon) {
          yield put(actions.downloads.add([item]))
        }
        Toast.show(I18n.t('Downloaded'))
        yield call(downloadNext)
      } else { // err
        yield put(actions.setDownloading(false))
        yield put(actions.removeFromDownloadsQueue(item))
      }
    }
  }
}

/** 
 * Download next
*/
export function* remove({ item }) {
  const exists = yield call(RNFetchBlob.fs.exists, `${item.downloadPath}${encodeURIComponent(item.fileName)}`)
  console.log('exists', exists)
  try {
    if (exists) {
      yield call(RNFetchBlob.fs.unlink, `${item.downloadPath}${encodeURIComponent(item.fileName)}`)
    }
  } catch(err) {
    console.log(err)
  }
  yield put(actions.downloads.remove(item))
}
