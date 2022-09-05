import type {FieldProps} from './index'

export type Login = {
  key: string
  message: string
}

export type LoginFormValues = {
  email: string
  password: string
}

export type LoginOptions = {
  username: FieldProps
  email: FieldProps
  password: FieldProps
}

export type Register = Login

export type RegisterFormValues = {
  username: string
  email: string
  first_name?: string
  last_name?: string
  password1: string
  password2: string
}

export type RegisterOptions = {
  username: FieldProps
  email: FieldProps
  password1: FieldProps
  password2: FieldProps
  first_name: FieldProps
  last_name: FieldProps
}

export type SignOut = {
  detail: string
}