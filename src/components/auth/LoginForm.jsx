import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {validateLogin} from './Validators'
import LoginFormRender from './LoginFormRender'
import {
  useGetOptionsQuery,
  useLoginMutation,
} from '../../services/apiSlice'

// const submitListener = createDecorator({
//   afterSubmitFailed: form => form.restart()
// })

const LoginForm = ({
  error_messages: errorMessages,
  // loginAction,
  // isErrorLogin,
  // loginError,
  ...consts
}) => {
  const {
    data: {
      options,
    } = {},
    isFetching: isOptionsFetching,
  } = useGetOptionsQuery('/login/')
  // console.log('commonConsts ', commonConsts)
  const [
    loginAction,
    {
      isLoading: isLoggingIn,
      // isSuccess: isSuccessLogin,
      // isError: isErrorLogin,
      // error: loginError
    },
  ] = useLoginMutation()
  const busy = isOptionsFetching || isLoggingIn
  return <>
    <Form name='Login'
      validate={validateLogin(errorMessages)}
      // onSubmit={values => loginAction(values).unwrap()
      //     .then(() => dispatch(apiSlice.endpoints.getUser.initiate())
      //     )
      // }
      onSubmit={(values) => loginAction(values)}
      render={LoginFormRender}
      {...{options, busy}}
      {...consts}
    />
  </>
}

LoginForm.propTypes = {
  error_messages: PropTypes.object,
  consts: PropTypes.object,
}

export default LoginForm
