import type { HttpError } from 'http-errors'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			res.setHeader("set-cookie",
				[`auth= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT`,
				 `user= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT`])
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
