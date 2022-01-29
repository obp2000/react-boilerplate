import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    Row,
    Col,
    Button
} from 'reactstrap'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { toggleModal, toggleLogin } from '../redux/auth'

const AuthModal = () => {
    const auth = useSelector(({
        auth: {
            login,
            modal
        }
    }) => ({
        login,
        modal
    }))
    const dispatch = useDispatch()
    return <Modal isOpen={auth.modal}>
         <ModalHeader toggle={() => dispatch(toggleModal())}>
            {auth.login ? 'Вход' : 'Регистрация'}
        </ModalHeader>
        <ModalBody>
            {auth.login ? <LoginForm/> : <RegisterForm/>}
            <Button size='sm' outline onClick={() => dispatch(toggleLogin())}>
                {auth.login ? 'Регистрация' : 'Вход'}
            </Button>
        </ModalBody>
    </Modal>
}

export default AuthModal