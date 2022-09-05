import {Form, Field} from 'react-final-form'
import type {FormProps} from 'react-final-form'
import {Form as FormStrap} from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import SubmitButton from '../submitButton/SubmitButton'
import {
  LoginOptions,
  RegisterOptions,
} from '../../../interfaces/auth'
import {
  CommonConsts
} from '../../../interfaces'
import type {FormFields} from './hooks'

type AuthFormProps = FormProps & {
  loaded: boolean
  isOpen: boolean
  headerAttrs: {
    toggle: () => void
    children: string
  }
  toggleLoginButtonAttrs: {
    onClick: () => void
    children: string
  }
  commonConsts: CommonConsts
  options?: LoginOptions & RegisterOptions
  formFields: FormFields[]
  isLoadingOptions: boolean
  isProcessing: boolean
  name: string
  submitButtonLabel: string
}

export default ({
  options,
  formFields,
  submitButtonLabel,
  isLoadingOptions,
  isProcessing,
  ...formAttrs
}: AuthFormProps) => <Form {...formAttrs}>
  {(props) => <FormStrap
    onSubmit={props.handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    {formFields.map((field, key) =>
      <Field
        key={key}
        {...field}
        component={RowFormGroup}
        {...{options}}
      />)}
    <SubmitButton text={submitButtonLabel} {...props} />
  </FormStrap>}
</Form>
