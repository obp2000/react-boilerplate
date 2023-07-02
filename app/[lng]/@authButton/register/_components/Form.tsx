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
  labels: {
    successfulRegister,
    ...labels
  },
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
    register,
    handleSubmit,
    formState: {
      isDirty,
      errors,
      isValid,
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
      toastSuccess(successfulRegister)
      back()
    } else {
      const { error } = await res.json()
      toastError(error)
    }
  }, [lng, back, successfulRegister])
  const onSubmit = useCallback(() => {
    handleSubmit(onSubmitRegister)()
  }, [handleSubmit, onSubmitRegister])
  return <>
    <Name {...{
      register,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <Email {...{
      register,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <FirstName {...{
      register,
      labels,
      busy,
    }} />
    <LastName {...{
      register,
      labels,
      busy,
    }} />
    <Password1 {...{
      register,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <Password2 {...{
      register,
      labels,
      busy,
      errorMessages,
      errors,
    }} />
    <Button
      aria-label={labels.register}
      disabled={busy || !isDirty || !isValid}
      onClick={() => startTransition(onSubmit)}
    >
      {labels.register}
    </Button>
  </>
}
