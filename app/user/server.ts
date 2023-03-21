import 'server-only'

import { decompressFromEncodedURIComponent } from "lz-string"
import { cookies } from 'next/headers'

export function getUser() {
	let user
	const getUserFromCookies = cookies().get('user')
	if (getUserFromCookies) {
		user = decompressFromEncodedURIComponent(getUserFromCookies.value)
		if (user) {
			user = JSON.parse(user)
		}
	}
	return user
}
