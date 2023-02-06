import { validate as validateEmail } from 'isemail'
import type { NextApiRequest } from 'next'
import {
	assert, object, refine, size,
	string
} from 'superstruct'

const Register = object({
	username: size(string(), 1, 255),
	email: refine(string(), 'email', (input) => validateEmail(input)),
	password1: size(string(), 8, 255),
	password2: string(),
	first_name: string(),
	last_name: string(),
})

const ValidatePasswordsEqual = refine(Register, 'PasswordsEqual',
	({ password1, password2 }) => password1 === password2)

const Login = object({
	username: size(string(), 1, 255),
	password: size(string(), 1, 255),
})

export function validateRegister({
	body: {
		first_name = '',
		last_name = '',
		password,
		...rest
	} }: NextApiRequest) {
	const data = { ...rest, first_name, last_name }
	assert(data, ValidatePasswordsEqual)
	return data
}

export function validateLogin({ body }: NextApiRequest) {
	assert(body, Login)
	return body
}
