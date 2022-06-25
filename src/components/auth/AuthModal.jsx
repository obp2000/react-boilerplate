import PropTypes from 'prop-types'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {toggleModal, toggleLogin} from './modalSlice'
import {selectAuth, selectAuthModal} from './selectors'

const AuthModal = ({commonConsts}) => {
  const {modal, isLogin} = useSelector(selectAuthModal)
  const {isAuthenticated} = useSelector(selectAuth)
  const {login, register} = commonConsts
  const dispatch = useDispatch()
  // console.log('commonConsts ', props)
  return <Modal isOpen={modal && !isAuthenticated}>
    <ModalHeader toggle={() => dispatch(toggleModal())}>
      {isLogin ? login : register}
    </ModalHeader>
    <ModalBody>
      {isLogin ?
                <LoginForm {...commonConsts} /> :
                <RegisterForm {...commonConsts} />}
      <Button size='sm' outline
        onClick={() => dispatch(toggleLogin())}>
        {isLogin ? register : login}
      </Button>
    </ModalBody>
  </Modal>
}

AuthModal.propTypes = {
  commonConsts: PropTypes.object,
}

export default AuthModal
