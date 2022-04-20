import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button
} from 'reactstrap'
import LoginForm from './Containers/LoginForm'
import RegisterForm from './Containers/RegisterForm'
import {
    toggleModal,
    toggleLogin,
    selectModalHeader,
    selectModalButtonlabel,
    selectAuth
} from '../redux/auth'

const AuthModal = () => {
    const dispatch = useDispatch()
    return <Modal isOpen={useSelector(selectAuth).modal}>
         <ModalHeader toggle={() => dispatch(toggleModal())}>
            {useSelector(selectModalHeader)}
        </ModalHeader>
        <ModalBody>
            {useSelector(selectAuth).login ?
                <LoginForm /> :
                <RegisterForm />}
            <Button size='sm'
                    outline
                    onClick={() => dispatch(toggleLogin())}>
                {useSelector(selectModalButtonlabel)}
            </Button>
        </ModalBody>
    </Modal>
}

export default AuthModal
