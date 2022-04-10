import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import createDecorator from 'final-form-submit-listener'
import { Form } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import Errors from '../Shared/Errors'
import SubmitButton from '../Shared/SubmitButton'
import { selectLoginText } from '../redux/CommonConsts'
import { selectOptions } from '../redux/auth'

const LoginFormRender = props => {
    const options = { options: useSelector(selectOptions) }
    return <Form    onSubmit={props.handleSubmit}
                    className="shadow p-3 mb-5 bg-body rounded">
            {props.hasSubmitErrors && <Errors {...props} />}
            <Field  name="username"
                    required
                    {...options}
                    component={RowFormGroup} />
            <Field  name="password"
                    type='password'
                    {...options}
                    component={RowFormGroup} />
            <SubmitButton text={useSelector(selectLoginText)} {...props} />
        </Form>
}

LoginFormRender.propTypes = {
    handleSubmit: PropTypes.func,
    hasSubmitErrors: PropTypes.func,
    submitError: PropTypes.object,
}

export default LoginFormRender