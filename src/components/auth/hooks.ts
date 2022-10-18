import { useContext } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useAppSelector, useAppDispatch } from '../hooks'
import { useSignOutMutation } from './authApi'
import { toggleModal, toggleLogin } from './modalSlice'
import { selectAuth, selectAuthModal } from './selectors'
import { useGetUserQuery } from '../users/apiSlice'
import { loginFormConfig, registerFormConfig } from './config'
import { OptionsContext } from '../layout/Layout'

export const useAuthModal = () => {
  const { modal: isOpen, isLogin } = useAppSelector(selectAuthModal)
    const { commonConsts } = useContext(OptionsContext)
  const login = commonConsts?.login
  const register = commonConsts?.register
  const [authFormConfig,
    headerLabel,
    toggleLoginButtonLabel,] = isLogin
      ? [loginFormConfig, login, register,]
      : [registerFormConfig, register, login,]
  const dispatch = useAppDispatch()
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
  }
}

export const useAuthButton = () => {
  const { commonConsts } = useContext(OptionsContext)
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
