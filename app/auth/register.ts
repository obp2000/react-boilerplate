import { validate as validateEmail } from 'isemail'
import { object, refine, string, nonempty, optional } from 'superstruct'

const RegisterBase = object({
	username: nonempty(string()),
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

export const Register = refine(RegisterBase, 'PasswordsEqual',
	({ password1, password2 }) => {
		if (password1 === password2) {
			return true
		}
		return 'password_mismatch'

})

// export function validate({ body }: NextApiRequest) {
// 	const data = create(body, Register)
// 	return data
// }