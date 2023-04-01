import type { HttpError } from 'http-errors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { fallbackLng } from '@/app/i18n/settings'
import { getDictionary } from '@/app/i18n/dictionaries'

export default async function handle(
	{ method, query }: NextApiRequest,
	{ setHeader, status }: NextApiResponse
) {
	if (method === 'POST') {
		const lng = String(query.lng || fallbackLng)
		const { auth } = await getDictionary(lng)
		try {
			return setHeader("set-cookie",
				[`auth= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT`,
					`user= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT`]
			).status(200).json({ message: auth.successfulLogout })
		}
		catch (e) {
			const { statusCode, message } = e as HttpError
			return status(statusCode).
				json({ message: auth[message as keyof typeof auth] || message })
		}
	} else {
		throw new Error(
			`The HTTP ${method} method is not supported at this route.`
		)
	}
}
