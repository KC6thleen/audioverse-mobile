interface User {
  userId: number
  firstName: string
  lastName: string
  username: string
  email: string
  sessionToken: string
}

export type UserState = User | null

export const USER = 'USER'

interface SetUserAction {
  type: typeof USER
  user: UserState
}

export type UserActionTypes = SetUserAction
