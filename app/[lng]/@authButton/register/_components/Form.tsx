import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useForm } from "react-hook-form"

import { errorText } from '@/app/_objects/formHelpers'
import tables from '@/app/_tables/tables.json'
import Button from '@/app/components/Button'
import { toastError, toastSuccess } from '@/app/components/toast'
import { struct } from './struct'
import { create } from './actions'

import type { Translation } from '@/app/i18n/dictionaries'
import type { RegisterValues } from '@/interfaces/users'
import type { TransitionStartFunction } from 'react'
import type { FieldError } from "react-hook-form"

export default function RegisterForm({
  labels: {
    name,
    nameHelpText,
    email,
    firstName,
    lastName,
    password1,
    password1HelpText,
    password2,
    password2HelpText,
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
    control,
    formState: {
      isDirty,
      errors: {
        name: nameError,
        email: emailError,
        password1: password1Error,
        ...errors
      },
      isValid,
    }
  } = useForm<RegisterValues>({
    defaultValues: tables.users.initObject,
    resolver: superstructResolver(struct)
  })
  const { back } = useRouter()
  const action = useCallback((formData: FormData) => {
    startTransition(async () => {
      const res = await create({
        formData,
        lng,
      })
      if (res.success) {
        toastSuccess(res.message as string)
        back()
      } else {
        toastError(res.error)
      }
    })
  }, [back, lng, startTransition])
  const objectError = useMemo(
    () => errors ? Object.values(errors).find(
      ({ type }) => type === 'object')
      : undefined,
    [errors]) as FieldError
  return <form
    action={action}
    className='flex flex-col mt-1 gap-2'
  >
    <TextField {...register('name')}
      required
      label={name}
      autoComplete="name"
      variant="outlined"
      size="small"
      disabled={busy}
      error={!!nameError}
      helperText={errorText(errorMessages, nameError) || nameHelpText}
      aria-invalid={nameError ? "true" : "false"}
    />
    <TextField {...register('email')}
      required
      label={email}
      autoComplete="email"
      variant="outlined"
      size="small"
      disabled={busy}
      error={!!emailError}
      helperText={errorText(errorMessages, emailError)}
      aria-invalid={emailError ? "true" : "false"}
    />
    <TextField {...register('firstName')}
      label={firstName}
      autoComplete="firstName"
      variant="outlined"
      size="small"
      disabled={busy}
    />
    <TextField {...register('lastName')}
      label={lastName}
      autoComplete="lastName"
      variant="outlined"
      size="small"
      disabled={busy}
    />
    <TextField {...register('password1')}
      type="password"
      required
      label={password1}
      autoComplete="new-password"
      variant="outlined"
      size="small"
      disabled={busy}
      error={!!password1Error}
      helperText={errorText(errorMessages, password1Error) ||
        password1HelpText}
      aria-invalid={password1Error ? "true" : "false"}
    />
    <TextField {...register('password2')}
      type="password"
      label={password2}
      autoComplete="new-password"
      variant="outlined"
      size="small"
      disabled={busy}
      error={!!objectError}
      helperText={errorText(errorMessages, objectError) ||
        password2HelpText}
      aria-invalid={objectError ? "true" : "false"}
    />
    <Button
      type='submit'
      aria-label={labels.register}
      disabled={busy || !isDirty || !isValid}
    >
      {labels.register}
    </Button>
  </form>
}
