import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import createDecorator from 'final-form-submit-listener'
import { Form } from 'reactstrap'
import Loader from 'react-loader'
import RowFormGroup from '../Shared/RowFormGroup'
import Errors from '../Shared/Errors'
import SubmitButton from '../Shared/SubmitButton'

const LoginFormRender = ({
    options,
    handleSubmit,
    isLoadingLogin,
    login,
    ...props
}) => {
    // const options = props.options
    // console.log('props ', props)
    return <Loader loaded={!isLoadingLogin}>
        <Form onSubmit={handleSubmit}
              className="shadow p-3 mb-5 bg-body rounded">
            <Field  name="username"
                    required
                    {...{options}}
                    component={RowFormGroup} />
            <Field  name="password"
                    type='password'
                    {...{options}}
                    component={RowFormGroup} />
            <SubmitButton text={login} {...props} />
        </Form>
    </Loader>
}

LoginFormRender.propTypes = {
    options: PropTypes.object,
    handleSubmit: PropTypes.func,
    login: PropTypes.string
    // hasSubmitErrors: PropTypes.func,
    // submitError: PropTypes.object,
}

export default LoginFormRender
