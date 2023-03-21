import Button from '@/app/useClient/Button'
import type { Translation } from '@/app/i18n/dictionaries'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import TextField from '@mui/material/TextField'
import clsx from 'clsx'
import parse from 'html-react-parser'
import { useState, useTransition, type Dispatch, type SetStateAction } from 'react'
import {
  Controller, FieldError, useForm
} from "react-hook-form"
import { useAuthAction } from './hooks'
import { Register } from './register'
import defaultValues from './register.json'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import type { RegisterValues } from '@/interfaces/users'

export default function RegisterForm({
  lng,
  setModal,
  labels: {
    username,
    usernameHelpText,
    email,
    firstName,
    lastName,
    password1,
    password1HelpText,
    password2,
    password2HelpText,
    login,
    successfulRegister,
    ...labels
  },
  errorMessages
}: {
  lng: string
  setModal: Dispatch<SetStateAction<boolean>>
  labels: Translation['auth']
  errorMessages: Translation['errorMessages']
}) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const onSubmit = useAuthAction({
    url: '/register',
    labels: labels as Translation['auth'],
    startTransition,
    lng,
    setModal,
    setSuccess,
    setErrorMessage,
  })
  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isValidating,
      isSubmitting,
    }
  } = useForm<RegisterValues>({
    defaultValues,
    resolver: superstructResolver(Register)
  })
  const busy = isSubmitting || isPending
  // console.log('formState ', formState)
  let objectError: FieldError | undefined
  if (errors) {
    objectError = Object.values(errors).find(({ type }) => type === 'object') as FieldError | undefined
  }
  return <form onSubmit={handleSubmit(onSubmit)}
    className={clsx('flex flex-col gap-3 pt-1', { 'opacity-70': busy })}>
    <Controller name="username"
      control={control}
      render={({ field }) => <TextField {...field}
        id="username"
        required
        label={username}
        autoComplete="username"
        variant="outlined"
        size="small"
        disabled={busy}
        helperText={errors?.username
          ? errorMessages[errors.username.message as keyof Translation['errorMessages']]
          : usernameHelpText}
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
          : parse(password1HelpText)}
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
      type='submit'
      size='small'
      variant='outlined'
      aria-labelledby={labels.register}
      disabled={busy}
    >
      {labels.register}
    </Button>
    <Snackbar open={success || !!errorMessage} autoHideDuration={3000}>
      <Alert severity={success ? "success" : "error"} elevation={6}
        variant="filled" sx={{ width: '100%' }}>
        {success ? successfulRegister : errorMessage}
      </Alert>
    </Snackbar>
  </form>
}
