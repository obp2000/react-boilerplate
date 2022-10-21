import type {
  LoginFormValues,
  RegisterFormValues
} from '../../../interfaces/auth'
import type { ErrorMessages } from '../../../interfaces/commonConsts'
import {
  notBlank, passwordLength, validEmail, validPasswordConfirmation
} from '../validators/validators'
import { loginFormConfig, registerFormConfig } from './config'

export const validateLogin = (errorMessages: ErrorMessages) =>
  (values: LoginFormValues) =>
    notBlank(values,
      loginFormConfig.validatedFields.notBlank,
      errorMessages?.blank
    )

export const validateRegister = (errorMessages: ErrorMessages) =>
  (values: RegisterFormValues) => ({
    ...notBlank(values,
      registerFormConfig.validatedFields.notBlank,
      errorMessages?.blank),
    ...validEmail(values,
      registerFormConfig.validatedFields.validEmail,
      errorMessages?.invalid_email),
    ...passwordLength(values,
      registerFormConfig.validatedFields.passwordLength,
      errorMessages?.short_password),
    ...validPasswordConfirmation(values,
      registerFormConfig.validatedFields.validPasswordConfirmation[0],
      registerFormConfig.validatedFields.validPasswordConfirmation[1],
      errorMessages?.password_mismatch),
  })


// export const validateRegister = values =>
//     notBlank(values, ['username', 'password'])

