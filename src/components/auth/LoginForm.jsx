import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {useOutletContext} from 'react-router-dom'
import {validateLogin} from './Validators'
import LoginFormRender from './LoginFormRender'
import {useGetOptionsQuery} from '../options/optionsApi'
import {useLoginMutation} from './authApi'

const emptyObject = {}

const LoginForm = () => {
  const {commonConsts} = useOutletContext()
    const {
      data: {
        options
      } = emptyObject,
      ...optionsStatus
    } = useGetOptionsQuery('/login/')
    const [loginAction, loginStatus] = useLoginMutation()
    const busy = optionsStatus.isFetching || loginStatus.isLoading
    return <Form name='Login'
      validate={validateLogin(commonConsts?.error_messages)}
      onSubmit={(values) => loginAction(values)}
      render={LoginFormRender}
      {...{options, busy}}
    />
  }

export default LoginForm
