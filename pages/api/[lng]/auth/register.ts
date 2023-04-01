import { Prisma } from '@prisma/client'
import { Register } from '@/app/auth/register'
import { signAccessToken } from '@/services/jwt'
import prisma from '@/services/prisma'
import { hashSync } from 'bcryptjs'
import { Conflict, MethodNotAllowed, type HttpError } from 'http-errors'
import { compressToEncodedURIComponent } from 'lz-string'
import { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'superstruct'
import { fallbackLng } from '@/app/i18n/settings'
import { getDictionary } from '@/app/i18n/dictionaries'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export default async function handle(
	{ method, body, query }: NextApiRequest,
	{ setHeader, status }: NextApiResponse
) {
	if (method === 'POST') {
		const { password1, password2, ...input } = create(body, Register)
		const lng = String(query.lng || fallbackLng)
		const { auth } = await getDictionary(lng)
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
			let user = undefined
			try {
				user = await prisma.user.create({ data })
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					if (e.code === 'P2002') {
						throw Conflict('usernameAlreadyExists')
					}
				}
				throw e
			}
			const accessToken = await signAccessToken(user, String(accessTokenSecret))
			const authComp = compressToEncodedURIComponent(
				JSON.stringify({ isAuthenticated: true, accessToken }))
			const userComp = compressToEncodedURIComponent(JSON.stringify(user))
			return setHeader("set-cookie",
				[`auth=${authComp}; path=/;`, `user=${userComp}; path=/;`]
			).status(200).json({ message: auth.successfulRegister })
		} catch (e) {
			const { statusCode, message } = e as HttpError
			return status(statusCode).
				json({ message: auth[message as keyof typeof auth] })
		}
	} else {
		throw MethodNotAllowed(`The HTTP ${method} method is not supported at this route.`)
	}
}

// try {
// 	await client.user.create({ data: { email: 'alreadyexisting@mail.com' } })
// } catch (e) {
// 	if (e instanceof Prisma.PrismaClientKnownRequestError) {
// 		// The .code property can be accessed in a type-safe manner
// 		if (e.code === 'P2002') {
// 			console.log(
// 				'There is a unique constraint violation, a new user cannot be created with this email'
// 			)
// 		}
// 	}
// 	throw e
// }




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
