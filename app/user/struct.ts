import { validate as validateEmail } from 'isemail'
import { object, refine, string, nonempty, optional, any, boolean, define } from 'superstruct'

const registerBase = object({
	name: nonempty(string()),
	email: refine(string(), 'email', (input) => validateEmail(input)),
	password1: refine(string(), 'MinSize', (password1) => {
		if (password1 && password1.length >= 8) {
			return true
		}
		return 'short_password'
	}),
	password2: string(),
	firstName: optional(string()),
	lastName: optional(string()),
})

export const struct = refine(registerBase, 'PasswordsEqual',
	({ password1, password2 }) => {
		if (password1 === password2) {
			return true
		}
		return 'password_mismatch'
})

export const loginStruct = object({
	name: nonempty(string()),
	password: nonempty(string()),
	redirect: any(),
	csrfToken: any(),
	callbackUrl: any(),
	json: any(),
})

export const Verified = define('Verified', (value) => !!value)

// const verifiedStruct = object({
// 	verified: boolean(),
// })

// export const login = refine(verifiedStruct, 'PasswordsVerified',
// 	({ verified }) => {
// 		if (verified) {
// 			return true
// 		}
// 		return 'user_or_password_not_valid'
// })