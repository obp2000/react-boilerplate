'use client'

import { errorMessage } from '@/app/error/client'
import { toastError } from '@/app/notifications/toastError'
import { toastSuccess } from '@/app/notifications/toastSuccess'
import {
    decompressFromEncodedURIComponent
} from "lz-string"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { parseCookies } from "nookies"
import type { Dispatch, SetStateAction, TransitionStartFunction } from 'react'
import type { LoginValues } from './LoginForm'
import type { RegisterValues } from './RegisterForm'

type AuthProps = Pick<AppRouterInstance, 'replace'> & {
	values: RegisterValues | LoginValues
	url: string
	message: string
	labels: Record<string, string>
	startTransition: TransitionStartFunction
	lng: string,
	setModal: Dispatch<SetStateAction<boolean>>
}

export async function authAction({
	values,
	url,
	replace,
	message,
	labels,
	startTransition,
	lng,
	setModal,
}: AuthProps) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth${url}`, {
		method: 'POST',
		body: JSON.stringify(values),
		headers: new Headers({ 'Content-Type': 'application/json' }),
	})
	if (res.ok) {
		// const { accessToken, user } = await res.json()
		// setAuth({
		// 	accessToken,
		// 	isAuthenticated: true,
		// })
		// setUser(user as User)
		startTransition(() => {
			setModal(false)
			replace(`/${lng}/user`)
		})
		toastSuccess(message)
	} else {
		const errorMessageText = await errorMessage(res)
		toastError(labels[errorMessageText])
	}
}

// export async function signOutAction({
// 	refresh,
// 	replace,
// 	labels,
// 	startTransition,
// 	lng,
// }: Pick<AppRouterInstance, 'refresh' | 'replace'> &
// 	{
// 		labels: Record<string, string>
// 		startTransition: TransitionStartFunction
// 		lng: string
// 	}
// ) {
// 	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
// 		method: 'POST',
// 		headers: new Headers({ 'Content-Type': 'application/json' }),
// 	})
// 	if (res.ok) {
// 		startTransition(() => {
// 			replace(`/${lng}`)
// 			refresh()
// 		})
// 		toastSuccess(labels?.successfulLogout)
// 	} else {
// 		const errorMessageText = await errorMessage(res)
// 		toastError(errorMessageText)
// 	}
// }

export function getAuth() {
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

export function getUser() {
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


// export const _encodeCompressed = (data: any) =>
// 	compressToEncodedURIComponent(JSON.stringify(data))

// export const setAuth = (auth: { accessToken: string | null, isAuthenticated: boolean }) =>
// 	setCookie(undefined, 'auth', auth as unknown as string, {
// 		encode: _encodeCompressed,
// 		httpOnly: false,
// 	})

// export const setUser = (user: User) =>
// 	setCookie(undefined, 'user', user as unknown as string, {
// 		encode: _encodeCompressed,
// 		httpOnly: false,
// 	})
