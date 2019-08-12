import {
  USER,
  UserActionTypes,
  UserState,
} from './types'


export const setUser = (user: UserState): UserActionTypes => {
  return {
    type: USER,
    user,
  }
}
