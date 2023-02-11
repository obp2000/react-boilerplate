import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/client/Button'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { isDisabled } from '@/submitButton/hooks'
import {
	composeValidators,
	isEmail,
	required,
	shortPassword,
	validatePasswordConfirmation
} from "@/validators/validators"
import { Prisma } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Field, Form } from 'react-final-form'
import { authAction } from './client'

export type RegisterValues = Pick<Prisma.UserCreateArgs['data'],
	'username' | 'email' | 'first_name' | 'last_name'> &
{ password1: string, password2: string }

export default function RegisterForm({
	lng,
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
			lng
		})
	return <Form {...{
		name: 'Register',
		onSubmit,
		validate: validatePasswordConfirmation(errorMessages),
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
					helpText={usernameHelpText}
					component={FloatingFormGroup}
					disabled={busy}
				/>
				<Field name="email"
					label={email}
					type="email"
					required
					validate={composeValidators(required(errorMessages),
						isEmail(errorMessages))}
					autoComplete="email"
					component={FloatingFormGroup}
					disabled={busy}
				/>
				<Field name="first_name"
					label={first_name}
					autoComplete="first_name"
					component={FloatingFormGroup}
					disabled={busy}
				/>
				<Field name="last_name"
					label={last_name}
					autoComplete="last_name"
					component={FloatingFormGroup}
				    disabled={busy}
				/>
				<Field name="password1"
					label={password1}
					type="password"
					required
					validate={composeValidators(required(errorMessages),
						shortPassword(errorMessages))}
					autoComplete="new-password"
					helpText={password1HelpText}
					component={FloatingFormGroup}
					disabled={busy}
				/>
				<Field name="password2"
					label={password2}
					type="password"
					required
					validate={required(errorMessages)}
					autoComplete="new-password"
					helpText={password2HelpText}
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