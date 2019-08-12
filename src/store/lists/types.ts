import { Track } from 'react-native-track-player'

export interface ListsState {
  downloads: Track[]
  favorites: Track[]
  playlists: {[key: string]: any}[]
  playlistsItems: Track[]
  history: Track[]
}

/**
 * Downloads
 */
export const DOWNLOADS_SET = 'DOWNLOADS_SET'
export const DOWNLOADS_ADD = 'DOWNLOADS_ADD'
export const DOWNLOADS_REMOVE = 'DOWNLOADS_REMOVE'

interface DownloadsSetAction {
  type: typeof DOWNLOADS_SET
  items: Track[]
}

interface DownloadsAddAction {
  type: typeof DOWNLOADS_ADD
  items: Track[]
}

interface DownloadsRemoveAction {
  type: typeof DOWNLOADS_REMOVE
  item: Track
}

/**
 * Favorites
 */
export const FAVORITES_SET = 'FAVORITES_SET'
export const FAVORITES_ADD = 'FAVORITES_ADD'
export const FAVORITES_REMOVE = 'FAVORITES_REMOVE'

interface FavoritesSetAction {
  type: typeof FAVORITES_SET
  items: Track[]
}

interface FavoritesAddAction {
  type: typeof FAVORITES_ADD
  items: Track[]
}

interface FavoritesRemoveAction {
  type: typeof FAVORITES_REMOVE
  item: Track
}

/**
 * Playlists
 */
export const PLAYLISTS_SET = 'PLAYLISTS_SET'
export const PLAYLISTS_ADD = 'PLAYLISTS_ADD'
export const PLAYLISTS_REMOVE = 'PLAYLISTS_REMOVE'

interface PlaylistsSetAction {
  type: typeof PLAYLISTS_SET
  items: {}[]
}

interface PlaylistsAddAction {
  type: typeof PLAYLISTS_ADD
  items: {}[]
}

interface PlaylistsRemoveAction {
  type: typeof PLAYLISTS_REMOVE
  item: {
    [key: string]: any
  }
}

/**
 * Playlists items
 */
export const PLAYLISTS_ITEMS_SET = 'PLAYLISTS_ITEMS_SET'
export const PLAYLISTS_ITEMS_ADD = 'PLAYLISTS_ITEMS_ADD'
export const PLAYLISTS_ITEMS_REMOVE = 'PLAYLISTS_ITEMS_REMOVE'

interface PlaylistsItemsSetAction {
  type: typeof PLAYLISTS_ITEMS_SET
  items: Track[]
}

interface PlaylistsItemsAddAction {
  type: typeof PLAYLISTS_ITEMS_ADD
  items: Track[]
}

interface PlaylistsItemsRemoveAction {
  type: typeof PLAYLISTS_ITEMS_REMOVE
  item: Track
}

/**
 * History
 */
export const HISTORY_SET = 'HISTORY_SET'
export const HISTORY_ADD = 'HISTORY_ADD'
export const HISTORY_REMOVE = 'HISTORY_REMOVE'

interface HistorySetAction {
  type: typeof HISTORY_SET
  items: Track[]
}

interface HistoryAddAction {
  type: typeof HISTORY_ADD
  items: Track[]
}

interface HistoryRemoveAction {
  type: typeof HISTORY_REMOVE
  item: Track
}

export type ListsActionTypes =
  DownloadsSetAction | DownloadsAddAction | DownloadsRemoveAction |
  FavoritesSetAction | FavoritesAddAction | FavoritesRemoveAction |
  PlaylistsSetAction | PlaylistsAddAction | PlaylistsRemoveAction |
  PlaylistsItemsSetAction | PlaylistsItemsAddAction | PlaylistsItemsRemoveAction |
  HistorySetAction | HistoryAddAction | HistoryRemoveAction
