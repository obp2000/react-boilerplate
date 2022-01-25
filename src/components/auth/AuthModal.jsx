import PropTypes from 'prop-types'
import React from 'react'
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
import LoginForm from './Containers/LoginForm'
import RegisterForm from './Containers/RegisterForm'

const AuthModal = ({
	toggleModal,
	modal,
	login,
	toggleLogin}) =>
    <Modal isOpen={modal}>
        <ModalHeader toggle={toggleModal}>
            {login ? 'Вход' : 'Регистрация'}
        </ModalHeader>
        <ModalBody>
            {login ? <LoginForm/> : <RegisterForm/>}
            <Button size='sm' outline onClick={toggleLogin}>
                {login ? 'Регистрация' : 'Вход'}
            </Button>
        </ModalBody>
    </Modal>

AuthModal.propTypes = {
    toggleModal: PropTypes.func,
    modal: PropTypes.bool,
    login: PropTypes.bool,
    toggleLogin: PropTypes.func,
}

export default AuthModal