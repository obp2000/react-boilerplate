import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import Errors from '../Shared/Errors'
import SubmitButton from '../Shared/SubmitButton'

const RegisterFormRender = ({
    handleSubmit,
    submitting,
    invalid,
    pristine,
    hasSubmitErrors,
    hasValidationErrors,
    dirtySinceLastSubmit,
    submitError
}) => {
    const loaded = useSelector(({
        auth: {
            options = {}
        },
        common_consts: {
            register: register_text
        } = {}
    }) => ({
        options,
        register_text
    }))
    const options = { options: loaded.options }
    // console.log('submitError: ', submitError)
    return <Form onSubmit={handleSubmit}
                 className="shadow p-3 mb-5 bg-body rounded">
                {submitError && <Errors authErrors={submitError}/>}
                <Field  name="username"
                        {...options}
                        component={RowFormGroup} />
                <Field  name="email"
                        type='email'
                        {...options}
                        component={RowFormGroup} />
                <Field  name="first_name"
                        {...options}
                        component={RowFormGroup} />
                <Field  name="last_name"
                        {...options}
                        component={RowFormGroup} />
                <Field  name="password1"
                        type='password'
                        {...options}
                        component={RowFormGroup} />
                <Field  name="password2"
                        type='password'
                        {...options}
                        component={RowFormGroup} />
                <SubmitButton text={loaded.register_text}
                    submitDisabled={submitting ||
                                    pristine ||
                                    hasValidationErrors ||
                                    (hasSubmitErrors && !dirtySinceLastSubmit)}/>
            </Form>
}

export default RegisterFormRender