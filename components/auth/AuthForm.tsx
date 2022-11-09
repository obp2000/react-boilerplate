import type { LoginFormConfig, RegisterFormConfig } from '@/interfaces/auth'
import { Form } from 'react-final-form'
import { useAuthForm, useAuthFormOptionsContext } from './hooks'
import { MainContext } from '@/services/context'

function AuthForm({
  name,
  formFields,
  ...props
}: LoginFormConfig | RegisterFormConfig) {
  return <MainContext.Provider value={useAuthFormOptionsContext()}>
    <Form name={name} formFields={formFields} {...useAuthForm(props)} />
  </MainContext.Provider>
}

export default AuthForm
