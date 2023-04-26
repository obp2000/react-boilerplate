import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
import Stack from '@/app/useClient/Stack'
import type { RegisterValues } from '@/interfaces/users'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import TextField from '@mui/material/TextField'
import { Controller, FieldError, useForm } from "react-hook-form"
import { struct } from './struct'
import tables from '@/app/_tables/tables.json'
import {
  type Dispatch,
  useCallback,
  SetStateAction,
  type TransitionStartFunction
} from 'react'
import { toastError, toastSuccess } from '@/app/components/toast'
import { useRouter } from 'next/navigation'

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
    login,
    register,
    successfulRegister,
    ...auth
  },
  errorMessages,
  isPending,
  startTransition,
  setModal,
}: {
  labels: Translation['auth']
  errorMessages: Translation['errorMessages']
  isPending: boolean
  startTransition: TransitionStartFunction
  setModal: Dispatch<SetStateAction<boolean>>
}) {
  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    }
  } = useForm<RegisterValues>({
    defaultValues: tables.users.initObject,
    resolver: superstructResolver(struct)
  })
  const { refresh } = useRouter()
  const onSubmit = async (values: RegisterValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    if (res.ok) {
      toastSuccess(successfulRegister)
      setModal(false)
      refresh()
    } else {
      const { message } = await res.json()
      toastError(auth[message as keyof typeof auth] || message)
    }
  }
  const busy = isSubmitting || isPending
  const submitHandler = handleSubmit(onSubmit)
  const onSubmitButtonClick = useCallback(() => {
    if (busy) {
      return
    }
    submitHandler()
  }, [submitHandler, busy])
  // console.log('formState ', formState)
  let objectError: FieldError | undefined
  if (errors) {
    objectError = Object.values(errors).find(({ type }) => type === 'object') as FieldError | undefined
  }
  return <Stack sx={{ mt: 1, gap: 2 }}>
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
        helperText={errors?.name
          ? errorMessages[errors.name.message as keyof Translation['errorMessages']]
          : nameHelpText}
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
        error={errors?.email ? true : undefined}
        helperText={errors?.email
          ? errorMessages[errors.email.message as keyof Translation['errorMessages']]
          : undefined}
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
        error={errors?.password1 ? true : undefined}
        helperText={errors?.password1
          ? errorMessages[errors.password1.message as keyof Translation['errorMessages']]
          : password1HelpText}
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
        error={objectError ? true : undefined}
        helperText={objectError
          ? errorMessages[objectError.message as keyof Translation['errorMessages']]
          : password2HelpText}
      />}
    />
    <Button
      size='small'
      variant='outlined'
      aria-labelledby={register}
      disabled={busy || !isDirty}
      onClick={() => startTransition(onSubmitButtonClick)}
    >
      {register}
    </Button>
  </Stack>
}
