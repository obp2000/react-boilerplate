import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import renderField from '../Shared/RenderField'
import Errors from '../Errors'
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
                {submitError && <Errors errors={submitError}/>}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="username">
                        Имя пользователя
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <Field name="username" component={renderField} required={true}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label offset-sm-1" htmlFor="password">
                        Пароль
                        <span className="asteriskField">*</span>
                    </label>
                    <div className="col-sm-8">
                        <Field name="password" type="password" className="validate"
                            component={renderField} required/>
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