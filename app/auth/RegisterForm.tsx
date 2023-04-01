import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
import Stack from '@/app/useClient/Stack'
import type { RegisterValues } from '@/interfaces/users'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import TextField from '@mui/material/TextField'
import {
    Controller, FieldError, useForm
} from "react-hook-form"
import { Register } from './register'
import defaultValues from './register.json'

export default function RegisterForm({
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
    ...labels
  },
  errorMessages,
  onSubmit,
  isPending
}: {
  labels: Translation['auth']
  errorMessages: Translation['errorMessages']
  onSubmit: (values: RegisterValues) => Promise<void>
  isPending: boolean
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
    defaultValues,
    resolver: superstructResolver(Register)
  })
  const busy = isSubmitting || isPending
  // console.log('formState ', formState)
  let objectError: FieldError | undefined
  if (errors) {
    objectError = Object.values(errors).find(({ type }) => type === 'object') as FieldError | undefined
  }
  return <form onSubmit={handleSubmit(onSubmit)}>
    <Stack sx={{ mt: 1, gap: 2 }}>
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
        type='submit'
        size='small'
        variant='outlined'
        aria-labelledby={labels.register}
        disabled={busy || !isDirty}
      >
        {labels.register}
      </Button>
    </Stack>
  </form>
}
