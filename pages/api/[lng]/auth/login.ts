import { type HttpError, NotFound, Unauthorized } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { compressToEncodedURIComponent } from "lz-string"
import { Login } from '@/app/auth/login'
import { assert } from 'superstruct'
import prisma from '@/services/prisma'
import { compareSync } from 'bcryptjs'
import { signAccessToken } from '@/services/jwt'
import { fallbackLng } from '@/app/i18n/settings'
import { getDictionary } from '@/app/i18n/dictionaries'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export default async function handle(
	{ method, body, query }: NextApiRequest,
	{ setHeader, status }: NextApiResponse
) {
	if (method === 'POST') {
		assert(body, Login)
		const lng = String(query.lng || fallbackLng)
		const { auth } = await getDictionary(lng)
		try {
			const user = await prisma.user.findUnique({
				where: {
					username: body.username
				}
			})
			if (!user) {
				throw NotFound('usernameOrPasswordNotValid')
			}
			const checkPassword = compareSync(body.password, user.password)
			if (!checkPassword) {
				throw Unauthorized('usernameOrPasswordNotValid')
			}
			const accessToken = await signAccessToken(user, String(accessTokenSecret))
			const authComp = compressToEncodedURIComponent(
				JSON.stringify({ isAuthenticated: true, accessToken }))
			const userComp = compressToEncodedURIComponent(JSON.stringify(user))
			return setHeader("set-cookie",
				[`auth=${authComp}; path=/`,
				`user=${userComp}; path=/`]
			).status(200).json({ message: auth.successfulLogin })
		}
		catch (e) {
			const { statusCode, message } = e as HttpError
			return status(statusCode).
				json({ message: auth[message as keyof typeof auth] })
		}
	} else {
		throw new Error(
			`The HTTP ${method} method is not supported at this route.`
		)
	}
}
