'use client'

import { baseUrl } from '@/services/config'
import { toastSuccess, toastError } from '@/notifications/toast'
import type { Customer } from '@/interfaces/customers'
import type { Product } from '@/interfaces/products'
import type { Order } from '@/interfaces/orders'
// import type { NonFieldErrors } from '@/interfaces/errors'
import useSWR from 'swr'
import { transformOptionsResponse } from './helpers'
import { compressToEncodedURIComponent } from "lz-string"
import { setCookie } from "nookies"
import type {
	Login,
	LoginFormValues,
	Register,
	RegisterFormValues,
	SignOut
} from '@/interfaces/auth'
import { objectToFormData } from 'object-to-formdata'
// import type { SetState } from '@/interfaces/auth'
// import { useRouter } from 'next/navigation'

const errorMessage = async (res: Response): Promise<string> => {
	const json = await res.json()
	return (json?.non_field_errors && json.non_field_errors[0]) ||
		json?.detail || res.statusText
}

export const mutateObject = async (
	id: string | undefined,
	values: Customer | Product | Order,
	indexUrl: string,
	accessToken: string,
	message: string | undefined,
	refresh: () => void,
	push: (arg0: string) => void,
	contentType: string = 'application/json'
) => {
	let options: RequestInit = {
		method: id ? 'PUT' : 'POST',
		body: contentType === 'application/json'
		? JSON.stringify(values)
		: objectToFormData(values),
	}
	const headers = new Headers()
	if (accessToken) {
		headers.append('Authorization', `Token ${accessToken}`)
	}
	if (contentType === 'application/json') {
		headers.append('Content-Type', contentType)
	}
	options.headers = headers
	const mutatePath = id ? `${id}/` : 'new'
	const res = await fetch(`${baseUrl}${indexUrl}${mutatePath}`, options)
	if (res.ok) {
		toastSuccess(message)
		push(indexUrl)
		refresh()
	} else {
		toastError(await errorMessage(res))
		// const json = await res.json()
		// if (json?.non_field_errors) {
		// 	toastError(json.non_field_errors[0])
		// } else if (json?.detail) {
		// 	toastError(json.detail)
		// } else {
		// 	toastError(res.statusText)
		// }
	}
}

export const deleteObject = async (
	{ id }: Customer | Product | Order,
	indexUrl: string,
	accessToken: string,
	message: string | undefined,
	refresh: () => void
) => {
	let options: RequestInit = {
		method: 'DELETE',
	}
	if (accessToken) {
		const headers = new Headers()
		headers.append('Authorization', `Token ${accessToken}`)
		options.headers = headers
	}
	const res = await fetch(`${baseUrl}${indexUrl}${id}`, options)
	if (res.ok) {
		toastSuccess(message)
		refresh()
	} else {
		toastError(await errorMessage(res))
	}
}

const optionsFetcher = (url: string) => {
	let reqOptions: RequestInit = {
		method: 'OPTIONS',
	}
	return fetch(`${baseUrl}${url}`, reqOptions).then(res => res.json())
}

export const useOptions = (url: string | null) => {
	const { data, error } = useSWR(url, optionsFetcher)
	return {
		...transformOptionsResponse(data),
		isLoading: !error && !data,
		isError: error
	}
}

const _encodeCompressed = (auth: any) =>
	compressToEncodedURIComponent(JSON.stringify(auth))

export const setAuth = (auth: any) =>
	setCookie(undefined, 'auth', auth, {
		encode: _encodeCompressed,
		httpOnly: false,
	})

export const authAction = async (
	values: LoginFormValues | RegisterFormValues,
	url: string,
	// setModal: SetState,
	refresh: () => void
) => {
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
		setAuth({
			accessToken: key,
			isAuthenticated: true,
		})
		toastSuccess(message)
		// setModal(false)
		refresh()
	} else {
		toastError(await errorMessage(res))
		// const json = await res.json()
		// if (json?.non_field_errors) {
		// 	toastError(json?.non_field_errors[0])
		// } else {
		// 	toastError(res.statusText)
		// }
	}
}

export const signOutAction = async (
	// url: string,
	refresh: () => void,
	// push: (arg0: string) => void
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
		toastSuccess(detail)
		refresh()
	} else {
		toastError(await errorMessage(res))
	}
}
