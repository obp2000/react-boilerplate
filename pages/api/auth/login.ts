import { login } from '@/services/auth'
import type { HttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { compressToEncodedURIComponent } from "lz-string"
import { Login } from '@/app/auth/login'
import { assert } from 'superstruct'

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		assert(req.body, Login)
		try {
			const { accessToken, user } = await login(req.body)
			const auth = compressToEncodedURIComponent(
				JSON.stringify({ isAuthenticated: true, accessToken }))
			const userComp = compressToEncodedURIComponent(JSON.stringify(user))
			res.setHeader("set-cookie",
				[`auth=${auth}; path=/`,
				 `user=${userComp}; path=/`])
			res.status(200).json(undefined)
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
