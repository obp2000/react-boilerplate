import 'server-only'

import { baseUrl } from '@/services/config'
import { transformOptionsResponse } from './helpers'
// import { getAuth } from '@/auth/server'
import { indexUrl as userIndexUrl } from '@/app/user/serverConfig'
import { indexUrl as customersIndexUrl } from '@/app/customers/serverConfig'
import { cookies } from 'next/headers'
import { decompressFromEncodedURIComponent } from "lz-string"
// import { headers } from 'next/headers'
// import type { MainContext } from '@/interfaces/options'
import type { ObjectsWithTotals, SearchParams } from '@/interfaces/api'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies/request-cookies'
import { RequestCookie } from 'next/dist/server/web/spec-extension/cookies'
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url'
import { cache } from 'react'

export const getAuth = () => {
	let accessToken = null
	const getAuth = cookies().get('auth')
	if (getAuth) {
		const auth = decompressFromEncodedURIComponent(getAuth.value)
		// console.log('auth ', auth)
		if (auth) {
			accessToken = JSON.parse(auth).accessToken
		}
	}
	return {
		accessToken,
		isAuthenticated: !!accessToken,
	}
}

export const requestInit = () => {
	let reqInit: RequestInit = {
		// cache: 'no-store'
	}
	const { accessToken } = getAuth()
	if (accessToken) {
		const headers = new Headers()
		headers.append('Authorization', `Token ${accessToken}`)
		reqInit.headers = headers
	}
	return reqInit
}

export const preloadObjects = (
	url: string,
	searchParams:	Record<string, string>
) => {
  void getObjects(url, searchParams)
}

export const getObjects = cache(async (
	url: string,
	searchParams: Record<string, string> = {}
): Promise<ObjectsWithTotals> => {
	let params = new URLSearchParams(searchParams).toString()
	if (params) {
		params = `?${params}`
	}
	const options = requestInit()
	const res = await fetch(`${baseUrl}${url}${params}`, options)
	if (!res.ok) {
		throw new Error('Failed to fetch objects')
	}
	const data = res.json()
	return data
})

export const getObject = async (
	url: string,
	id: string | undefined
) => {
	const options = requestInit()
	const res = await fetch(`${baseUrl}${url}${id}/`, options)
	if (!res.ok) return undefined
	const data = res.json()
	return data
}

export const preloadOptions = (url: string) => {
  void getOptions(url)
}

export const getOptions = cache(async (url: string) => {
	const options = requestInit()
	options.method = 'OPTIONS'
	const res = await fetch(`${baseUrl}${url}`, options)
	if (!res.ok) {
		throw new Error('Failed to fetch options')
	}
	const data = await res.json()
	return transformOptionsResponse(data)
})

export const preloadUser = (url: string) => {
  void getUser(url)
}

export const getUser = cache(async (url: string) => {
	let user
	const { accessToken } = getAuth()
	if (accessToken) {
		const options = requestInit()
		const res = await fetch(`${baseUrl}${url}`, options)
		if (!res.ok) {
			throw new Error('Failed to fetch user')
		}
		user = res.json()
	}
	return user
})

export const authContext = async () => {
	const authData = getAuth()
	const user = await getUser(userIndexUrl)
	return { ...authData, user }
}

export const mainContext = async (url: string) => {
	let optionsData = await getOptions(url)
	return { ...optionsData, indexUrl: url }
}


// export const getIndexUrl = () => {
// 	let url = customersIndexUrl
// 	// const referer = headers().keys((key) => console.log('key ', key)))
// 	console.log('url11 ', headers().get('referer'))
// 	// for (const itItem of headers().entries()) {
// 	// 	console.log(itItem);
// 	//   }
// 	// if (referer) {
// 	// 	const { pathname } = new URL(String(referer))
// 	// 	if (pathname != '/') {
// 	// 		url = `${pathname}/`
// 	// 	}
// 	// }
// 	// console.log('url ', url)
// 	return url
// }
