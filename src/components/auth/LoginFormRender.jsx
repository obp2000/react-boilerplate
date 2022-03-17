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
    submitError
}) => {
    const loaded = useSelector(({
        auth: {
            options = {}
        },
        common_consts: {
            login: login_text,
        } = {}
    }) => ({
        options,
        login_text
    }))
    const options = { options: loaded.options }
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
                    submitDisabled={submitting || invalid || pristine}/>
            </Form>
}

export default LoginFormRender