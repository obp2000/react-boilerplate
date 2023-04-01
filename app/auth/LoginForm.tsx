import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from "react-hook-form"
import { Login } from './login'
import defaultValues from './login.json'
import Stack from '@/app/useClient/Stack'
import type { LoginValues } from '@/interfaces/users'

export default function LoginForm({
	labels: {
		username,
		password,
		login,
	},
	errorMessages,
	onSubmit,
	isPending
}: {
	labels: Translation['auth']
	errorMessages: Translation['errorMessages']
	onSubmit: (values: LoginValues) => Promise<void>
	isPending: boolean
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
	</form>
}
