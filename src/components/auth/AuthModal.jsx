import PropTypes from 'prop-types'
import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import AuthForm from './AuthForm'
import {useAuthModal, useToggleLoginButton} from './hooks'

const AuthModal = (props) => {
  // console.log('props .............', props)
  const {loaded, isOpen, headerAttrs, authHook} = useAuthModal(props)
  const toggleLoginButtonAttrs = useToggleLoginButton(props)
  return <Modal {...{isOpen}} >
    <ModalHeader {...headerAttrs} />
    <ModalBody>
      <AuthForm {...authHook(props)} />
      <Button size='sm' outline {...toggleLoginButtonAttrs} />
    </ModalBody>
  </Modal>
}

AuthModal.propTypes = {
  props: PropTypes.object,
}

export default AuthModal
