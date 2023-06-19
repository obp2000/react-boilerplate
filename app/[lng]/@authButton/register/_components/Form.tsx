import tables from '@/app/_tables/tables.json'
import Button from '@/app/components/Button'
import { toastError, toastSuccess } from '@/app/components/toast'
import type { Translation } from '@/app/i18n/dictionaries'
import { struct } from '@/app/user/struct'
import type { RegisterValues } from '@/interfaces/users'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { useRouter } from 'next/navigation'
import {
	useCallback, type TransitionStartFunction
} from 'react'
import { useForm } from "react-hook-form"
import Email from './Email'
import FirstName from './FirstName'
import LastName from './LastName'
import Name from './Name'
import Password1 from './Password1'
import Password2 from './Password2'

export default function RegisterForm({
  labels,
  errorMessages,
  busy,
  startTransition,
  lng,
}: {
  labels: Translation['auth']
  errorMessages: Translation['errorMessages']
  busy: boolean
  startTransition: TransitionStartFunction
  lng: string
}) {
  const {
    control,
    handleSubmit,
    formState: {
      isDirty,
      errors,
    }
  } = useForm<RegisterValues>({
    defaultValues: tables.users.initObject,
    resolver: superstructResolver(struct)
  })
  const { back } = useRouter()
  const onSubmitRegister = useCallback(async (values: RegisterValues) => {
    const res = await fetch(`/api/auth/${lng}/register`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    if (res.status === 200) {
      toastSuccess(labels.successfulRegister)
      back()
    } else {
      const { error } = await res.json()
      toastError(error)
    }
  }, [lng])
  const onSubmit = useCallback(() => {
    handleSubmit(onSubmitRegister)()
  }, [handleSubmit, onSubmitRegister])
  return <>
    <Name {...{
      control,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <Email {...{
      control,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <FirstName {...{
      control,
      labels,
      busy,
    }} />
    <LastName {...{
      control,
      labels,
      busy,
    }} />
    <Password1 {...{
      control,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <Password2 {...{
      control,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <Button
      aria-label={labels.register}
      disabled={busy || !isDirty}
      onClick={() => startTransition(onSubmit)}
    >
      {labels.register}
    </Button>
  </>
}
