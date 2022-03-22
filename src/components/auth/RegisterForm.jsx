import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { onSubmitRegister } from '../redux/auth'
import { validateRegister } from './Validators'
import RegisterFormRender from './RegisterFormRender'

const RegisterForm = () => {
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
          name='Register'
          validate={validateRegister(loaded.error_messages)}
          onSubmit={onSubmitRegister(dispatch, loaded.successfully)}
          render={RegisterFormRender}
        />
 }

export default RegisterForm
