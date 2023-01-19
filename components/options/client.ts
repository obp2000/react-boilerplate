'use client'

import { baseUrl } from '@/services/config'
import { cache } from 'react'
// import { transformOptionsResponse } from './helpers'

export const getOptions = cache(async (url: string | null) => {
	let result
	// if (url) {
	// 	let reqOptions: RequestInit = {
	// 		method: 'OPTIONS',
	// 	}
	// 	const res = await fetch(`${baseUrl}${url}`, reqOptions)
	// 	if (!res.ok) {
	// 		throw new Error('Failed to fetch options')
	// 	}
	// 	const data = await res.json()
	// 	result = {
	// 		...transformOptionsResponse(data),
	// 		isLoading: !data,
	// 	}
	// }
	return result
})


// const optionsFetcher = async (url: string) => {
// 	let reqOptions: RequestInit = {
// 		method: 'OPTIONS',
// 	}
// 	const res = await fetch(`${baseUrl}${url}`, reqOptions)
// 	return await res.json()
// }

// export const useFetchOptions = (url: string | null) => {
// 	const { data, error } = useSWR(url, optionsFetcher)
// 	return {
// 		...transformOptionsResponse(data),
// 		isLoading: !error && !data,
// 		isError: error
// 	}
// }
