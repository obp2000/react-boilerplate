'use client'

import { errorMessage } from '@/error/client'
import { toastError } from '@/notifications/toastError'
import { toastSuccess } from '@/notifications/toastSuccess'
import { baseUrl } from '@/services/config'
import { User } from '@prisma/client'
import {
	compressToEncodedURIComponent,
	decompressFromEncodedURIComponent
} from "lz-string"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { parseCookies, setCookie, destroyCookie } from "nookies"
import type { TransitionStartFunction } from 'react'
import type { LoginValues } from './LoginForm'
import type { RegisterValues } from './RegisterForm'

export const _encodeCompressed = (data: any) =>
	compressToEncodedURIComponent(JSON.stringify(data))

export const setAuth = (auth: { accessToken: string | null, isAuthenticated: boolean }) =>
	setCookie(undefined, 'auth', auth as unknown as string, {
		encode: _encodeCompressed,
		httpOnly: false,
	})

export const setUser = (user: User) =>
	setCookie(undefined, 'user', user as unknown as string, {
		encode: _encodeCompressed,
		httpOnly: false,
	})

type AuthProps = Pick<AppRouterInstance, 'refresh' | 'replace'> & {
	values: RegisterValues | LoginValues
	url: string
	message: string
	labels: Record<string, string>
	startTransition: TransitionStartFunction
	lng: string
}

export const authAction = async ({
	values,
	url,
	refresh,
	replace,
	message,
	labels,
	startTransition,
	lng,
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
		setUser(user as User)
		startTransition(() => {
			replace(`/${lng}/user`)
			refresh()
		})
		toastSuccess(message)
	} else {
		// console.log('res ', res)
		const errorMessageText = await errorMessage(res)
		toastError(labels[errorMessageText])
	}
}

export const signOutAction = async ({
	refresh,
	replace,
	message,
	startTransition,
	lng,
}: Pick<AppRouterInstance, 'refresh' | 'replace'> &
	{
	message: string
	startTransition: TransitionStartFunction
	lng: string
	}
) => {
	destroyCookie(undefined, 'auth')
	destroyCookie(undefined, 'user')
	startTransition(() => {
		replace(`/${lng}`)
		refresh()
	})
	toastSuccess(message)
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
