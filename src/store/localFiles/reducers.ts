import {
  ADD_LOCAL_FILES,
  REMOVE_LOCAL_FILES,
  LocalFilesState,
  LocalFilesActionTypes,
} from './types'

const initialState: LocalFilesState = []

export function localFilesReducer(
  state = initialState,
  action: LocalFilesActionTypes
): LocalFilesState {
  switch(action.type) {
    case ADD_LOCAL_FILES:
      return [
        ...action.items,
        ...state
      ]
    case REMOVE_LOCAL_FILES:
      return state.filter(el => el !== action.item)
    default:
      return state
  }
}
