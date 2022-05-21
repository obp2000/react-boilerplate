import {
  notBlank,
  validEmail,
  passwordLength,
  validPasswordConfirmation,
} from '../Shared/Validators'

export const validateLogin = ({
  blank,
} = {}) => (values) => notBlank(values, ['username', 'password'], blank)

export const validateRegister = ({
  blank,
  invalid_email: invalidEmail,
  short_password: shortPassword,
  password_mismatch: passwordMismatch,
} = {}) => (values) => ({
  ...notBlank(values, ['username', 'email', 'password1', 'password2'], blank),
  ...validEmail(values, 'email', invalidEmail),
  ...passwordLength(values, 'password1', shortPassword),
  ...validPasswordConfirmation(values, 'password1', 'password2',
      passwordMismatch),
})

// export const validateRegister = values =>
//     notBlank(values, ['username', 'password'])
