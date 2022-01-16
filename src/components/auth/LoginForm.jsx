import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
import Error from '../Error'
import EmailField from '../Shared/EmailField'
import TextField from '../Shared/TextField'
import PasswordField from '../Shared/PasswordField'
import SubmitButton from '../Shared/SubmitButton'

import { validateLogin } from './Validators'

const LoginForm = ({
        onSubmit
    }) =>
    <Form name='Login'
          validate={validateLogin}
          onSubmit={onSubmit}
        >
        {({ handleSubmit, submitting, invalid, pristine, submitError }) => (
            <form onSubmit={handleSubmit} className="form-horizontal">
                {submitError && <Error errors={submitError}/>}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="username">
                        Имя пользователя
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <TextField name="username" required={true}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="password">
                        Пароль
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <PasswordField name="password" required={true}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                        <SubmitButton text='Вход' submitDisabled={submitting || invalid || pristine}/>
                    </div>
                </div>
            </form>
      )}
    </Form>

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default LoginForm