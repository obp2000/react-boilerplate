import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/client/Button'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import TextField from '@mui/material/TextField'
import type { Prisma } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import { useTransition } from 'react'
import { Controller, useForm } from "react-hook-form"
import { authAction } from './client'
import { Login } from './login'
import defaultValues from './login.json'

export type LoginValues = Pick<Prisma.UserCreateArgs['data'],
	'username' | 'password'>

export default function LoginForm({
	lng,
	setModal,
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
	setModal: Dispatch<SetStateAction<boolean>>
	labels: Translation['auth']
	errorMessages: Translation['errorMessages']
}) {
	const { refresh, replace } = useRouter()
	const [isPending, startTransition] = useTransition()
	const onSubmit = (values: LoginValues) =>
		authAction({
			values,
			url: '/login',
			replace,
			message: successfulLogin,
			labels,
			startTransition,
			lng,
			setModal,
		})
	const {
		control,
		handleSubmit,
		formState: {
			errors,
			isValidating,
			isSubmitting
		}
	} = useForm<LoginValues>({
		defaultValues,
		resolver: superstructResolver(Login)
	})
	const busy = isSubmitting || isPending
	return <form onSubmit={handleSubmit(onSubmit)}
		className={clsx('flex flex-col gap-3 pt-1', { 'opacity-70': busy })}>
		<Controller name="username"
			control={control}
			render={({ field }) => <TextField {...field}
				id="username"
				label={`${username} *`}
				autoComplete="username"
				variant="outlined"
				size="small"
				disabled={busy}
				error={errors?.username ? true : undefined}
				helperText={errors?.username
					? errorMessages[errors.username.message as keyof Translation['errorMessages']]
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
			type='submit'
			size='small'
			variant='outlined'
			aria-label={login}
			disabled={busy}
		>
			{login}
		</Button>
	</form>
}


// {/*          <FloatingFormGroup name="username"
//             label={username}
//             required
//             autoComplete="username"
//             disabled={busy}
//           />*/}

// {/*				<Field name="username"
// 					label={username}
// 					required
// 					validate={required(errorMessages)}
// 					autoComplete="username"
// 					component={FloatingFormGroup}
// 					disabled={busy}
// 				/>*/}
// {/*				<Field name="password"
// 					label={password}
// 					type="password"
// 					required
// 					validate={required(errorMessages)}
// 					autoComplete="current-password"
// 					component={FloatingFormGroup}
// 					disabled={busy}
// 				/>*/}
// {/*				<FloatingFormGroup name="password"
//             label={password}
//             type="password"
//             required
//             autoComplete="current-password"
//             disabled={busy}
//         />*/}
