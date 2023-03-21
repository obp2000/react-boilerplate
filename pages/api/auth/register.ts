import { register } from '@/services/auth'
import { hashSync } from 'bcryptjs'
import type { HttpError } from 'http-errors'
import { compressToEncodedURIComponent } from 'lz-string'
import { NextApiRequest, NextApiResponse } from 'next'
import { Register } from '@/app/auth/register'
import { create } from 'superstruct'

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { password1, password2, ...input } = create(req.body, Register)
		const data = {
			...input,
			lastLogin: new Date(),
			dateJoined: new Date(),
			isSuperuser: false,
			isStaff: false,
			isActive: true,
			password: hashSync(password1, 8),
		}
		try {
			const { accessToken, user } = await register(data)
			const auth = compressToEncodedURIComponent(
				JSON.stringify({ isAuthenticated: true, accessToken }))
			const userComp = compressToEncodedURIComponent(JSON.stringify(user))
			res.setHeader("set-cookie",
				[`auth=${auth}; path=/;`, `user=${userComp}; path=/;`])
			res.status(200).json(undefined)
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
