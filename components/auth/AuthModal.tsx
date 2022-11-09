import { FC } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import AuthForm from './AuthForm'
import { useAuthModal } from './hooks'

const AuthModal: FC = () => {
  const {
    isOpen,
    headerAttrs,
    toggleLoginButtonAttrs,
    authFormConfig,
  } = useAuthModal()
  return <Modal {...{ isOpen }} >
    <ModalHeader {...headerAttrs} />
    <ModalBody>
      <AuthForm {...authFormConfig} />
      <Button size='sm' outline {...toggleLoginButtonAttrs} />
    </ModalBody>
  </Modal>
}

export default AuthModal
