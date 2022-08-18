import PropTypes from 'prop-types'
import React from 'react'
import {Form, Field} from 'react-final-form'
import {Form as FormStrap} from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import SubmitButton from '../submitButton/SubmitButton'

const AuthForm = ({
  options,
  formFields,
  submitButtonText,
  isLoadingOptions,
  isProcessing,
  ...formAttrs
}) => <Form {...formAttrs}>
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
    <SubmitButton text={submitButtonText} {...props} />
  </FormStrap>}
</Form>

AuthForm.propTypes = {
  options: PropTypes.object,
  formFields: PropTypes.array,
  submitButtonText: PropTypes.string,
  isLoadingOptions: PropTypes.bool,
  isProcessing: PropTypes.bool,
  formAttrs: PropTypes.bool,
}

export default AuthForm
