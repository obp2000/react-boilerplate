import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


const LoginButton = ({auth_menu_item, ...consts}) => {
  const {login, register} = consts
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const toggleAuthModal = () => setOpenAuthModal(!openAuthModal)
  const [renderLoginForm, setRenderLoginForm] = useState(true)
  const toggleLoginRegister = () => setRenderLoginForm(!renderLoginForm)
  return <>
    <Button color='primary'
      className='btn-outline-light'
      onClick={toggleAuthModal}
      aria-label='auth' >
      {auth_menu_item?.label}
    </Button>
    <Modal isOpen={openAuthModal}>
      <ModalHeader toggle={toggleAuthModal}>
        {renderLoginForm ? login : register}
      </ModalHeader>
      <ModalBody>
        {renderLoginForm ?
                    <LoginForm {...{...consts, setOpenAuthModal}} /> :
                    <RegisterForm {...{...consts, setOpenAuthModal}} />}
        <Button size='sm'
          outline
          onClick={toggleLoginRegister}>
          {renderLoginForm ? register : login}
        </Button>
      </ModalBody>
    </Modal>
  </>
}

export default LoginButton
