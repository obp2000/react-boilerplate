import 'server-only'

import { getAuth } from '@/auth/server'

export const requestInit = () => {
	let reqInit: RequestInit = {
		// cache: 'no-store'
	}
	const { accessToken } = getAuth()
	if (accessToken) {
		const headers = new Headers()
		headers.append('authorization', `Token ${accessToken}`)
		reqInit.headers = headers
	}
	return reqInit
}
