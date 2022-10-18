import { validateLogin, validateRegister } from './validators'
import {
  useLoginMutation,
  useRegisterMutation,
} from './authApi'
import type {
  LoginFormConfig,
  RegisterFormConfig,
} from '../../../interfaces/auth'

export const loginFormConfig: LoginFormConfig = {
  indexUrl: '/login/',
  name: 'Login',
  useAuthMutation: useLoginMutation,
  formFields: [
    { name: 'username', required: true, autoComplete: 'username' },
    { name: 'password', type: 'password', autoComplete: 'current-password' },
  ],
  validate: validateLogin,
  validatedFields: {
    notBlank: ['username', 'password']
  }
}

export const registerFormConfig: RegisterFormConfig = {
  indexUrl: '/register/',
  name: 'Register',
  useAuthMutation: useRegisterMutation,
  formFields: [
    { name: 'username', autoComplete: 'username' },
    { name: 'email', type: 'email', autoComplete: 'email' },
    { name: 'first_name', autoComplete: 'first-name' },
    { name: 'last_name', autoComplete: 'last-name' },
    { name: 'password1', type: 'password', autoComplete: 'new-password' },
    { name: 'password2', type: 'password', autoComplete: 'new-password' },
  ],
  validate: validateRegister,
  validatedFields: {
    notBlank: ['username', 'email', 'password1', 'password2'],
    validEmail: 'email',
    passwordLength: 'password1',
    validPasswordConfirmation: ['password1', 'password2'],
  }
}
