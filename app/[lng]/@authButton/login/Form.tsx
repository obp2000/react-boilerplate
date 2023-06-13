import Button from '@/app/components/Button'
import { toastError } from '@/app/components/toast'
import type { Translation } from '@/app/i18n/dictionaries'
import { loginStruct } from '@/app/user/struct'
import { errorText } from '@/app/_objects/formHelpers'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { signIn, SignInOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
	useCallback,
	type TransitionStartFunction
} from 'react'
import {
	Controller,
	useForm,
	type FieldError
} from "react-hook-form"

export default function Form({
	labels: {
		name,
		password,
		login,
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
		control,
		handleSubmit,
		formState: {
			errors: {
				name: nameError,
				password: passwordError,
			},
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
		console.log('auth res ', res)
		if (res?.error) {
			toastError(res.error)
		} else {
			back()
			refresh()
		}
	}, [refresh])
	const onSubmit = useCallback(() => {
		handleSubmit(onSubmitLogin)()
	}, [handleSubmit, onSubmitLogin])
	return <>
		<Controller name="name"
			control={control}
			render={({ field }) => <TextField {...field}
				id="name"
				label={`${name} *`}
				autoComplete="name"
				variant="outlined"
				size="small"
				disabled={busy}
				error={!!nameError}
				helperText={errorText(errorMessages, nameError as FieldError)}
			/>}
		/>
		<Controller name="password"
			control={control}
			render={({ field }) => <TextField {...field}
				type='password'
				id="password"
				label={`${password} *`}
				autoComplete="current-password"
				variant="outlined"
				size="small"
				disabled={busy}
				error={!!passwordError}
				helperText={errorText(errorMessages, passwordError as FieldError)}
			/>}
		/>
		<Button
			aria-label={login}
			disabled={busy}
			onClick={() => startTransition(onSubmit)}
		>
			{login}
		</Button>
	</>
}
