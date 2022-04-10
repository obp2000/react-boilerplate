import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-final-form'
// import createDecorator from 'final-form-submit-listener'
import { onSubmitLogin } from '../redux/auth'
import { validateLogin } from './Validators'
import LoginFormRender from './LoginFormRender'
import { selectErrorMessages } from '../redux/CommonConsts'

// const submitListener = createDecorator({
//   afterSubmitFailed: form => form.restart()
// })

const LoginForm = ({ onSubmitLogin }) =>
    <Form name='Login'
        validate={validateLogin(useSelector(selectErrorMessages))}
        onSubmit={onSubmitLogin}
        render={LoginFormRender}
        // decorators={[ submitListener ]}
    />

LoginForm.propTypes = {
    onSubmitLogin: PropTypes.func.isRequired,
}

export default LoginForm