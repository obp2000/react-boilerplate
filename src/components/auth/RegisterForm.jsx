import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'redux-form'
import EmailField from '../Shared/EmailField'
import PasswordField from '../Shared/PasswordField'
import TextField from '../Shared/TextField'
import SubmitButton from '../Shared/SubmitButton'
import Error from '../Error'

const RegisterForm = ({
    error,
    handleSubmit,
    onSubmit,
    submitting,
    invalid,
    pristine
}) => <Form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
        {error && <Error errors={error}/>}
        <div className="form-group row">
            <label className="col-sm-4 col-form-label offset-sm-1" htmlFor="name">Имя</label>
            <div className="col-sm-7">
                <TextField name="name"/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-4 col-form-label offset-sm-1" htmlFor="username">Ник</label>
            <div className="col-sm-7">
                <TextField name="username" required={true}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-4 col-form-label offset-sm-1" htmlFor="email">Email</label>
            <div className="col-sm-7">
                <EmailField name="email" required={true}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-4 col-form-label offset-sm-1" htmlFor="password">Пароль</label>
            <div className="col-sm-7">
                <PasswordField name="password" required={true}/>
            </div>
        </div>
        <div className="form-group row">
            <label
                className="col-sm-4 col-form-label offset-sm-1"
                htmlFor="passwordConfirmation">Подтверждение пароля</label>
            <div className="col-sm-7">
                <PasswordField name="passwordConfirmation" required={true}/>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
                <SubmitButton
                    text='Регистрация'
                    submitDisabled={submitting || invalid || pristine}/>
            </div>
        </div>
    </Form>

RegisterForm.propTypes = {
    errors: PropTypes.array,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool
}

export default RegisterForm