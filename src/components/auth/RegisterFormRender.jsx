import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form} from 'reactstrap'
import {useOutletContext} from 'react-router-dom'
import Loader from 'react-loader'
import RowFormGroup from '../Shared/RowFormGroup'
import SubmitButton from '../Shared/SubmitButton'

const RegisterFormRender = ({
  handleSubmit,
  options,
  busy,
  ...props
}) => {
    const {commonConsts} = useOutletContext()
    return <Loader loaded={!busy}>
      <Form onSubmit={handleSubmit}
        className="shadow p-3 mb-5 bg-body rounded">
        <Field name="username"
          {...{options}}
          component={RowFormGroup} />
        <Field name="email"
          type='email'
          {...{options}}
          component={RowFormGroup} />
        <Field name="first_name"
          {...{options}}
          component={RowFormGroup} />
        <Field name="last_name"
          {...{options}}
          component={RowFormGroup} />
        <Field name="password1"
          type='password'
          {...{options}}
          component={RowFormGroup} />
        <Field name="password2"
          type='password'
          {...{options}}
          component={RowFormGroup} />
        <SubmitButton text={commonConsts?.register} {...props} />
      </Form>
    </Loader>
}

RegisterFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  options: PropTypes.object,
  busy: PropTypes.bool,
  props: PropTypes.object,
}

export default RegisterFormRender
