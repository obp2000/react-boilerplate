import { useContext } from 'react'
import { Form } from 'react-final-form'
import type {
  LoginFormConfig, LoginFormValues, RegisterFormConfig, RegisterFormValues
} from '../../interfaces/auth'
import { useAppSelector } from '../../services/hooks'
import { OptionsContext } from '../layout/Layout'
import { useGetOptionsQuery } from '../options/apiSlice'
import AuthFormRender from './AuthFormRender'
import { selectAuthModal } from './selectors'
import { validate } from '../validators/validators'

function AuthForm(props: LoginFormConfig): JSX.Element
function AuthForm(props: RegisterFormConfig): JSX.Element
function AuthForm({
  indexUrl,
  name,
  useAuthMutation,
  formFields,
  // validate,
  validatedFields,
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
    // validate: validate(commonConsts?.error_messages),
    validate: validate({
      errorMessages: commonConsts?.error_messages,
      validatedFields }),
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
