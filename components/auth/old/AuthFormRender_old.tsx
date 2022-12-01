import RowFormGroup from '@/formInput/RowFormGroup'
// import type { AuthFormProps } from '@/interfaces/auth'
import { MainContext } from '@/services/context'
import SubmitButton from '@/submitButton/SubmitButton'
import { useContext } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Form as FormStrap } from 'reactstrap'
import { loginFormConfig, registerFormConfig } from './config'

export default function AuthFormRender({
  isLogin,
  ...props
}: FormRenderProps & { isLogin?: boolean }) {
  const { commonConsts } = useContext(MainContext)
  return <FormStrap onSubmit={props.handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    {(isLogin
      ? loginFormConfig
      : registerFormConfig).formFields.map((field, key) => <Field key={key}
        {...field} component={RowFormGroup} />
      )}
    <SubmitButton text={isLogin ? commonConsts?.login : commonConsts?.register}
      {...props} />
  </FormStrap>
}
