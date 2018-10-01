import { call, put, select, take } from 'redux-saga/effects'
import { eventChannel, buffers, END } from 'redux-saga'
import RNFetchBlob from 'rn-fetch-blob'

import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'

/** 
 * Download
*/
export function* download({ item, downloadPath, downloadUrl, fileName, bitRate }) {
  yield put(actions.addToDownloadsQueue({...item, downloadPath, downloadUrl, fileName, bitRate}))
  yield call(downloadNext)
}

const fetchBlob = (item) => {
  return eventChannel(emitter => {
    RNFetchBlob
    .config({
      path: `${item.downloadPath}/${item.fileName}`
    })
    // .fetch('GET', item.downloadUrl)
    .fetch('GET', 'https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3')
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
      console.log('cancelled')
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
      if (progress) {
        yield put(actions.downloadProgress(item, progress))
      } else if (res) {
        console.log('File saved to ', res.path())
        yield put(actions.setDownloading(false))
        yield put(actions.removeFromDownloadsQueue(item))
        yield put(actions.addToDownloads(item))
        yield call(downloadNext)
      } else { // err
        yield put(actions.setDownloading(false))
        yield put(actions.removeFromDownloadsQueue(item))
      }
    }
  }
}
