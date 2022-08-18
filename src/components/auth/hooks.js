import {useSelector, useDispatch} from 'react-redux'
import {useRouter} from 'next/dist/client/router'
import {validateLogin, validateRegister} from './Validators'
import {useGetOptionsQuery} from '../options/apiSlice'
import {
  useLoginMutation,
  useRegisterMutation,
  useSignOutMutation,
} from './authApi'
import {toggleModal, toggleLogin} from './modalSlice'
import {selectAuth, selectAuthModal} from './selectors'
import {useGetUserQuery} from '../users/apiSlice'

const emptyObject = {}

export const useAuthModal = ({commonConsts}) => {
  const {modal, isLogin} = useSelector(selectAuthModal)
  const [headerLabel, authHook] = isLogin ?
    [commonConsts?.login, useLogin] : [commonConsts?.register, useRegister]
  const dispatch = useDispatch()
  return {
    loaded: true,
    isOpen: modal,
    headerAttrs: {
      toggle: () => dispatch(toggleModal()),
      children: headerLabel,
    },
    authHook,
  }
}

export const useToggleLoginButton = ({commonConsts}) => {
  const {isLogin} = useSelector(selectAuthModal)
  const dispatch = useDispatch()
  return {
    onClick: () => dispatch(toggleLogin()),
    children: isLogin ? commonConsts?.register : commonConsts?.login,
  }
}

export const useLogin = ({commonConsts}) => {
  const {
    data: {
      options,
    } = emptyObject,
    isLoading: isLoadingOptions,
  } = useGetOptionsQuery('/login/')
  const [loginAction, {isLoading: isProcessing}] = useLoginMutation()
  const formFields = [
    {name: 'username', required: true, autoComplete: 'username'},
    {name: 'password', type: 'password', autoComplete: 'current-password'},
  ]
  return {
    options,
    formFields,
    submitButtonText: commonConsts?.login,
    isLoadingOptions,
    isProcessing,
    name: 'Login',
    validate: validateLogin(commonConsts?.error_messages),
    onSubmit: (values) => loginAction(values),
  }
}

export const useRegister = ({commonConsts}) => {
  const {
    data: {
      options,
    } = emptyObject,
    isLoading: isLoadingOptions,
  } = useGetOptionsQuery('/register/')
  const [registerAction, {isLoading: isProcessing}] = useRegisterMutation()
  const formFields = [
    {name: 'username', autoComplete: 'username'},
    {name: 'email', type: 'email', autoComplete: 'email'},
    {name: 'first_name', autoComplete: 'first-name'},
    {name: 'last_name', autoComplete: 'last-name'},
    {name: 'password1', type: 'password', autoComplete: 'new-password'},
    {name: 'password2', type: 'password', autoComplete: 'new-password'},
  ]
  return {
    options,
    formFields,
    submitButtonText: commonConsts?.register,
    isLoadingOptions,
    isProcessing,
    name: 'Register',
    validate: validateRegister(commonConsts?.error_messages),
    onSubmit: (values) => registerAction(values),
  }
}

export const useAuthButton = ({commonConsts}) => {
  const {isAuthenticated} = useSelector(selectAuth)
  const router = useRouter()
  const {isFallback} = router
  const [
    signOutAction,
    {isLoading: isSigningOut},
  ] = useSignOutMutation()
  const {
    data: user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessLoadingUser,
  } = useGetUserQuery(undefined, {skip: !isAuthenticated || isFallback})
  const dispatch = useDispatch()
  const onClick = isAuthenticated ?
      () => signOutAction() :
      () => dispatch(toggleModal())
  let label = commonConsts?.auth_menu_item.label
  if (isAuthenticated && user) {
    label = `${label} (${user.username})`
  }
  return {
    onClick,
    loaded: !(isSigningOut || isLoadingUser),
    children: label,
  }
}
