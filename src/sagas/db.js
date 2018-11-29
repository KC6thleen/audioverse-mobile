import { Platform } from 'react-native'
import { AsyncStorage } from 'react-native'
import { put, call } from 'redux-saga/effects'
import SQLite from 'react-native-sqlite-storage'
import RNFetchBlob from 'rn-fetch-blob'

import * as actions from 'src/actions'

/** 
 * Return an object with the data stored in the SQLite DB
*/
const getDataFromDB = async () => {
  return await new Promise(resolve => {
    const location = Platform.OS === 'ios' ? '../Library/Private Documents/audioverse15.sql' : '/database/audioverse15.sql'
    const db = SQLite.openDatabase({name: "audioverse15", readOnly: true, createFromLocation: location})
    db.transaction(tx => {
      tx.executeSql(`select * from user_data order by id desc`, [], (tx, results) => {
        console.log('Query completed', results.rows.length)
        const data = results.rows.raw()

        const downloadsRows = data.filter(el => el.data_type === 'downloads')
        const favoritesRows = data.filter(el => el.data_type === 'favorite')
        const playlistsRows = data.filter(el => el.data_type === 'playlists')
        const playlistsItemsRows = data.filter(el => el.data_type === 'playlistItem')
        const historyRows = data.filter(el => el.data_type === 'play_history')
        let user = data.find(el => el.data_type === 'user')
        user = user ? JSON.parse(user.json_data) : null

        const downloads = downloadsRows.map(el => {
          const data = JSON.parse(el.json_data)
          // only keep the absolute dir
          let dir = data.downloadPath.replace('/downloads/', '')
          // on Android the path is different than in the old version of the app
          dir = dir.replace('appdata-private:/', `${RNFetchBlob.fs.dirs.MainBundleDir}/app_appdata`)

          return {
            ...data.jsonData,
            dir: dir,
            downloadPath: 'downloads',
            downloadUrl: data.downloadURL,
            fileName: data.fileName,
            bitRate: data.bitrate,
            recovered: true
          }
        })

        const favorites = favoritesRows.map(el => JSON.parse(el.json_data))

        const playlists = playlistsRows.map(el => JSON.parse(el.json_data))

        const playlistsItems = playlistsItemsRows.map(el => {
          const playlist = playlistsRows.find(item => item.id === el.reference_id)
          return {
            ...JSON.parse(el.json_data),
            playlistId: playlist ? JSON.parse(playlist.json_data).id : 0
          }
        })

        const history = historyRows.map(el => JSON.parse(el.json_data))

        resolve({
          downloads,
          favorites,
          playlists,
          playlistsItems,
          history,
          user
        })
      })
    })
  })
}

/**
 * The previous version of the app uses SQLite,
 * this function recovers that data and saves it to the store,
 * which in turns persist it to the local storage using redux-persist
 * @param {object} action 
 */
export default function* recoverDB(action) {
  const status = yield call(AsyncStorage.getItem, 'recoveredDBStatus')
  if (!status) {
    try {
      const data = yield call(getDataFromDB)
      yield put(actions.downloads.set(data.downloads))
      yield put(actions.favorites.set(data.favorites))
      yield put(actions.playlists.set(data.playlists))
      yield put(actions.playlistsItems.set(data.playlistsItems))
      yield put(actions.history.set(data.history))
      yield put(actions.setUser(data.user))
      yield call(AsyncStorage.setItem, 'recoveredDBStatus', '1')
    } catch (err) {
      console.log(err)
    }
  }
}
