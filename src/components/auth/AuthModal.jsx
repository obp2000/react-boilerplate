import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import Loader from 'react-loader'
import AuthForm from './AuthForm'
import {useAuthModal, useToggleLoginButton} from './hooks'

const AuthModal = () => {
  const {loaded, isOpen, headerAttrs, authHook} = useAuthModal()
  const toggleLoginButtonAttrs = useToggleLoginButton()
  return <Loader {...{loaded}} >
      <Modal {...{isOpen}} >
        <ModalHeader {...headerAttrs} />
        <ModalBody>
          <AuthForm {...{authHook}} />
          <Button size='sm' outline {...toggleLoginButtonAttrs} />
        </ModalBody>
      </Modal>
    </Loader>
}

export default AuthModal
