import { login } from '@/services/auth'
import type { HttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateLogin } from './validators'

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const data = validateLogin(req)
		try {
			const accessTokenAndUser = await login(data)
			res.status(200).json(accessTokenAndUser)
		}
		catch (e) {
			const { statusCode, message: detail } = e as HttpError
			res.status(statusCode).json({ detail })
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		)
	}
}
