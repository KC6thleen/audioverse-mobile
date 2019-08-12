import {
  CHANGE_LANGUAGE,
  CHANGE_BITRATE,
  AUTOPLAY,
  LOG_OUT,
  SettingsActionTypes,
} from './types'

export const changeLanguage = (language: string): SettingsActionTypes => {
  return {
    type: CHANGE_LANGUAGE,
    language,
  }
}

export const changeBitRate = (bitRate: string): SettingsActionTypes => {
  return {
    type: CHANGE_BITRATE,
    bitRate,
  }
}

export const setAutoPlay = (autoPlay: boolean): SettingsActionTypes => {
  return {
    type: AUTOPLAY,
    autoPlay,
  }
}

export const logOut = (): SettingsActionTypes => {
  return {
    type: LOG_OUT,
  }
}

