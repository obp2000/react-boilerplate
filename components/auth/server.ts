import 'server-only'

import { decompressFromEncodedURIComponent } from "lz-string"
import { cookies } from 'next/headers'

export const getAuth = () => {
	let accessToken = null
	const getAuthFromCookies = cookies().get('auth')
	if (getAuthFromCookies) {
		const auth = decompressFromEncodedURIComponent(getAuthFromCookies.value)
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
