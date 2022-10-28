import { FC } from 'react'
import { Field } from 'react-final-form'
import { Form } from 'reactstrap'
import type { AuthFormProps } from '../../interfaces/auth'
import RowFormGroup from '../formInput/RowFormGroup'
import SubmitButton from '../submitButton/SubmitButton'

const AuthFormRender: FC<AuthFormProps> = ({
  formFields,
  submitButtonLabel,
  ...props
}) => <Form onSubmit={props.handleSubmit}
  className="shadow p-3 mb-5 bg-body rounded">
    {formFields?.map((field, key) => <Field
      key={key} {...field} component={RowFormGroup} />
    )}
    <SubmitButton text={submitButtonLabel} {...props} />
  </Form>

export default AuthFormRender
