import {
  notBlank,
  validEmail,
  passwordLength,
  validPasswordConfirmation,
} from '../Shared/validators'
import type {
  LoginFormValues,
  RegisterFormValues,
} from '../../../interfaces/auth'
import type { ErrorMessages } from '../../../interfaces'

export const validateLogin = (errorMessages: ErrorMessages) =>
  (values: LoginFormValues) =>
    notBlank(values, ['username', 'password'], errorMessages?.blank)

export const validateRegister = (errorMessages: ErrorMessages) =>
  (values: RegisterFormValues) => ({
    ...notBlank(values, ['username', 'email', 'password1', 'password2'],
      errorMessages?.blank),
    ...validEmail(values, 'email', errorMessages?.invalid_email),
    ...passwordLength(values, 'password1', errorMessages?.short_password),
    ...validPasswordConfirmation(values, 'password1', 'password2',
      errorMessages?.password_mismatch),
  })

// export const validateRegister = values =>
//     notBlank(values, ['username', 'password'])
