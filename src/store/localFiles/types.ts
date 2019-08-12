export type LocalFilesState = (string | number)[]

export const ADD_LOCAL_FILES = 'ADD_LOCAL_FILES'
export const REMOVE_LOCAL_FILES = 'REMOVE_LOCAL_FILES'

interface AddLocalFilesAction {
  type: typeof ADD_LOCAL_FILES
  items: LocalFilesState
}

interface RemoveLocalFilesAction {
  type: typeof REMOVE_LOCAL_FILES
  item: string | number
}

export type LocalFilesActionTypes = AddLocalFilesAction | RemoveLocalFilesAction
