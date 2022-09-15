import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import AuthForm from './AuthForm'
import { useAuthModal } from './hooks'

type Props = {
  indexUrl: string
}

const AuthModal = (props: Props): JSX.Element => {
  const {
    isOpen,
    headerAttrs,
    toggleLoginButtonAttrs,
    authFormConfig,
    commonConsts,
  } = useAuthModal(props)
  // console.log('modal props ', props)
  return <Modal isOpen={isOpen} >
    <ModalHeader {...headerAttrs} />
    <ModalBody>
      <AuthForm {...authFormConfig} {...{ commonConsts }} />
      <Button size='sm' outline {...toggleLoginButtonAttrs} />
    </ModalBody>
  </Modal>
}

export default AuthModal
