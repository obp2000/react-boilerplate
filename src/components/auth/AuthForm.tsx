import React from 'react'
import { Form } from 'react-final-form'
import { useAppSelector } from '../hooks'
import { useGetOptionsQuery } from '../options/apiSlice'
// import { useOptionsOuery } from '../options/hooks'
import { selectAuthModal } from './selectors'
import AuthFormRender from './AuthFormRender'
import type {
  LoginFormValues,
  RegisterFormValues,
  LoginFormConfig,
  RegisterFormConfig,
} from '../../../interfaces/auth'
import type { CommonConstsType } from '../../../interfaces'

function AuthForm(props: LoginFormConfig & CommonConstsType): JSX.Element
function AuthForm(props: RegisterFormConfig & CommonConstsType): JSX.Element
function AuthForm({
  indexUrl,
  name,
  useAuthMutation,
  formFields,
  validate,
  commonConsts,
}: any): JSX.Element {
  const { modal: isOpen, isLogin } = useAppSelector(selectAuthModal)
  const submitButtonLabel =
    isLogin ? commonConsts?.login : commonConsts?.register
  const {
    data,
    isLoading: isLoadingOptions,
  } = useGetOptionsQuery(indexUrl, { skip: !isOpen })
  const options = data?.options
  const [authAction, { isLoading: isProcessing }] = useAuthMutation()
  const formAttrs = {
    commonConsts,
    options,
    formFields,
    isLoadingOptions,
    isProcessing,
    name,
    validate: validate(commonConsts?.error_messages),
    onSubmit: (values: LoginFormValues & RegisterFormValues) =>
      authAction(values),
    render: AuthFormRender,
    submitButtonLabel,
  }
  return <Form {...formAttrs} />
}

export default AuthForm
