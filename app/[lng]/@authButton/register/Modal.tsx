'use client'

import type { Translation } from '@/app/i18n/dictionaries'
import { useTransition } from 'react'
import ModalComp from '../Modal'
import Form from './Form'

export default function Modal({
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
  return <ModalComp {...{
    label: labels.register,
    busy,
    path: `/${lng}/login`,
    actionLabel: labels.login
  }} >
    <Form {...formProps} />
  </ModalComp>
}
