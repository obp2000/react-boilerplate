import {
	blankErrorText,
	invalidEmail,
	shortPassword,
	invalidPasswordConfirmation
} from '../Texts'

export const notBlank = (values, fields) =>
	fields.reduce((errors, field) => {
		if (!values[field]) {
			errors[field] = blankErrorText
		}
		return errors
	}, {})

export const validEmail = (values, field) => {
	const error = {}
	if (values[field] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])) {
		error[field] = invalidEmail
	}
	return error
}

export const passwordLength = (values, field) => {
	const error = {}
	if (values[field] && (values[field].length < 8)) {
		error[field] = shortPassword
	}
	return error
}

export const validPasswordConfirmation = (values, password_field, password_confirmation_field) => {
	const error = {}
	if (values[password_field] != values[password_confirmation_field]) {
		error[password_confirmation_field] = invalidPasswordConfirmation
	}
	return error
}