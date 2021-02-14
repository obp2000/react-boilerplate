import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'redux-form'
import Error from '../Error'
import EmailField from '../Shared/EmailField'
import TextField from '../Shared/TextField'
import PasswordField from '../Shared/PasswordField'
import SubmitButton from '../Shared/SubmitButton'

const LoginForm = ({
    error,
    handleSubmit,
    onSubmit,
    submitting,
    invalid,
    pristine
}) => <Form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
        {error && <Error errors={error}/>}
        <div className="form-group row">
            <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="username">Ник</label>
            <div className="col-sm-8">
                <TextField name="username" required={true}/>
            </div>
        </div>        
        <div className="form-group row">
            <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="password">Пароль</label>
            <div className="col-sm-8">
                <PasswordField name="password" required={true}/>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
                <SubmitButton text='Вход' submitDisabled={submitting || invalid || pristine}/>
            </div>
        </div>
    </Form>

LoginForm.propTypes = {
    error: PropTypes.array,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool
}

export default LoginForm