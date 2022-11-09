import type {
  LoginFormConfig,
  LoginFormValues,
  RegisterFormConfig,
  RegisterFormValues
} from '@/interfaces/auth'
import { MainContext } from '@/services/context'
import { validate } from '@/validators/validators'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import AuthFormRender from './AuthFormRender'
import { loginFormConfig, registerFormConfig } from './config'
import { AuthModalContext } from '@/services/context'
import { authAction, signOutAction } from '@/services/api/client'
import { useOptions } from '@/services/api/client'
import { ValidatedFieldsType } from '@/interfaces/index'

export function useAuthForm({ validatedFields }: ValidatedFieldsType) {
  const { isLoginState: [isLogin] } = useContext(AuthModalContext)
  const { refresh } = useRouter()
  const { commonConsts, indexUrl } = useContext(MainContext)
  const onSubmit = (values: LoginFormValues | RegisterFormValues) =>
    authAction(values, indexUrl as string, refresh)
  return {
    validate: validate({
      errorMessages: commonConsts?.error_messages,
      validatedFields
    }),
    onSubmit,
    render: AuthFormRender,
    submitButtonLabel: isLogin ? commonConsts?.login : commonConsts?.register,
  }
}

export const useAuthFormOptionsContext = () => {
  const { indexUrl } = useContext(MainContext)
  const { options, isLoading } = useOptions(indexUrl as string)
  return { ...useContext(MainContext), options }
}

export const useAuthModal = () => {
  const {
    isLoginState: [isLogin, setIsLogin],
    modalState: [modal, setModal]
  } = useContext(AuthModalContext)
  const { commonConsts } = useContext(MainContext)
  const login = commonConsts?.login
  const register = commonConsts?.register
  const [authFormConfig,
    headerLabel,
    toggleLoginButtonLabel,] = isLogin
      ? [loginFormConfig, login, register,]
      : [registerFormConfig, register, login,]
  const headerAttrs = {
    toggle: () => setModal(!modal),
    children: headerLabel,
  }
  const toggleLoginButtonAttrs = {
    onClick: () => setIsLogin(!isLogin),
    children: toggleLoginButtonLabel,
  }
  return {
    loaded: true,
    isOpen: modal,
    headerAttrs,
    toggleLoginButtonAttrs,
    authFormConfig,
  }
}

export const useAuthButton = () => {
  const { commonConsts, isAuthenticated, user } = useContext(MainContext)
  const { refresh } = useRouter()
  const signOut = () => signOutAction('/logout/', refresh)
  const { modalState: [modal, setModal] } = useContext(AuthModalContext)
  const openAuthModal = () => setModal(!modal)
  const onClick = isAuthenticated ? signOut : openAuthModal
  let label = commonConsts?.auth_menu_item?.label
  if (isAuthenticated && user) {
    label += ` (${user.username})`
  }
  return {
    onClick,
    // loaded: !(isSigningOut || isLoadingUser || isFallback),
    // loaded: !(isSigningOut || isLoadingUser),
    // loaded: !isSigningOut,
    children: label,
  }
}

