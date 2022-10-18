import React from 'react'
import { Field } from 'react-final-form'
import { Form } from 'reactstrap'
import RowFormGroup from '../formInput/RowFormGroup'
import SubmitButton from '../submitButton/SubmitButton'
import type { AuthFormProps } from '../../../interfaces/auth'

const AuthFormRender = ({
  handleSubmit,
  formFields,
  submitButtonLabel,
  ...props
}: AuthFormProps) => <Form onSubmit={handleSubmit}
  className="shadow p-3 mb-5 bg-body rounded">
    {formFields?.map((field, key) => <Field
      key={key} {...field} component={RowFormGroup} />
    )}
    <SubmitButton text={submitButtonLabel} {...props} />
  </Form>

export default AuthFormRender
