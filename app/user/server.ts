import 'server-only'

import { decompressFromEncodedURIComponent } from "lz-string"
import { cookies } from 'next/headers'

export const getUser = () => {
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


// import {
// 	compressToEncodedURIComponent,
// 	decompressFromEncodedURIComponent
// } from "lz-string"
// import { cookies } from 'next/headers'
// import { setCookie } from 'nookies'

// export const preloadUser = () => {
// 	void getUser()
// }

// export const getUser1 = cache(async () => {
// 	let user
// 	const { accessToken } = getAuth()
// 	if (accessToken) {
// 		const options = requestInit()
// 		const res = await fetch(`${baseUrl}/user/`, options)
// 		if (!res.ok) {
// 			throw new Error('Failed to fetch user')
// 		}
// 		user = res.json()
// 	}
// 	return user
// })

// export const _encodeCompressed = (data: any) =>
// 	compressToEncodedURIComponent(JSON.stringify(data))

// export const setUserToCookies = (user: any) =>
// 	setCookie(undefined, 'user', user, {
// 		encode: _encodeCompressed,
// 		httpOnly: false,
// 	})

// function getUserFromCookies() {
// 	let user
// 	const userFromCookies = cookies().get('user')
// 	if (userFromCookies) {
// 		user = decompressFromEncodedURIComponent(userFromCookies.value)
// 		console.log('user from cookies', user)
// 	}
// 	return user
// }

// export const getUser = async () => {
// 	let user = getUserFromCookies()
// 	if (!user) {
// 		user = await getUser1()
// 		console.log('user from request', user)
// 		setUserToCookies(user)
// 	}
// 	return user
// }


