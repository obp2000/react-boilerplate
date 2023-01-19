import { register } from '@/services/auth'
import type { HttpError } from 'http-errors'
import { validate as validateEmail } from 'isemail'
import { NextApiRequest, NextApiResponse } from 'next'
import {
	assert, object, refine, size,
	string
} from 'superstruct'
import { hashSync } from 'bcryptjs'

export const Register = object({
	username: size(string(), 1, 255),
	email: refine(string(), 'email', (input) => validateEmail(input)),
	password1: size(string(), 8, 255),
	password2: string(),
	first_name: string(),
	last_name: string(),
})

const ValidateRegister = refine(Register, 'PasswordsEqual',
	({ password1, password2 }) => password1 === password2)

export default async function handle({
	method,
	body,
}: NextApiRequest, res: NextApiResponse) {
	if (method === 'POST') {
		const {
			first_name = '',
			last_name = '',
			password,
			...rest
		} = body
		let input = { ...rest, first_name, last_name }
		assert(input, ValidateRegister)
		const data = {
			...input,
			last_login: new Date(),
			date_joined: new Date(),
			is_superuser: false,
			is_staff: false,
			is_active: true,
			password: hashSync(input.password1, 8),
			password1: undefined,
			password2: undefined,
		}
		try {
			const accessTokenAndUser = await register(data)
			res.status(200).json(accessTokenAndUser)
		}
		catch (e) {
			const { statusCode, message: detail } = e as HttpError
			console.log('e ', e)
			res.status(statusCode).json({ detail })
		}
	} else {
		throw new Error(
			`The HTTP ${method} method is not supported at this route.`
		)
	}
}



// const DateRange = refine(
//   object({
//     startDate: number(),
//     endDate: number(),
//   }),
//   'DateRange',
//   (value) => {
//     if (value.startDate < value.endDate) {
//       return true
//     }

//     // Returning a string indicates that validation failed and the provided
//     // string should be used as a custom error message.
//     return (
//       `Expected 'startDate' to be less than 'endDate' on type 'DateRange', ` +
//       `but received ${JSON.stringify(value)}`
//     )
//   }
// )




  // validatedFields: {
  //   notBlank: ['username', 'email', 'password1', 'password2'],
  //   validEmail: 'email',
  //   passwordLength: 'password1',
  //   validPasswordConfirmation: ['password1', 'password2'],
  // },

// UserCreateArgs
