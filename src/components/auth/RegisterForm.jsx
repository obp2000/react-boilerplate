import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {useDispatch} from 'react-redux'
// import {Navigate} from 'react-router-dom'
import {validateRegister} from './Validators'
import RegisterFormRender from './RegisterFormRender'
// import { useDispatch } from 'react-redux'
// import createDecorator from 'final-form-submit-listener'
// import {reset} from '../redux/auth'
import {
  useGetOptionsQuery,
  useRegisterMutation,
  apiSlice,
} from '../../services/apiSlice'
// import {closeModal} from '../redux/auth'

const RegisterForm = ({
  error_messages: errorMessages,
  ...consts
}) => {
  const {
    data: {
      options,
    } = {},
    isFetching: isOptionsFetching,
  } = useGetOptionsQuery('/register/')
  // console.log('commonConsts ', commonConsts)
  const [
    registerAction,
    {
      // data,
      isLoading: isRegistering,
      // isSuccess: isSuccessRegister,
      // isError: isErrorRegister,
      // error: registerError
    },
  ] = useRegisterMutation()
  const dispatch = useDispatch()
  const busy = isOptionsFetching || isRegistering
  // if (isSuccessRegister) {
  //     // dispatch(reset())
  //     toast.success(successfully)
  //     dispatch(closeModal())
  // }
  return <>
    {/* {isSuccessRegister && <Navigate to='/' />}*/}
    <Form name='Register'
      validate={validateRegister(errorMessages)}
      // onSubmit={values => registerAction(values)}
      onSubmit={(values) => registerAction(values).unwrap()
          .then(() => dispatch(apiSlice.endpoints.getUser.initiate()),
          )
      }
      render={RegisterFormRender}
      {...{options, busy}}
      {...consts}
    />
  </>
}

RegisterForm.propTypes = {
  error_messages: PropTypes.object,
  consts: PropTypes.object,
}

export default RegisterForm
