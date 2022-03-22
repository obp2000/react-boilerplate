import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import createDecorator from 'final-form-submit-listener'
import { onSubmitLogin } from '../redux/auth'
import { validateLogin } from './Validators'
import LoginFormRender from './LoginFormRender'

const submitListener = createDecorator({
  afterSubmitFailed: form => form.restart()
})

const LoginForm = () => {
    const loaded = useSelector(({
        common_consts: {
            successfully = '',
            error_messages = {}
        }
    }) => ({
        successfully,
        error_messages
    }))
    const dispatch = useDispatch()
    return <Form
            name='Login'
            validate={validateLogin(loaded.error_messages)}
            onSubmit={onSubmitLogin(dispatch, loaded.successfully)}
            // decorators={[ submitListener ]}
            render={LoginFormRender}
          />
}

export default LoginForm