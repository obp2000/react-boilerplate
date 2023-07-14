import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { signIn, SignInOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm, Form } from "react-hook-form"

import { errorText } from '@/app/_objects/formHelpers'
import Button from '@/app/components/Button'
import { toastError } from '@/app/components/toast'
import { struct } from './struct'

import type { Translation } from '@/app/i18n/dictionaries'
import type { TransitionStartFunction } from 'react'

export default function FormComp({
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
		control,
		formState: {
			errors: {
				name: nameError,
				password: passwordError,
			},
			isDirty,
			isValid,
		}
	} = useForm<SignInOptions>({
		resolver: superstructResolver(struct)
	})
	const { refresh, back } = useRouter()
	const onSubmit = useCallback(({ data }:
		{ data: SignInOptions }) => {
		startTransition(async () => {
			const { error } = await signIn('credentials',
				{
					...data,
					redirect: false,
				},
				{ lng }) || {}
			if (error) {
				toastError(error)
			} else {
				back()
				refresh()
			}
		})
	}, [startTransition, lng, back, refresh])
	return <Form
		control={control}
		onSubmit={onSubmit}
		className='flex flex-col mt-1 gap-2'
	>
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
			type='submit'
			aria-label={login}
			disabled={busy || !isDirty || !isValid}
		>
			{login}
		</Button>
	</Form>
}
