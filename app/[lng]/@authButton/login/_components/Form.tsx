import Button from '@/app/components/Button'
import { toastError } from '@/app/components/toast'
import type { Translation } from '@/app/i18n/dictionaries'
import { loginStruct } from '@/app/user/struct'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { signIn, SignInOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
	useCallback,
	type TransitionStartFunction
} from 'react'
import { useForm } from "react-hook-form"
import Name from './Name'
import Password from './Password'

export default function Form({
	labels: {
		login,
		...labels
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
			errors,
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
		console.log('auth res ', res)
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
		<Name {...{
			register,
			labels,
			busy,
			errorMessages,
			errors,
		}} />
		<Password {...{
			register,
			labels,
			busy,
			errorMessages,
			errors,
		}} />
		<Button
			aria-label={login}
			disabled={busy || !isDirty || !isValid}
			onClick={() => startTransition(onSubmit)}
		>
			{login}
		</Button>
	</>
}
