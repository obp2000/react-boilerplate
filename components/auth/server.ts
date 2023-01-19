import 'server-only'

import { decompressFromEncodedURIComponent } from "lz-string"
import { cookies } from 'next/headers'

export const getAuth = () => {
	let res
	const auth = cookies().get('auth')
	if (auth) {
		const decodedAuth = decompressFromEncodedURIComponent(auth.value)
		// console.log('auth ', auth)
		if (decodedAuth) {
			res = JSON.parse(decodedAuth)
		}
	}
	return res
}
