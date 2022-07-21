import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import Loader from 'react-loader'
import { Form as FormStrap } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import SubmitButton from '../submitButton/SubmitButton'
import { useLogin } from './hooks'

const AuthForm = ({authHook}) => {
    const {
        options,
        formFields,
        submitButtonText,
        isLoadingOptions,
        isProcessing,
        ...formAttrs
    } = authHook()
    return <Loader loaded={!isLoadingOptions}>
        <Form {...formAttrs}>
          {(props) => <Loader loaded={!isProcessing}>
                <FormStrap onSubmit={props.handleSubmit}
                    className="shadow p-3 mb-5 bg-body rounded">
                    {formFields.map((field, key) =>
                        <Field
                            {...field}
                            {...{key, options}}
                            component={RowFormGroup}
                        />)}
                    <SubmitButton text={submitButtonText} {...props} />
                </FormStrap>
            </Loader>}
        </Form>
      </Loader>
}

AuthForm.propTypes = {
  authHook: PropTypes.func,
}

export default AuthForm
