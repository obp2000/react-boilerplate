import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { signIn, SignInOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from "react-hook-form"

import { errorText } from '@/app/_objects/formHelpers'
import Button from '@/app/components/Button'
import { toastError } from '@/app/components/toast'
import { loginStruct } from '@/app/user/struct'

import type { Translation } from '@/app/i18n/dictionaries'
import type { TransitionStartFunction } from 'react'

export default function Form({
	labels: {
		login,
		name,
		password,
	},
	errorMessages,
	busy,
	startTransition,
	lng,
}: {
	labels: {
		name: string
		password: string
		login: string
	}
	errorMessages: Translation['errorMessages']
	busy: boolean
	startTransition: TransitionStartFunction
	lng: string
}) {
	const {
		register,
		handleSubmit,
		formState: {
			errors: {
				name: nameError,
				password: passwordError,
			},
			isDirty,
			isValid,
		}
	} = useForm<SignInOptions>({
		resolver: superstructResolver(loginStruct)
	})
	const { refresh, back } = useRouter()
	const onSubmitLogin = useCallback(async (values: SignInOptions) => {
		const res = await signIn('credentials', {
			...values,
			redirect: false,
		}, { lng })
		// console.log('auth res ', res)
		if (res?.error) {
			toastError(res.error)
		} else {
			back()
			refresh()
		}
	}, [refresh, back, lng])
	const onSubmit = useCallback(() => {
		handleSubmit(onSubmitLogin)()
	}, [handleSubmit, onSubmitLogin])
	return <>
		<TextField {...register('name')}
			label={`${name} *`}
			autoComplete="name"
			variant="outlined"
			size="small"
			disabled={busy}
			error={!!nameError}
			helperText={errorText(errorMessages, nameError)}
			aria-invalid={nameError ? "true" : "false"}
		/>
		<TextField {...register('password')}
			type='password'
			label={`${password} *`}
			autoComplete="current-password"
			variant="outlined"
			size="small"
			disabled={busy}
			error={!!passwordError}
			helperText={errorText(errorMessages, passwordError)}
			aria-invalid={passwordError ? "true" : "false"}
		/>
		<Button
			aria-label={login}
			disabled={busy || !isDirty || !isValid}
			onClick={() => startTransition(onSubmit)}
		>
			{login}
		</Button>
	</>
}
