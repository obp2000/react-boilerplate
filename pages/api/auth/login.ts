import { login } from '@/services/auth'
import type { HttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateLogin } from './validators'
import { compressToEncodedURIComponent } from "lz-string"

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const data = validateLogin(req)
		try {
			const { accessToken, user } = await login(data)
			const auth = compressToEncodedURIComponent(
				JSON.stringify({ isAuthenticated: true, accessToken }))
			const userComp = compressToEncodedURIComponent(JSON.stringify(user))
			res.setHeader("set-cookie",
				[`auth=${auth}; path=/`,
				 `user=${userComp}; path=/`])
			// res.setHeader("set-cookie",	[`auth=${auth};`, `user=${userComp};`])
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
