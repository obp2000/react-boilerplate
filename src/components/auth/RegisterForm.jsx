import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {validateRegister} from './Validators'
import RegisterFormRender from './RegisterFormRender'
import {useGetOptionsQuery} from '../options/optionsApi'
import {useRegisterMutation} from './authApi'

const RegisterForm = (commonConsts) => {
  const {data: {options} = {},
      ...optionsStatus} = useGetOptionsQuery('/register/')
  const [registerAction, registerStatus = {}] = useRegisterMutation()
  const busy = optionsStatus.isFetching || registerStatus.isLoading
  return <Form name='Register'
      validate={validateRegister(commonConsts?.error_messages)}
      onSubmit={values => registerAction(values)}
      render={RegisterFormRender}
      {...{options, busy}}
      {...commonConsts}
    />
}

RegisterForm.propTypes = {
  commonConsts: PropTypes.object,
}

export default RegisterForm
