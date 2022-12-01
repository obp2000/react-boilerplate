import type { LoginFormValues, RegisterFormValues } from '@/interfaces/auth'
import { IndexUrl, ValidatedFieldsType } from '@/interfaces/index'
import { authAction, signOutAction } from '@/services/api/client'
import { AuthContext, AuthModalContext, MainContext } from '@/services/context'
import { validate } from '@/validators/validators'
// import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import AuthFormRender from './AuthFormRender'
import { loginFormConfig, registerFormConfig } from './config'

export function useAuthForm({
  validatedFields,
  indexUrl,
  isLogin
}: ValidatedFieldsType & IndexUrl & {isLogin: boolean}) {
  // const { isLoginState: [isLogin],
    // modalState: [modal, setModal] } = useContext(AuthModalContext)
  // const { refresh } = useRouter()
  const { commonConsts } = useContext(MainContext)
  const onSubmit = (values: LoginFormValues | RegisterFormValues) =>
    authAction(values, indexUrl)
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

// export const useAuthFormOptionsContext = ({ indexUrl }: IndexUrl) => {
//   // const { commonConsts } = useContext(MainContext)
//   // const { options, isLoading } = useOptions(indexUrl)
//   return { ...useContext(MainContext), ...useOptions(indexUrl) }
// }

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
