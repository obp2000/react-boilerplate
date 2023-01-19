import { login } from '@/services/auth'
import type { HttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import {
	assert,
	object, size,
	string
} from 'superstruct'

export const Login = object({
  username: size(string(), 1, 255),
  password: size(string(), 1, 255),
})

export default async function handle({
	method,
	body,
}: NextApiRequest, res: NextApiResponse) {
	if (method === 'POST') {
		assert(body, Login)
		try {
			const accessTokenAndUser = await login(body)
			res.status(200).json(accessTokenAndUser)
		}
		catch (e) {
			const { statusCode, message: detail } = e as HttpError
			res.status(statusCode).json({ detail })
		}
	} else {
		throw new Error(
			`The HTTP ${method} method is not supported at this route.`
		)
	}
}
