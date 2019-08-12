export interface DownloadsQueueState {
  downloading: boolean
  progress: number
  queue: {[key: string]: any}[]
}

export const ADD_TO_DOWNLOADS_QUEUE = 'ADD_TO_DOWNLOADS_QUEUE'
export const REMOVE_FROM_DOWNLOADS_QUEUE = 'REMOVE_FROM_DOWNLOADS_QUEUE'
export const SET_DOWNLOADING = 'SET_DOWNLOADING'
export const DOWNLOAD_PROGRESS = 'DOWNLOAD_PROGRESS'

interface AddToDownloadsQueueAction {
  type: typeof ADD_TO_DOWNLOADS_QUEUE
  item: {
    [key: string]: any
  }
}

interface RemoveToDownloadsQueueAction {
  type: typeof REMOVE_FROM_DOWNLOADS_QUEUE
  item: {
    [key: string]: any
  }
}

interface SetDownloadingAction {
  type: typeof SET_DOWNLOADING
  downloading: boolean
}

interface DownloadProgressAction {
  type: typeof DOWNLOAD_PROGRESS
  item: {
    [key: string]: any
  }
  progress: number
}

export type DownloadsQueueActionTypes = AddToDownloadsQueueAction | RemoveToDownloadsQueueAction |
  SetDownloadingAction | DownloadProgressAction
