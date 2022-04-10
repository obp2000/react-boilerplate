import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { onSubmitRegister } from '../redux/auth'
import { validateRegister } from './Validators'
import RegisterFormRender from './RegisterFormRender'
import { selectErrorMessages } from '../redux/CommonConsts'

const RegisterForm = ({ onSubmitRegister }) =>
    <Form name='Register'
        validate={validateRegister(useSelector(selectErrorMessages))}
        onSubmit={onSubmitRegister}
        render={RegisterFormRender}
    />

RegisterForm.propTypes = {
    onSubmitRegister: PropTypes.func.isRequired,
}

export default RegisterForm
