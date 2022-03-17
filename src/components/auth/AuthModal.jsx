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
import { toggleModal, toggleLogin, getOptions } from '../redux/auth'

const AuthModal = () => {
    const loaded = useSelector(({
        auth: {
            login = false,
            modal,
        },
        common_consts: {
            login: login_text,
            register: register_text
        } = {}
    }) => ({
        login,
        modal,
        modal_header: login ? login_text : register_text,
        button_label: login ? register_text : login_text
    }))
    const dispatch = useDispatch()
    return <Modal isOpen={loaded.modal}>
         <ModalHeader toggle={() => dispatch(toggleModal())}>
            {loaded.modal_header}
        </ModalHeader>
        <ModalBody>
            {loaded.login ? <LoginForm/> : <RegisterForm/>}
            <Button size='sm'
                    outline
                    onClick={() => dispatch(toggleLogin())}
            >
                {loaded.button_label}
            </Button>
        </ModalBody>
    </Modal>
}

export default AuthModal