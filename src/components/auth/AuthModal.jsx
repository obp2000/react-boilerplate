import PropTypes from 'prop-types'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import Loader from 'react-loader'
import {useOutletContext} from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {toggleModal, toggleLogin} from './modalSlice'
import {selectAuthModal} from './selectors'

const emptyObject = {}

const AuthModal = () => {
  const {modal, isLogin} = useSelector(selectAuthModal)
  const {
    commonConsts,
    commonConsts: {
      login,
      register
    } = emptyObject,
    isFetching
  } = useOutletContext()
  const [headerLabel, toggleLabel, AuthComponent] = isLogin ?
    [login, register, LoginForm] : [register, login, RegisterForm]
  const dispatch = useDispatch()
  return <Loader loaded={!isFetching}>
      <Modal isOpen={modal}>
        <ModalHeader toggle={() => dispatch(toggleModal())}>
          {headerLabel}
        </ModalHeader>
        <ModalBody>
          <AuthComponent {...commonConsts} />
          <Button size='sm'
                  outline
                  onClick={() => dispatch(toggleLogin())}>
            {toggleLabel}
          </Button>
        </ModalBody>
      </Modal>
    </Loader>
}

export default AuthModal
