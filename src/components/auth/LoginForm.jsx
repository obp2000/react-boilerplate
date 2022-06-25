import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Form } from 'react-final-form'
import { validateLogin } from './Validators'
import LoginFormRender from './LoginFormRender'
import { useGetOptionsQuery } from '../options/optionsApi'
import { useLoginMutation } from './authApi'

const LoginForm = (commonConsts) => {
    const {data: {options} = {},
        ...optionsStatus} = useGetOptionsQuery('/login/')
    const [loginAction, loginStatus] = useLoginMutation()
    const busy = optionsStatus.isFetching || loginStatus.isLoading
    return <Form name='Login'
      validate={validateLogin(commonConsts?.error_messages)}
      onSubmit={(values) => loginAction(values)}
      render={LoginFormRender}
      {...{options, busy}}
      {...commonConsts}
    />
  }

LoginForm.propTypes = {
    commonConsts: PropTypes.object,
}

export default LoginForm