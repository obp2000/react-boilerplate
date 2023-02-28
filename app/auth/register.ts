import { validate as validateEmail } from 'isemail'
import {
	assert,
	object,
	refine,
	size,
	string,
	nonempty,
	optional,
	nullable,
} from 'superstruct'

const RegisterBase = object({
	username: nonempty(string()),
	email: refine(string(), 'email', (input) => validateEmail(input)),
	// password1: size(string(), 8, 255),
	password1: refine(string(), 'MinSize', (password1) => {
		if (password1 && password1.length >= 8) {
			return true
		}
		return 'short_password'
	}),
	password2: string(),
	first_name: optional(nullable(string())),
	last_name: optional(nullable(string())),
})

export const Register = refine(RegisterBase, 'PasswordsEqual',
	({ password1, password2 }) => {
		if (password1 === password2) {
			return true
		}
		return 'password_mismatch'

})
