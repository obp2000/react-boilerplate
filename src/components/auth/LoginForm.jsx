import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
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
            <FormStrap onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                {submitError && <Errors errors={submitError}/>}
                <Field name="username" label="Имя пользователя*" component={RowFormGroup} />
                <Field name="password" type='password' label="Пароль*" component={RowFormGroup} />
                <SubmitButton text='Вход' submitDisabled={submitting || invalid || pristine}/>
            </FormStrap>
      )}
    </Form>

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default LoginForm