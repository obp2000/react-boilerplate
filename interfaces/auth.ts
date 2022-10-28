import type { FormRenderProps } from 'react-final-form'
import type { IndexUrl, ValidatedFields } from './index'
import type { FieldProps } from './options'
import {
  useLoginMutation,
  useRegisterMutation,
} from '../components/auth/authApi'

export type Login = {
  key: string
  message: string
}

export type LoginFormValues = {
  username?: string
  email?: string
  password?: string
}

export type LoginOptions = {
  username: FieldProps
  email: FieldProps
  password: FieldProps
}

export type Register = Login

export type RegisterFormValues = {
  username?: string
  email?: string
  first_name?: string
  last_name?: string
  password1?: string
  password2?: string
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

export type FormFields = {
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}

export type LoginFormConfig = IndexUrl & {
  name: string
  useAuthMutation: typeof useLoginMutation
  formFields: FormFields[]
  // validate: typeof validateLogin
  validatedFields: Pick<ValidatedFields, 'notBlank'>
}

export type RegisterFormConfig = IndexUrl & {
  name: string
  useAuthMutation: typeof useRegisterMutation
  formFields: FormFields[]
  // validate: typeof validateRegister
  validatedFields: ValidatedFields
}

export interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
}

export interface ModalState {
  isLogin: boolean
  modal: boolean
}

export type AuthFormProps = FormRenderProps & {
  options?: LoginOptions | RegisterOptions
  formFields?: FormFields[]
  submitButtonLabel?: string
}
