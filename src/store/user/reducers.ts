import {
  USER,
  UserActionTypes,
  UserState,
} from './types'

const initialState: UserState = null

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch(action.type) {
    case USER:
      return action.user
    default:
      return state
  }
}
