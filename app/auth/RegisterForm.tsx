import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/client/Button'
import { Prisma } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useTransition } from 'react'
import { authAction } from './client'
import {
  useForm,
  Controller, FieldError
} from "react-hook-form"
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { Register } from './register'
import TextField from '@mui/material/TextField'
import defaultValues from './register.json'
import parse from 'html-react-parser'

export type RegisterValues = Pick<Prisma.UserCreateArgs['data'],
  'username' | 'email' | 'first_name' | 'last_name'> &
{ password1: string, password2: string }

export default function RegisterForm({
  lng,
  setModal,
  labels: {
    username,
    usernameHelpText,
    email,
    first_name,
    last_name,
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
  const { refresh, replace } = useRouter()
  const [isPending, startTransition] = useTransition()
  const onSubmit = (values: RegisterValues) =>
    authAction({
      values,
      url: '/register',
      replace,
      message: successfulRegister,
      labels,
      startTransition,
      lng,
      setModal
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
    <Controller name="first_name"
      control={control}
      render={({ field }) => <TextField {...field}
        id="first_name"
        label={first_name}
        autoComplete="first_name"
        variant="outlined"
        size="small"
        disabled={busy}
      />}
    />
    <Controller name="last_name"
      control={control}
      render={({ field }) => <TextField {...field}
        id="last_name"
        label={last_name}
        autoComplete="last_name"
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
  </form>
}


// {/*				<Field name="username"
// 					label={username}
// 					required
// 					validate={required(errorMessages)}
// 					autoComplete="username"
// 					helpText={usernameHelpText}
// 					component={FloatingFormGroup}
// 					disabled={busy}
// 				/>*/}
// {/*				<FloatingFormGroup name="username"
// 		            label={username}
// 		            required
// 		            autoComplete="username"
// 		            helpText={usernameHelpText}
// 		            disabled={busy}
// 		          />*/}

// {/*				<Field name="email"
// 					label={email}
// 					type="email"
// 					required
// 					validate={composeValidators(required(errorMessages),
// 						isEmail(errorMessages))}
// 					autoComplete="email"
// 					component={FloatingFormGroup}
// 					disabled={busy}
// 				/>*/}
// {/*				<FloatingFormGroup name="email"
// 		            label={email}
// 		            type='email'
// 		            required
// 		            autoComplete="email"
// 		            disabled={busy}
// 		        />*/}

// {/*				<FloatingFormGroup name="first_name"
// 					label={first_name}
// 					autoComplete="first_name"
// 					disabled={busy}
// 				/>*/}
// {/*				<FloatingFormGroup name="last_name"
// 					label={last_name}
// 					autoComplete="last_name"
// 				    disabled={busy}
// 				/>*/}
// {/*				<FloatingFormGroup name="password1"
// 					label={password1}
// 					type="password"
// 					required
// 					autoComplete="new-password"
// 					helpText={password1HelpText}
// 					disabled={busy}
// 				/>*/}
// {/*				<FloatingFormGroup name="password2"
// 					label={password2}
// 					type="password"
// 					required
// 					autoComplete="new-password"
// 					helpText={password2HelpText}
// 					disabled={busy}
// 				/>*/}
