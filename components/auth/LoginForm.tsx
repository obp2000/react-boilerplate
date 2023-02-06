import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/client/Button'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { isDisabled } from '@/submitButton/hooks'
import {
	required
} from "@/validators/validators"
import { Prisma } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Field, Form } from 'react-final-form'
import { authAction } from './client'

export type LoginValues = Pick<Prisma.UserCreateArgs['data'],
	'username' | 'password'>

export default function LoginForm({
	lng,
	labels: {
		username,
		password,
		login,
		successfulLogin,
		...labels
	},
	errorMessages
}: {
	lng: string
	labels: Translation['auth']
	errorMessages: Translation['errorMessages']
}) {
	const { refresh, replace } = useRouter()
	const [isPending, startTransition] = useTransition()
	const onSubmit = (values: LoginValues) =>
		authAction({
			values,
			url: '/login',
			refresh,
			replace,
			message: successfulLogin,
			labels,
			startTransition,
			lng,
		})
	return <Form {...{
		name: 'Login',
		onSubmit,
	}}>
		{({
			handleSubmit,
			submitting,
			...props
		}) => {
			const busy = submitting || isPending
			return <form onSubmit={handleSubmit}
				className={clsx('flex flex-col gap-3', { 'opacity-70': busy })}>
				<Field name="username"
					label={username}
					required
					validate={required(errorMessages)}
					autoComplete="username"
					component={FloatingFormGroup}
					disabled={busy}
				/>
				<Field name="password"
					label={password}
					type="password"
					required
					validate={required(errorMessages)}
					autoComplete="current-password"
					component={FloatingFormGroup}
					disabled={busy}
				/>
				<Button
					type='submit'
					size='sm'
					aria-labelledby={login}
					disabled={isDisabled(props) || busy}>
					{login}
				</Button>
			</form>
		}}
	</Form>
}