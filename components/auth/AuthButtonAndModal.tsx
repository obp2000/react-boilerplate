// import 'server-only'

// import AuthButtonAndModalClient from './AuthButtonAndModalClient'
// import { CommonConstsType } from '@/interfaces/commonConsts'

// export default async function AuthButtonAndModal({
//   commonConsts
// }: CommonConstsType) {
//   return <AuthButtonAndModalClient {...{ commonConsts }} />
// }


'use client'

import { CommonConstsType } from '@/interfaces/commonConsts'
import { useOptions } from '@/services/api/client'
import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import AuthForm from './AuthForm'
import { loginFormConfig, registerFormConfig } from './config'
import ToggleLoginButton from './ToggleLoginButton'
import ToggleModalButton from './ToggleModalButton'

export default function AuthButtonAndModal({ commonConsts }: CommonConstsType) {
  const [isLogin, setIsLogin] = useState(true)
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)
  const { indexUrl } = isLogin ? loginFormConfig : registerFormConfig
  const { options } = useOptions(modal ? indexUrl : null)
  return <>
    <ToggleModalButton onClick={toggleModal} {...{ commonConsts }} />
    <Modal isOpen={modal} >
      <ModalHeader toggle={toggleModal}>
        {isLogin ? commonConsts?.login : commonConsts?.register}
      </ModalHeader>
      <ModalBody>
        <AuthForm {...{ isLogin, commonConsts, options }} />
        <ToggleLoginButton {...{ isLogin, setIsLogin, commonConsts }} />
      </ModalBody>
    </Modal>
  </>
}
