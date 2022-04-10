import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import Errors from '../Shared/Errors'
import SubmitButton from '../Shared/SubmitButton'
import { selectRegisterText } from '../redux/CommonConsts'
import { selectOptions } from '../redux/auth'

const RegisterFormRender = props => {
    const options = { options: useSelector(selectOptions) }
    return <Form    onSubmit={props.handleSubmit}
                    className="shadow p-3 mb-5 bg-body rounded">
        {props.hasSubmitErrors && <Errors {...props} />}
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
        <SubmitButton text={useSelector(selectRegisterText)} {...props} />
    </Form>
}

RegisterFormRender.propTypes = {
    handleSubmit: PropTypes.func,
    hasSubmitErrors: PropTypes.func,
    submitError: PropTypes.object,
}

export default RegisterFormRender