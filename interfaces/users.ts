import type { FieldProps } from './options'

export type User = {
  pk?: number
  username?: string
  email?: string
  first_name?: string
  last_name?: string
}

export type UserOptions = {
  pk: FieldProps
  username: FieldProps
  email: FieldProps
  first_name: FieldProps
  last_name: FieldProps
  name_singular: string
}

export type UserOptionsType = {
  options?: UserOptions
}

export type UserWithOptions = UserOptionsType & {
  object?: User
}
