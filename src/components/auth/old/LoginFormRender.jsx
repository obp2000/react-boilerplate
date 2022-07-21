import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form} from 'reactstrap'
import Loader from 'react-loader'
import RowFormGroup from '../Shared/RowFormGroup'
import SubmitButton from '../Shared/SubmitButton'

const LoginFormRender = ({
  options,
  login,
  ...props
}) => {
    const authFieldAttrs = {options, component: RowFormGroup}
    return <Loader loaded={!props.isLoggingIn}>
      <Form onSubmit={props.handleSubmit}
          className="shadow p-3 mb-5 bg-body rounded">
          <Field
            name="username"
            required
            {...authFieldAttrs}
          />
          <Field
            name="password"
            type='password'
            {...authFieldAttrs}
          />
          <SubmitButton text={login} {...props} />
        </Form>
      </Loader>
}

LoginFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  options: PropTypes.object,
  login: PropTypes.string,
  props: PropTypes.object,
}

export default LoginFormRender
