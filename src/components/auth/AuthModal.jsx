import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button
} from 'reactstrap'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { selectAuth, toggleModal, toggleLogin } from '../redux/auth'
// import { useGetOptionsQuery } from '../../services/apiSlice'

const AuthModal = commonConsts => {
    const {
        isAuthenticated,
        modal,
        isLogin
    } = useSelector(selectAuth)
    // const {
    //     data: {
    //         commonConsts = {}
    //     } = {},
    //     isLoading,
    //     isFetching: isOptionsFetching,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetOptionsQuery(lastOptionsArg)
    const { login, register } = commonConsts
    const dispatch = useDispatch()
    return <Modal isOpen={modal}>
        <ModalHeader toggle={() => dispatch(toggleModal())}>
            {isLogin ? login : register}
        </ModalHeader>
        <ModalBody>
            {isLogin ?
                <LoginForm {...commonConsts } /> :
                <RegisterForm {...commonConsts} />}
            <Button size='sm' outline
                    onClick={() => dispatch(toggleLogin())}>
                {isLogin ? register : login}
            </Button>
        </ModalBody>
    </Modal>
}

export default AuthModal