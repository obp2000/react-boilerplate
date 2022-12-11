'use client'

import Button from '@/client/Button'
import Modal from '@/client/Modal'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { useOptions } from '@/options/client'
import { MainContext } from '@/options/context'
import { useState } from 'react'
import AuthForm from './AuthForm'
import { loginFormConfig, registerFormConfig } from './config'
import { useToggleLoginButton, useToggleModalButton } from './hooks'

export default function AuthButtonAndModal({ commonConsts }: CommonConstsType) {
  const [isLogin, setIsLogin] = useState(true)
  const [modal, setModal] = useState(false)
  const { indexUrl } = isLogin ? loginFormConfig : registerFormConfig
  const { options } = useOptions(modal ? indexUrl : null)
  return <MainContext.Provider value={{ commonConsts, options }}>
    <Button onClick={() => setModal(!modal)} {...useToggleModalButton()} />
    <Modal show={modal} onHide={() => setModal(false)} centered>
      <Modal.Header closeButton>
        {isLogin ? commonConsts?.login : commonConsts?.register}
      </Modal.Header>
      <Modal.Body>
        <AuthForm {...{ isLogin }} />
        <Button onClick={() => setIsLogin(!isLogin)}
          {...useToggleLoginButton({ isLogin })} />
      </Modal.Body>
    </Modal>
  </MainContext.Provider>
}
