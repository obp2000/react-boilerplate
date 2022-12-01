import 'server-only'

import { baseUrl } from '@/services/config'
import { transformOptionsResponse } from './helpers'
// import { cache } from 'react'
import { requestInit } from './server'

export const getOptions = async (url: string, auth = false) => {
	const options = auth ? requestInit() : {}
	options.method = 'OPTIONS'
	const res = await fetch(`${baseUrl}${url}`, options)
	if (!res.ok) {
		throw new Error('Failed to fetch options')
	}
	const data = await res.json()
	return transformOptionsResponse(data)
}
