'use client'

import type { Translation } from '@/app/i18n/dictionaries'
import { useTransition } from 'react'
import ModalComp from '../../Modal'
import Form from './Form'

export default function Modal({
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
  return <ModalComp {...{
    label: labels.login,
    busy,
    path: `/${lng}/register`,
    actionLabel: register
  }} >
    <Form {...formProps} />
  </ModalComp>
}