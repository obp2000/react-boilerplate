import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from "react-hook-form"
import { loginStruct } from './struct'
import Stack from '@/app/useClient/Stack'
import type { LoginValues } from '@/interfaces/users'
import {
	type Dispatch,
	useCallback,
	type SetStateAction,
	type TransitionStartFunction
} from 'react'
import { toastError, toastSuccess } from '@/app/components/toast'
import { useRouter } from 'next/navigation'
import { signIn, type SignInOptions } from 'next-auth/react'

export default function LoginForm({
	labels: {
		name,
		password,
		login,
		successfulLogin,
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
			// isSubmitSuccessful,
		}
	} = useForm<LoginValues>({
		resolver: superstructResolver(loginStruct)
	})
	const { refresh } = useRouter()
	const onSubmit = async (values: SignInOptions) => {
		const res = await signIn('credentials', {
			...values,
			redirect: false,
		})
		if (res?.ok) {
			toastSuccess(successfulLogin)
			setModal(false)
			refresh()
		}
		if (res?.error) {
			// console.log('res.error dddd', res.error)
			toastError(auth[res.error as keyof typeof auth] || res.error)
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
	return <Stack sx={{ mt: 1, gap: 2 }}>
		<Controller name="name"
			control={control}
			render={({ field }) => <TextField {...field}
				id="name"
				label={`${name} *`}
				autoComplete="name"
				variant="outlined"
				size="small"
				disabled={busy}
				error={errors?.name ? true : undefined}
				helperText={errors?.name
					? errorMessages[errors.name.message as keyof Translation['errorMessages']]
					: undefined}
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
				error={errors?.password ? true : undefined}
				helperText={errors?.password
					? errorMessages[errors.password.message as keyof Translation['errorMessages']]
					: undefined}
			/>}
		/>
		<Button
			size='small'
			variant='outlined'
			aria-label={login}
			disabled={busy}
			onClick={() => startTransition(onSubmitButtonClick)}
		>
			{login}
		</Button>
	</Stack>
}
