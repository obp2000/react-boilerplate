'use client'

import { Translation } from '@/app/i18n/dictionaries'
import Button from '@/client/Button'
import Modal from '@/client/Modal'
import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthButtonAndModal({
  lng,
  labels,
  errorMessages
}: {
  lng: string
  labels: Translation['auth']
  errorMessages: Translation['errorMessages']
}) {
  const [modal, setModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const AuthComp = isLogin ? LoginForm : RegisterForm
  return <>
    <Button onClick={() => setModal(!modal)} >
      {labels?.login}
    </Button>
    <Modal show={modal} onClose={() => setModal(false)} >
      <Modal.Header>
        {isLogin ? labels?.login : labels?.register}
      </Modal.Header>
      <Modal.Body>
        <AuthComp {...{ lng, setModal, labels, errorMessages }} />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 pt-2">
          <a href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? labels?.register : labels?.login}
          </a>
        </p>
      </Modal.Body>
    </Modal>
  </>
}
