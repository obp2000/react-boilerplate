import Button from '@/app/components/Button'
import { toastError, toastSuccess } from '@/app/components/toast'
import type { Translation } from '@/app/i18n/dictionaries'
import { struct } from '@/app/user/struct'
import { errorText } from '@/app/_objects/formHelpers'
import tables from '@/app/_tables/tables.json'
import type { RegisterValues } from '@/interfaces/users'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import {
  useCallback, useMemo,
  type TransitionStartFunction
} from 'react'
import {
  Controller, useForm, type FieldError
} from "react-hook-form"

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
    register,
    successfulRegister,
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
    control,
    handleSubmit,
    formState: {
      isDirty,
      errors: {
        name: nameError,
        email: emailError,
        password1: password1Error,
        ...errors
      },
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
  }, [lng])
  const onSubmit = useCallback(() => {
    handleSubmit(onSubmitRegister)()
  }, [handleSubmit, onSubmitRegister])
  const objectError = useMemo(() => errors
    ? Object.values(errors).find(({ type }) => type === 'object')
    : undefined,
    [errors]) as FieldError
  return <>
    <Controller name="name"
      control={control}
      render={({ field }) => <TextField {...field}
        id="name"
        required
        label={name}
        autoComplete="name"
        variant="outlined"
        size="small"
        disabled={busy}
        error={!!nameError}
        helperText={errorText(errorMessages, nameError) || nameHelpText}
      />}
    />
    <Controller name="email"
      control={control}
      render={({ field }) => <TextField {...field}
        id="email"
        required
        label={email}
        autoComplete="email"
        variant="outlined"
        size="small"
        disabled={busy}
        error={!!emailError}
        helperText={errorText(errorMessages, emailError)}
      />}
    />
    <Controller name="firstName"
      control={control}
      render={({ field }) => <TextField {...field}
        id="firstName"
        label={firstName}
        autoComplete="firstName"
        variant="outlined"
        size="small"
        disabled={busy}
      />}
    />
    <Controller name="lastName"
      control={control}
      render={({ field }) => <TextField {...field}
        id="lastName"
        label={lastName}
        autoComplete="lastName"
        variant="outlined"
        size="small"
        disabled={busy}
      />}
    />
    <Controller name="password1"
      control={control}
      render={({ field }) => <TextField {...field}
        type="password"
        id="password1"
        required
        label={password1}
        autoComplete="new-password"
        variant="outlined"
        size="small"
        disabled={busy}
        error={!!password1Error}
        helperText={errorText(errorMessages, password1Error) || password1HelpText}
      />}
    />
    <Controller name="password2"
      control={control}
      render={({ field }) => <TextField {...field}
        type="password"
        id="password2"
        label={password2}
        autoComplete="new-password"
        variant="outlined"
        size="small"
        disabled={busy}
        error={!!objectError}
        helperText={errorText(errorMessages, objectError) || password2HelpText}
      />}
    />
    <Button
      aria-label={register}
      disabled={busy || !isDirty}
      onClick={() => startTransition(onSubmit)}
    >
      {register}
    </Button>
  </>
}
