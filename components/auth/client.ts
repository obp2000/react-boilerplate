'use client'

import type {
    Login,
    LoginFormValues,
    Register,
    RegisterFormValues,
    SignOut
} from '@/interfaces/auth'
import { User } from '@/interfaces/users'
import { toastError, toastSuccess } from '@/notifications/toast'
import { errorMessage } from '@/services/api/client'
import { baseUrl } from '@/services/config'
import { compressToEncodedURIComponent } from "lz-string"
import { setCookie } from "nookies"

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

type AuthProps = {
	values: LoginFormValues | RegisterFormValues
	url: string
	refresh: () => void
	// push: (href: string, options?: {forceOptimisticNavigation?: boolean}) => void
	// pathname: string | null
	replace: (href: string) => void
}

export async function getUser(accessToken: string) {
	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	headers.append('Authorization', `Token ${accessToken}`)
	let reqOptions: RequestInit = {
		headers,
	}
	const res = await fetch(`${baseUrl}/user/`, reqOptions)
	if (res.ok) {
		const user: User = await res.json()
		setUser(user)
	} else {
		toastError(await errorMessage(res))
	}
}

export const authAction = async ({ values, url,	refresh, replace }: AuthProps) => {
	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	let reqOptions: RequestInit = {
		method: 'POST',
		body: JSON.stringify(values),
		headers,
	}
	const res = await fetch(`${baseUrl}${url}`, reqOptions)
	if (res.ok) {
		const { key, message }: Login | Register = await res.json()
		getUser(key)
		setAuth({
			accessToken: key,
			isAuthenticated: true,
		})
		toastSuccess(message)
		replace('/user/')
		// refresh()
	} else {
		toastError(await errorMessage(res))
	}
}

export const signOutAction = async (
	refresh: () => void,
) => {
	let reqOptions: RequestInit = {
		method: 'POST',
	}
	const res = await fetch(`${baseUrl}/logout/`, reqOptions)
	if (res.ok) {
		const { detail }: SignOut = await res.json()
		setAuth({
			accessToken: null,
			isAuthenticated: false,
		})
		setUser(undefined)
		toastSuccess(detail)
		refresh()
	} else {
		toastError(await errorMessage(res))
	}
}
