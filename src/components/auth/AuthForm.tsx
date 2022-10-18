import React, { useContext } from 'react'
import { Form } from 'react-final-form'
import { useAppSelector } from '../hooks'
import { useGetOptionsQuery } from '../options/apiSlice'
import { selectAuthModal } from './selectors'
import AuthFormRender from './AuthFormRender'
import { OptionsContext } from '../layout/Layout'
import type {
  LoginFormValues,
  RegisterFormValues,
  LoginFormConfig,
  RegisterFormConfig,
} from '../../../interfaces/auth'
// import type { CommonConstsType } from '../../../interfaces/commonConsts'

function AuthForm(props: LoginFormConfig): JSX.Element
function AuthForm(props: RegisterFormConfig): JSX.Element
function AuthForm({
  indexUrl,
  name,
  useAuthMutation,
  formFields,
  validate,
}: any) {
  const { modal: isOpen, isLogin } = useAppSelector(selectAuthModal)
  const { commonConsts } = useContext(OptionsContext)
  const submitButtonLabel =
    isLogin ? commonConsts?.login : commonConsts?.register
  const {
    data,
    isLoading: isLoadingOptions,
  } = useGetOptionsQuery(indexUrl, { skip: !isOpen })
  const options = data?.options
  const [authAction, { isLoading: isProcessing }] = useAuthMutation()
  const formAttrs = {
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
  return <OptionsContext.Provider value={{ options, commonConsts }}>
    <Form {...formAttrs} />
  </OptionsContext.Provider>
}

export default AuthForm
