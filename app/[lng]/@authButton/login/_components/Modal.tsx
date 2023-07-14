'use client'

import { useTransition } from 'react'

import Modal from '../../_components/Modal'
import Form from './Form'

import type { Translation } from '@/app/i18n/dictionaries'

export default function ModalComp({
  labels: {
    register,
    ...labels
  },
  errorMessages,
  lng,
}: {
  labels: {
    name: string
    password: string
    login: string
    register: string
  }
  errorMessages: Translation['errorMessages']
  lng: string
}) {
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  const formProps = {
    labels,
    errorMessages,
    busy,
    startTransition,
    lng,
  }
  return <Modal {...{
    label: labels.login,
    busy,
    path: `/${lng}/register`,
    actionLabel: register
  }} >
    <Form {...formProps} />
  </Modal>
}