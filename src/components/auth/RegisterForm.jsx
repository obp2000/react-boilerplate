import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { validateRegister } from './Validators'
import RegisterFormRender from './RegisterFormRender'
// import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import createDecorator from 'final-form-submit-listener'
import { reset } from '../redux/auth'
import {
    useGetOptionsQuery,
    useRegisterMutation,
    apiSlice
} from '../../services/apiSlice'
import { closeModal } from '../redux/auth'

const RegisterForm = ({
    error_messages,
    ...consts
}) => {
    const {
        data: {
            options
        } = {}
    } = useGetOptionsQuery('/register/')
    // console.log('commonConsts ', commonConsts)
    const [
        registerAction,
        {
            data,
            isLoading: isLoadingRegister,
            isSuccess: isSuccessRegister,
            isError: isErrorRegister,
            error: registerError
        }
    ] = useRegisterMutation()
    // console.log('error ', error)
    // if (isError) console.log('error ', mutationError)
    const dispatch = useDispatch()
    // if (isSuccessRegister) {
    //     // dispatch(reset())
    //     toast.success(successfully)
    //     dispatch(closeModal())
    // }
    return <>
        {/*{isSuccessRegister && <Redirect to='/' />}*/}
        <Form name='Register'
            validate={validateRegister(error_messages)}
            // onSubmit={values => registerAction(values)}
            onSubmit={values => registerAction(values).unwrap()
                .then(() => dispatch(apiSlice.endpoints.getUser.initiate())
                )
            }
            render={RegisterFormRender}
            {...{options, isLoadingRegister}}
            {...consts}
        />
    </>
}

RegisterForm.propTypes = {
    // onSubmitRegister: PropTypes.func.isRequired,
}

export default RegisterForm
