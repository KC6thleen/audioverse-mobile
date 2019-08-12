import {
  DOWNLOADS_SET,
  DOWNLOADS_ADD,
  DOWNLOADS_REMOVE,
  FAVORITES_SET,
  FAVORITES_ADD,
  FAVORITES_REMOVE,
  PLAYLISTS_SET,
  PLAYLISTS_ADD,
  PLAYLISTS_REMOVE,
  PLAYLISTS_ITEMS_SET,
  PLAYLISTS_ITEMS_ADD,
  PLAYLISTS_ITEMS_REMOVE,
  HISTORY_SET,
  HISTORY_ADD,
  HISTORY_REMOVE,
  ListsState,
  ListsActionTypes,
} from './types'

const initialState: ListsState = {
  downloads: [],
  favorites: [],
  playlists: [],
  playlistsItems: [],
  history: [],
}

export function listsReducer(
  state = initialState,
  action: ListsActionTypes
): ListsState {
  switch(action.type) {
    // Downloads
    case DOWNLOADS_SET:
      return {
        ...state,
        downloads: action.items,
      }
    case DOWNLOADS_ADD:
      return {
        ...state,
        downloads: [
          ...state.downloads,
          ...action.items,
        ]
      }
    case DOWNLOADS_REMOVE:
      return {
        ...state,
        downloads: state.downloads.filter((el: {[key: string]: any}) => {
          return !(el.id === action.item.id && el.bitRate === action.item.bitRate)
        })
      }
    // Favorites
    case FAVORITES_SET:
      return {
        ...state,
        favorites: action.items,
      }
    case FAVORITES_ADD:
      return {
        ...state,
        favorites: [
          ...state.favorites,
          ...action.items,
        ]
      }
    case FAVORITES_REMOVE:
      return {
        ...state,
        favorites: state.favorites.filter((el: {[key: string]: any}) => {
          return (el.id !== action.item.id)
        })
      }
    // Playlists
    case PLAYLISTS_SET:
      return {
        ...state,
        playlists: action.items,
      }
    case PLAYLISTS_ADD:
      return {
        ...state,
        playlists: [
          ...state.playlists,
          ...action.items,
        ]
      }
    case PLAYLISTS_REMOVE:
      return {
        ...state,
        playlists: state.playlists.filter((el: {[key: string]: any}) => {
          return (el.id !== action.item.id)
        })
      }
    // Playlists items
    case PLAYLISTS_ITEMS_SET:
      return {
        ...state,
        playlistsItems: action.items,
      }
    case PLAYLISTS_ITEMS_ADD:
      return {
        ...state,
        playlistsItems: [
          ...state.playlistsItems,
          ...action.items,
        ]
      }
    case PLAYLISTS_ITEMS_REMOVE:
      return {
        ...state,
        playlistsItems: state.playlistsItems.filter((el: {[key: string]: any}) => {
          return !(el.id === action.item.id && el.playlistId === action.item.playlistId)
        })
      }
    // History
    case HISTORY_SET:
      return {
        ...state,
        history: action.items,
      }
    case HISTORY_ADD:
      return {
        ...state,
        history: [
          ...state.history,
          ...action.items,
        ]
      }
    case HISTORY_REMOVE:
      return {
        ...state,
        history: state.history.filter((el: {[key: string]: any}) => {
          return (el.id !== action.item.id)
        })
      }
    default:
      return state
  }
}
