'use client'

import { useTransition } from 'react'

import Modal from '../../_components/Modal'
import Form from './Form'

import type { Translation } from '@/app/i18n/dictionaries'

export default function ModalComp({
  labels,
  errorMessages,
  lng,
}: {
  labels: Translation['auth']
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
    label: labels.register,
    busy,
    path: `/${lng}/login`,
    actionLabel: labels.login
  }} >
    <Form {...formProps} />
  </Modal>
}
