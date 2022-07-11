import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {useOutletContext} from 'react-router-dom'
import {validateRegister} from './Validators'
import RegisterFormRender from './RegisterFormRender'
import {useGetOptionsQuery} from '../options/optionsApi'
import {useRegisterMutation} from './authApi'

const emptyObject = {}

const RegisterForm = () => {
  const {commonConsts} = useOutletContext()
  const {
    data: {
      options
    } = emptyObject,
    ...optionsStatus
  } = useGetOptionsQuery('/register/')
  const [registerAction, registerStatus] = useRegisterMutation()
  const busy = optionsStatus.isFetching || registerStatus.isLoading
  return <Form name='Register'
      validate={validateRegister(commonConsts?.error_messages)}
      onSubmit={values => registerAction(values)}
      render={RegisterFormRender}
      {...{options, busy}}
    />
}

export default RegisterForm
