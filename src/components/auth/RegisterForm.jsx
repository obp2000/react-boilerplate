import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import renderField from '../Shared/RenderField'
import SubmitButton from '../Shared/SubmitButton'
import Errors from '../Errors'

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
                {submitError && <Errors errors={submitError}/>}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="username">
                        Имя пользователя
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <Field name="username" component={renderField} required/>
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
                        <Field type="email" name="email" component={renderField}
                            className="validate" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="first_name">
                        Имя
                    </label>
                    <div className="col-sm-8">
                        <Field name="first_name" component={renderField} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="last_name">
                        Фамилия
                    </label>
                    <div className="col-sm-8">
                        <Field name="last_name" component={renderField} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="password1">
                        Пароль
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <Field name="password1" type="password" className="validate"
                            component={renderField} required/>
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
                        <Field name="password2" type="password" className="validate"
                            component={renderField} required/>
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