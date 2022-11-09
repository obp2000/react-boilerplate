import { baseUrl } from '@/services/config'
import { transformOptionsResponse } from './helpers'
// import { getAuth } from '@/auth/server'
import { indexUrl as userIndexUrl } from '@/users/serverConfig'
import { cookies } from 'next/headers'
import { decompressFromEncodedURIComponent } from "lz-string"
// import { headers } from 'next/headers'
// import type { MainContext } from '@/interfaces/options'
import type { ObjectsWithTotals, SearchParams } from '@/interfaces/api'

export const getAuth = () => {
	const nextCookies = cookies()
	// const auth1 = decompressFromEncodedURIComponent(nextCookies.get('auth1') as string)
	// console.log('auth1 ', auth1)
	const auth =
		decompressFromEncodedURIComponent(nextCookies.get('auth') as string)
	const accessToken = auth ? JSON.parse(auth).accessToken : null
	return {
		accessToken,
		isAuthenticated: !!accessToken,
	}
}

export const requestInit = () => {
	let reqInit: RequestInit = {}
	const { accessToken } = getAuth()
	if (accessToken) {
		const headers = new Headers()
		headers.append('Authorization', `Token ${accessToken}`)
		reqInit.headers = headers
	}
	return reqInit
}

export const getObjects = async (
	url: string,
	searchParams: Record<string, string>
): Promise<ObjectsWithTotals> => {
	let params = new URLSearchParams(searchParams).toString()
	if (params) {
		params = `?${params}`
	}
	const options = requestInit()
	const res = await fetch(`${baseUrl}${url}${params}`, options)
	const data = res.json()
	return data
}

export const getObject = async (
	url: string,
	id: string | undefined
) => {
	const options = requestInit()
	const res = await fetch(`${baseUrl}${url}${id}/`, options)
	const data = res.json()
	return data
}

export const getOptions = async (url: string) => {
	const options = requestInit()
	options.method = 'OPTIONS'
	const res = await fetch(`${baseUrl}${url}`, options)
	const data = await res.json()
	return transformOptionsResponse(data)
}

export const getUser = async () => {
	let user
	const { accessToken } = getAuth()
	if (accessToken) {
		const options = requestInit()
		const res = await fetch(`${baseUrl}${userIndexUrl}`, options)
		user = await res.json()
	}
	return user
}

export const mainContext = async (indexUrl: string) => {
	const authData = getAuth()
	let optionsData = await getOptions(indexUrl)
	const user = await getUser()
	return { ...authData, ...optionsData, user, indexUrl }
}
