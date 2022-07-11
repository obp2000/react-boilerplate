import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form} from 'reactstrap'
import {useOutletContext} from 'react-router-dom'
import Loader from 'react-loader'
import RowFormGroup from '../Shared/RowFormGroup'
import SubmitButton from '../Shared/SubmitButton'

const LoginFormRender = ({
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
          required
          {...{options}}
          component={RowFormGroup} />
        <Field name="password"
          type='password'
          {...{options}}
          component={RowFormGroup} />
        <SubmitButton text={commonConsts?.login} {...props} />
      </Form>
  </Loader>
}

LoginFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  options: PropTypes.object,
  busy: PropTypes.bool,
  props: PropTypes.object,
}

export default LoginFormRender
