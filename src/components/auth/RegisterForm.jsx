import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
import EmailField from '../Shared/EmailField'
import PasswordField from '../Shared/PasswordField'
import TextField from '../Shared/TextField'
import SubmitButton from '../Shared/SubmitButton'
import Error from '../Error'

import { validateRegister } from './Validators'

const RegisterForm = ({
        onSubmit
    }) =>
    <Form name='Register'
          validate={validateRegister}
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
                        <small className="form-text text-muted">
                            Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
                        </small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="email">
                        Email
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <EmailField name="email" required={true}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="password1">
                        Пароль
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <PasswordField name="password1" required={true}/>
                        <small className="form-text text-muted">
                            <ul>
                                <li>Пароль не должен быть слишком похож на другую вашу личную информацию.</li>
                                <li>Ваш пароль должен содержать как минимум 8 символов.</li>
                                <li>Такой пароль часто используется.</li>
                                <li>Пароль не может состоять только из цифр.</li>
                            </ul>
                        </small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="password2">
                        Подтверждение пароля
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <PasswordField name="password2" required={true}/>
                        <small className="form-text text-muted">
                            Для подтверждения введите, пожалуйста, пароль ещё раз.
                        </small>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                        <SubmitButton text='Регистрация'
                            submitDisabled={submitting || invalid || pristine}/>
                    </div>
                </div>
            </form>
        )}
    </Form>

RegisterForm.propTypes = {
    handleSubmit: PropTypes.func,
}

export default RegisterForm