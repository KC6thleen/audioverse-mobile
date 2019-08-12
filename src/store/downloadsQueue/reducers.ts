import {
  ADD_TO_DOWNLOADS_QUEUE,
  REMOVE_FROM_DOWNLOADS_QUEUE,
  SET_DOWNLOADING,
  DOWNLOAD_PROGRESS,
  DownloadsQueueActionTypes,
  DownloadsQueueState,
} from './types'

const initialState: DownloadsQueueState = {
  downloading: false,
  progress: 0,
  queue: [],
}

export function downloadsQueueReducer(
  state = initialState,
  action: DownloadsQueueActionTypes
): DownloadsQueueState {
  switch(action.type) {
    case ADD_TO_DOWNLOADS_QUEUE:
      if (!state.queue.some((el: {[key: string]: any}) => el.data.id === action.item.data.id && el.data.bitRate === action.item.data.bitRate)) {
        return {
          ...state,
          queue: [
            ...state.queue,
            { ...action.item }
          ]
        }
      }
      return state
    case REMOVE_FROM_DOWNLOADS_QUEUE:
      return {
        ...state,
        queue: state.queue.filter((el: {[key: string]: any}) => !(el.data.id === action.item.id && el.data.bitRate === action.item.bitRate) )
      }
    case DOWNLOAD_PROGRESS:
      return {
        ...state,
        queue: state.queue.map((el: {[key: string]: any}) => {
          if (el.data.id === action.item.id && el.data.bitRate === action.item.bitRate) {
            el.data.progress = action.progress
          }
          return el
        })
      }
    case SET_DOWNLOADING:
      return {
        ...state,
        downloading: action.downloading
      }
    default:
      return state
  }
}
