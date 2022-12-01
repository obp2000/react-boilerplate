import type { LoginFormConfig, RegisterFormConfig } from '@/interfaces/auth'
import { Form } from 'react-final-form'
import { useAuthForm } from './hooks'
import { MainContext } from '@/services/context'
import { useContext } from 'react'
import { useOptions } from '@/services/api/client'

const AuthForm = ({
  name,
  formFields,
  ...props
}: (LoginFormConfig | RegisterFormConfig) & {isLogin: boolean}) => {
  // const test1 = useOptions(props.indexUrl)
  // console.log('test1 ', test1)
  return <Form {...{ name, formFields }} {...useAuthForm(props)} />
}

export default AuthForm
