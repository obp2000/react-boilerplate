import {
	notBlank,
	validEmail,
	passwordLength,
	validPasswordConfirmation
} from '../Shared/Validators'

export const validateLogin = values => notBlank(values, ['username', 'password'])

export const validateRegister = values =>
	({ ...notBlank(values, ['username', 'email', 'password']),
		...validEmail(values, 'email'),
		...passwordLength(values, 'password'),
		...validPasswordConfirmation(values, 'password', 'passwordConfirmation')
	})