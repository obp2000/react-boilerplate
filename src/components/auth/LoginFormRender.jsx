import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import createDecorator from 'final-form-submit-listener'
import { Form } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import Errors from '../Shared/Errors'
import SubmitButton from '../Shared/SubmitButton'

const LoginFormRender = ({
    handleSubmit,
    submitting,
    invalid,
    pristine,
    hasSubmitErrors,
    hasValidationErrors,
    dirtySinceLastSubmit,
    submitError,
    // submitSucceeded
}) => {
    const loaded = useSelector(({
        auth: {
            options = {}
        },
        common_consts: {
            login: login_text,
            successfully,
        } = {}
    }) => ({
        options,
        login_text,
        successfully
    }))
    const options = { options: loaded.options }
    // console.log('ssssss ', submitErrors)
    // if (submitSucceeded) {
    //     return loaded.successfully
    // }
    return <Form onSubmit={handleSubmit}
                 className="shadow p-3 mb-5 bg-body rounded">
                {submitError && <Errors authErrors={submitError} />}
                <Field  name="username"
                        required
                        {...options}
                        component={RowFormGroup} />
                <Field  name="password"
                        type='password'
                        {...options}
                        component={RowFormGroup} />
                <SubmitButton text={loaded.login_text}
                    submitDisabled={submitting ||
                                    pristine ||
                                    hasValidationErrors ||
                                    (hasSubmitErrors && !dirtySinceLastSubmit)}/>
            </Form>
}

export default LoginFormRender