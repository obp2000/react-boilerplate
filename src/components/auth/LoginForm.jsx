import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
// import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { validateLogin } from './Validators'
import LoginFormRender from './LoginFormRender'
import {
    useGetOptionsQuery,
    useLoginMutation,
} from '../../services/apiSlice'

// const submitListener = createDecorator({
//   afterSubmitFailed: form => form.restart()
// })

const LoginForm = ({
    error_messages,
    // loginAction,
    // isErrorLogin,
    // loginError,
    ...consts
}) => {
    const {
        data: {
            options
        } = {},
        isFetching: isOptionsFetching
    } = useGetOptionsQuery('/login/')
    // console.log('commonConsts ', commonConsts)
    const [
        loginAction,
        {
            isLoading: isLoadingLogin,
            // isSuccess: isSuccessLogin,
            // isError: isErrorLogin,
            // error: loginError
        }
    ] = useLoginMutation()
    const dispatch = useDispatch()
    return <>
            <Form name='Login'
                validate={validateLogin(error_messages)}
                // onSubmit={values => loginAction(values).unwrap()
                //     .then(() => dispatch(apiSlice.endpoints.getUser.initiate())
                //     )
                // }
                onSubmit={values => loginAction(values)}
                render={LoginFormRender}
                {...{options, isLoadingLogin}}
                {...consts}
            />
    </>
}

LoginForm.propTypes = {
    error_messages: PropTypes.object,
}

export default LoginForm
