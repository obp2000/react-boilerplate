import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import TextField from '@mui/material/TextField'
import clsx from 'clsx'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useTransition } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Login } from './login'
import defaultValues from './login.json'
import { useAuthAction } from './hooks'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import type { LoginValues } from '@/interfaces/users'
import Stack from '@/app/useClient/Stack'

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
	const [isPending, startTransition] = useTransition()
	const [success, setSuccess] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const onSubmit = useAuthAction({
		url: '/login',
		labels: labels as Translation['auth'],
		startTransition,
		lng,
		setModal,
		setSuccess,
		setErrorMessage,
	})
	const {
		control,
		handleSubmit,
		formState: {
			errors,
			isValidating,
			isSubmitting,
			// isSubmitSuccessful,
		}
	} = useForm<LoginValues>({
		defaultValues,
		resolver: superstructResolver(Login)
	})
	const busy = isSubmitting || isPending
	return <form onSubmit={handleSubmit(onSubmit)}>
		<Stack sx={{ mt: 1, gap: 2 }}>
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
		</Stack>
		<Snackbar open={success || !!errorMessage} autoHideDuration={3000}>
			<Alert severity={success ? "success" : "error"} elevation={6}
				variant="filled" sx={{ width: '100%' }}>
				{success ? successfulLogin : errorMessage}
			</Alert>
		</Snackbar>
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
