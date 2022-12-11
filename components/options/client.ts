'use client'

import { baseUrl } from '@/services/config'
import useSWR from 'swr'
import { transformOptionsResponse } from './helpers'

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
