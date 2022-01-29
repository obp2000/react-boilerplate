import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import createDecorator from 'final-form-submit-listener'
import { Form as FormStrap } from 'reactstrap'
import RowFormGroup from '../Shared/RowFormGroup'
import Errors from '../Shared/Errors'
import SubmitButton from '../Shared/SubmitButton'
import { onSubmitLogin } from '../redux/auth'
import { validateLogin } from './Validators'

const submitListener = createDecorator({
  afterSubmitFailed: form => form.restart()
})

const LoginForm = () => {
    const dispatch = useDispatch()
    return <Form name='Login'
          validate={validateLogin}
          onSubmit={onSubmitLogin(dispatch)}
          decorators={[ submitListener ]}
        >
        {({ handleSubmit, submitting, invalid, pristine, submitError }) => (
            <FormStrap onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                {submitError && <Errors authErrors={submitError}/>}
                <Field name="username" label="Имя пользователя*" component={RowFormGroup} />
                <Field name="password" type='password' label="Пароль*" component={RowFormGroup} />
                <SubmitButton text='Вход' submitDisabled={submitting || invalid || pristine}/>
            </FormStrap>
      )}
    </Form>
}

export default LoginForm