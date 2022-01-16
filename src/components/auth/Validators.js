import {
	notBlank,
	validEmail,
	passwordLength,
	validPasswordConfirmation
} from '../Shared/Validators'

export const validateLogin = values => notBlank(values, ['username', 'password'])

export const validateRegister = values =>
	({ ...notBlank(values, ['username', 'email', 'password1', 'password2']),
		...validEmail(values, 'email'),
		...passwordLength(values, 'password1'),
		...validPasswordConfirmation(values, 'password1', 'password2')
	})

// export const validateRegister = values => notBlank(values, ['username', 'password'])