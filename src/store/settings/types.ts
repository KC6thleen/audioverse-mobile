export interface SettingsState {
  language: string
  bitRate: string
  autoPlay: boolean
}

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export const CHANGE_BITRATE = 'CHANGE_BITRATE'
export const AUTOPLAY = 'AUTOPLAY'
export const LOG_OUT = 'LOG_OUT'

export interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE
  language: string
}

export interface ChangeBitRateAction {
  type: typeof CHANGE_BITRATE
  bitRate: string
}

export interface SetAutoPlayAction {
  type: typeof AUTOPLAY
  autoPlay: boolean
}

export interface LogOutAction {
  type: typeof LOG_OUT
}

export type SettingsActionTypes = ChangeLanguageAction | ChangeBitRateAction |
  SetAutoPlayAction | LogOutAction
