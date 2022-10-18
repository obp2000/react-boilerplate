import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import AuthForm from './AuthForm'
import { useAuthModal } from './hooks'

const AuthModal = () => {
  const {
    isOpen,
    headerAttrs,
    toggleLoginButtonAttrs,
    authFormConfig,
  } = useAuthModal()
  // console.log('modal props ', props)
  return <Modal {...{ isOpen }} >
    <ModalHeader {...headerAttrs} />
    <ModalBody>
      <AuthForm {...authFormConfig} />
      <Button size='sm' outline {...toggleLoginButtonAttrs} />
    </ModalBody>
  </Modal>
}

export default AuthModal
