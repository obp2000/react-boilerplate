'use client'

import { errorMessage } from '@/error/client'
import { baseUrl } from '@/services/config'
import { Prisma } from '@prisma/client'
import { TFunction } from 'i18next'
import {
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent
} from "lz-string"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { parseCookies, setCookie } from "nookies"

export const _encodeCompressed = (data: any) =>
	compressToEncodedURIComponent(JSON.stringify(data))

export const setAuth = (auth: any) =>
	setCookie(undefined, 'auth', auth, {
		encode: _encodeCompressed,
		httpOnly: false,
	})

export const setUser = (user: any) =>
	setCookie(undefined, 'user', user, {
		encode: _encodeCompressed,
		httpOnly: false,
	})

type AuthProps = Pick<AppRouterInstance, 'refresh' | 'replace'> & {
	values: Partial<Prisma.UserCreateInput> & { password1?: string, password2?: string }
	url: string
	message: string,
	t: TFunction,
}

export const authAction = async ({
	values,
	url,
	refresh,
	replace,
	message,
	t
}: AuthProps) => {
	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	let reqOptions: RequestInit = {
		method: 'POST',
		body: JSON.stringify(values),
		headers,
	}
	const res = await fetch(`${baseUrl}/auth${url}`, reqOptions)
	if (res.ok) {
		const { accessToken, user } = await res.json()
		setAuth({
			accessToken,
			isAuthenticated: true,
		})
		setUser(user)
		const { toastSuccess } = await import('@/notifications/toastSuccess')
		toastSuccess(message)
		replace('/user/')
		refresh()
	} else {
		const { toastError } = await import('@/notifications/toastError')
		console.log('res ', res)
		toastError(await errorMessage(res, t))
	}
}

export const signOutAction = async ({
	refresh,
	replace,
	message
}: Pick<AppRouterInstance, 'refresh' | 'replace'> & { message: string }) => {
	setAuth({
		accessToken: null,
		isAuthenticated: false,
	})
	setUser(undefined)
	const { toastSuccess } = await import('@/notifications/toastSuccess')
	toastSuccess(message)
	replace('/')
	refresh()
}

export const getAuth = () => {
	let res
	const { auth } = parseCookies()
	if (auth) {
		const decodedAuth = decompressFromEncodedURIComponent(auth)
		if (decodedAuth) {
			res = JSON.parse(decodedAuth)
		}
		// console.log('auth ', JSON.parse(auth))
	}
	return res
}

export const getUser = () => {
	let res
	const { user } = parseCookies()
	if (user) {
		const decodedUser = decompressFromEncodedURIComponent(user)
		if (decodedUser) {
			res = JSON.parse(decodedUser)
		}
	}
	return res
}


// export async function fetchUser(accessToken: string) {
// 	const headers = new Headers()
// 	headers.append('Content-Type', 'application/json')
// 	headers.append('Authorization', `Token ${accessToken}`)
// 	let reqOptions: RequestInit = {
// 		headers,
// 	}
// 	const res = await fetch(`${baseUrl}/user/`, reqOptions)
// 	if (res.ok) {
// 		const user: User = await res.json()
// 		setUser(user)
// 	} else {
// 		const { toastError } = await import('@/notifications/toastError')
// 		toastError(await errorMessage(res))
// 	}
// }

// export const signOutAction = async ({
// 	refresh,
// 	replace,
// 	message
// }: Pick<AppRouterInstance, 'refresh' | 'replace'> & { message: string }) => {
// 	let reqOptions: RequestInit = {
// 		method: 'POST',
// 	}
// 	const res = await fetch(`${baseUrl}/logout/`, reqOptions)
// 	if (res.ok) {
// 		const { detail }: SignOut = await res.json()
// 		setAuth({
// 			accessToken: null,
// 			isAuthenticated: false,
// 		})
// 		setUser(undefined)
// 		const { toastSuccess } = await import('@/notifications/toastSuccess')
// 		toastSuccess(message)
// 		replace('/')
// 		refresh()
// 	} else {
// 		const { toastError } = await import('@/notifications/toastError')
// 		toastError(await errorMessage(res))
// 	}
// }
