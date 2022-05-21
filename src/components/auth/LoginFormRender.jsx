import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form} from 'reactstrap'
import Loader from 'react-loader'
import RowFormGroup from '../Shared/RowFormGroup'
import SubmitButton from '../Shared/SubmitButton'

const LoginFormRender = ({
  options,
  handleSubmit,
  busy,
  login,
  ...props
}) => {
  // const options = props.options
  // console.log('props ', props)
  return <Loader loaded={!busy}>
    <Form onSubmit={handleSubmit}
      className="shadow p-3 mb-5 bg-body rounded">
      <Field name="username"
        required
        {...{options}}
        component={RowFormGroup} />
      <Field name="password"
        type='password'
        {...{options}}
        component={RowFormGroup} />
      <SubmitButton text={login} {...props} />
    </Form>
  </Loader>
}

LoginFormRender.propTypes = {
  options: PropTypes.object,
  handleSubmit: PropTypes.func,
  busy: PropTypes.bool,
  login: PropTypes.string,
  props: PropTypes.object,
  // hasSubmitErrors: PropTypes.func,
  // submitError: PropTypes.object,
}

export default LoginFormRender
