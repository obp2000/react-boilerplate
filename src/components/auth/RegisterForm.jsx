import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import { RegFormText } from './Consts'
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
            <FormStrap onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                {submitError && <Errors errors={submitError}/>}
                <Field name="username" label="Имя пользователя*" form_text={RegFormText.username} component={RowFormGroup} />
                <Field name="email" label="Email*" type='email' component={RowFormGroup} />
                <Field name="first_name" label="Имя" component={RowFormGroup} />
                <Field name="last_name" label="Фамилия" component={RowFormGroup} />
                <Field name="password1" label="Пароль*" type='password' form_text={RegFormText.password1} component={RowFormGroup} />
                <Field name="password2" label="Подтверждение пароля*" type='password' form_text={RegFormText.password2} component={RowFormGroup} />
                <SubmitButton text='Регистрация' submitDisabled={submitting || invalid || pristine}/>
            </FormStrap>
        )}
    </Form>

RegisterForm.propTypes = {
    handleSubmit: PropTypes.func,
}

export default RegisterForm