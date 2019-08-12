import { Track } from 'react-native-track-player'

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
  ListsActionTypes,
} from './types'

/**
 * 
 * Downloads
 */
export const setDownloads = (items: Track[]): ListsActionTypes => {
  return {
    type: DOWNLOADS_SET,
    items
  }
}

export const addDownloads = (items: Track[]): ListsActionTypes => {
  return {
    type: DOWNLOADS_ADD,
    items
  }
}

export const removeDownloads = (item: Track): ListsActionTypes => {
  return {
    type: DOWNLOADS_REMOVE,
    item
  }
}

/**
 * Favorites
 */
export const setFavorites = (items: Track[]): ListsActionTypes => {
  return {
    type: FAVORITES_SET,
    items
  }
}

export const addFavorites = (items: Track[]): ListsActionTypes => {
  return {
    type: FAVORITES_ADD,
    items
  }
}

export const removeFavorites = (item: Track): ListsActionTypes => {
  return {
    type: FAVORITES_REMOVE,
    item
  }
}

/**
 * Playlists
 */
export const setPlaylists = (items: {}[]): ListsActionTypes => {
  return {
    type: PLAYLISTS_SET,
    items
  }
}

export const addPlaylists = (items: {}[]): ListsActionTypes => {
  return {
    type: PLAYLISTS_ADD,
    items
  }
}

export const removePlaylists = (item: {}): ListsActionTypes => {
  return {
    type: PLAYLISTS_REMOVE,
    item
  }
}

/**
 * Playlists items
 */
export const setPlaylistsItems = (items: Track[]): ListsActionTypes => {
  return {
    type: PLAYLISTS_ITEMS_SET,
    items
  }
}

export const addPlaylistsItems = (items: Track[]): ListsActionTypes => {
  return {
    type: PLAYLISTS_ITEMS_ADD,
    items
  }
}

export const removePlaylistsItems = (item: Track): ListsActionTypes => {
  return {
    type: PLAYLISTS_ITEMS_REMOVE,
    item
  }
}

/**
 * History
 */
export const setHistory = (items: Track[]): ListsActionTypes => {
  return {
    type: HISTORY_SET,
    items
  }
}

export const addHistory = (items: Track[]): ListsActionTypes => {
  return {
    type: HISTORY_ADD,
    items
  }
}

export const removeHistory = (item: Track): ListsActionTypes => {
  return {
    type: HISTORY_REMOVE,
    item
  }
}
