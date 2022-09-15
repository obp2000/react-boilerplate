import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'
import { useAppSelector, useAppDispatch } from '../hooks'
import { validateLogin, validateRegister } from './validators'
import {
  useLoginMutation,
  useRegisterMutation,
  useSignOutMutation,
} from './authApi'
import { toggleModal, toggleLogin } from './modalSlice'
import { selectAuth, selectAuthModal } from './selectors'
import { useGetUserQuery } from '../users/apiSlice'
import { useOptionsOuery } from '../options/hooks'
import {
  LoginFormValues,
  RegisterFormValues,
} from '../../../interfaces/auth'
// import {ErrorMessages} from '../../../interfaces'

export type FormFields = {
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}

export type LoginFormConfig = {
  indexUrl: string
  name: string
  useAuthMutation: typeof useLoginMutation
  formFields: FormFields[]
  validate: typeof validateLogin
}

export type RegisterFormConfig = {
  indexUrl: string
  name: string
  useAuthMutation: typeof useRegisterMutation
  formFields: FormFields[]
  validate: typeof validateRegister
}

export const initLoginValues: LoginFormValues = {
  username: undefined,
  password: undefined,
}

export const initRegisterValues: RegisterFormValues = {
  username: undefined,
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  password1: undefined,
  password2: undefined,
}

export const loginFormConfig: LoginFormConfig = {
  indexUrl: '/login/',
  name: 'Login',
  useAuthMutation: useLoginMutation,
  formFields: [
    { name: 'username', required: true, autoComplete: 'username' },
    { name: 'password', type: 'password', autoComplete: 'current-password' },
  ],
  validate: validateLogin,
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
}

export const useAuthModal = ({ indexUrl }: { indexUrl: string }) => {
  const { modal: isOpen, isLogin } = useAppSelector(selectAuthModal)
  const { commonConsts } = useOptionsOuery(indexUrl)
  const login = commonConsts?.login
  const register = commonConsts?.register
  const [authFormConfig,
    headerLabel,
    toggleLoginButtonLabel,] = isLogin
      ? [loginFormConfig, login, register,]
      : [registerFormConfig, register, login,]
  const dispatch = useDispatch()
  const headerAttrs = {
    toggle: () => dispatch(toggleModal()),
    children: headerLabel,
  }
  const toggleLoginButtonAttrs = {
    onClick: () => dispatch(toggleLogin()),
    children: toggleLoginButtonLabel,
  }
  return {
    loaded: true,
    isOpen,
    headerAttrs,
    toggleLoginButtonAttrs,
    authFormConfig,
    commonConsts,
  }
}

export const useAuthButton = ({ indexUrl }: { indexUrl: string }) => {
  const { commonConsts } = useOptionsOuery(indexUrl)
  const [
    signOutAction,
    { isLoading: isSigningOut },
  ] = useSignOutMutation()
  const { isAuthenticated } = useAppSelector(selectAuth)
  const { isFallback } = useRouter()
  const {
    data: user,
    isLoading: isLoadingUser,
    // isSuccess: isSuccessLoadingUser,
  } = useGetUserQuery(undefined, { skip: !isAuthenticated || isFallback })
  const dispatch = useAppDispatch()
  const onClick = isAuthenticated ?
    () => signOutAction() :
    () => dispatch(toggleModal())
  let label = commonConsts?.auth_menu_item?.label
  if (isAuthenticated && user) {
    label = `${label} (${user.username})`
  }
  return {
    onClick,
    loaded: !(isSigningOut || isLoadingUser || isFallback),
    children: label,
  }
}
