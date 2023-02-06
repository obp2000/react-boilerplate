import { register } from '@/services/auth'
import { hashSync } from 'bcryptjs'
import type { HttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateRegister } from './validators'

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { password1, password2, ...input } = validateRegister(req)
		const data = {
			...input,
			last_login: new Date(),
			date_joined: new Date(),
			is_superuser: false,
			is_staff: false,
			is_active: true,
			password: hashSync(password1, 8),
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
			`The HTTP ${req.method} method is not supported at this route.`
		)
	}
}


		// const {
		// 	first_name = '',
		// 	last_name = '',
		// 	password,
		// 	...rest
		// } = req.body
		// let input = { ...rest, first_name, last_name }
		// assert(input, ValidateRegister)


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
