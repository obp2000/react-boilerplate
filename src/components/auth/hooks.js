import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useOutletContext} from 'react-router-dom'
import {validateLogin, validateRegister} from './Validators'
import {useGetOptionsQuery} from '../options/optionsApi'
import {
  useLoginMutation,
  useRegisterMutation,
  useSignOutMutation
} from './authApi'
import {toggleModal, toggleLogin} from './modalSlice'
import {selectAuth, selectAuthModal} from './selectors'
import {useGetUserQuery} from '../users/apiSlice'

const emptyObject = {}

export const useAuthModal = () => {
  const {modal, isLogin} = useSelector(selectAuthModal)
  const {
    commonConsts: {
      login,
      register
    } = emptyObject,
    isLoading,
    isFetching
  } = useOutletContext()
  const [headerLabel,  authHook] = isLogin ?
    [login, useLogin] : [register, useRegister]
  const dispatch = useDispatch()
  return {
    loaded: !isLoading,
    isOpen: modal,
    headerAttrs: {
      toggle: () => dispatch(toggleModal()),
      children: headerLabel
    },
    authHook,
  }
}

export const useToggleLoginButton = () => {
  const {isLogin} = useSelector(selectAuthModal)
  const {
    commonConsts: {
      login,
      register
    } = emptyObject,
  } = useOutletContext()
  const dispatch = useDispatch()
  return {
    onClick: () => dispatch(toggleLogin()),
    children: isLogin ? register : login,
  }
}

export const useLogin = () => {
  const {
      commonConsts: {
          error_messages,
          login
      } = emptyObject
  } = useOutletContext()
  const {
    data: {
      options
    } = emptyObject,
    isLoading: isLoadingOptions,
  } = useGetOptionsQuery('/login/')
  const [loginAction, {isLoading: isProcessing}] = useLoginMutation()
  const formFields = [
    {name: 'username', required: true, autoComplete: "username"},
    {name: 'password', type: 'password', autoComplete: "current-password"},
  ]
  return {
    options,
    formFields,
    submitButtonText: login,
    isLoadingOptions,
    isProcessing,
    name: 'Login',
    validate: validateLogin(error_messages),
    onSubmit: (values) => loginAction(values),
  }
}

export const useRegister = () => {
  const {
      commonConsts: {
          error_messages,
          register
      } = emptyObject
  } = useOutletContext()
  const {
    data: {
      options
    } = emptyObject,
    isLoading: isLoadingOptions,
  } = useGetOptionsQuery('/register/')
  const [registerAction, {isLoading: isProcessing}] = useRegisterMutation()
  const formFields = [
    {name: 'username', autoComplete: "username"},
    {name: 'email', type: 'email', autoComplete: "email"},
    {name: 'first_name', autoComplete: "first-name"},
    {name: 'last_name', autoComplete: "last-name"},
    {name: 'password1', type: 'password', autoComplete: "new-password"},
    {name: 'password2', type: 'password', autoComplete: "new-password"},
  ]
  return {
    options,
    formFields,
    submitButtonText: register,
    isLoadingOptions,
    isProcessing,
    name: 'Register',
    validate: validateRegister(error_messages),
    onSubmit: (values) => registerAction(values),
  }
}

export const useLogoutButton = (label) => {
    const [signOutAction, {isLoading: isSigningOut}] = useSignOutMutation()
    const {data: user, isLoading: isLoadingUser} = useGetUserQuery()
    return {
      onClick: () => signOutAction(),
      children: `${label} (${user?.username})`,
      loaded: !(isSigningOut || isLoadingUser),
    }
}

export const useAuthButton = (label) => {
    const dispatch = useDispatch()
    return {
      onClick: () => dispatch(toggleModal()),
      children: label,
    }
}

