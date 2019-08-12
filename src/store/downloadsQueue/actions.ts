import {
  ADD_TO_DOWNLOADS_QUEUE,
  REMOVE_FROM_DOWNLOADS_QUEUE,
  SET_DOWNLOADING,
  DOWNLOAD_PROGRESS,
  DownloadsQueueActionTypes,
} from './types'

export const addToDownloadsQueue = (item: {}): DownloadsQueueActionTypes => {
  return {
    type: ADD_TO_DOWNLOADS_QUEUE,
    item,
  }
}

export const removeFromDownloadsQueue = (item: {}): DownloadsQueueActionTypes => {
  return {
    type: REMOVE_FROM_DOWNLOADS_QUEUE,
    item,
  }
}

export const setDownloading = (downloading: boolean): DownloadsQueueActionTypes => {
  return {
    type: SET_DOWNLOADING,
    downloading,
  }
}

export const downloadProgress = (item: {}, progress: number): DownloadsQueueActionTypes => {
  return {
    type: DOWNLOAD_PROGRESS,
    item,
    progress,
  }
}
