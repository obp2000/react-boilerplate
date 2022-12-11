import 'server-only'

import { requestInit } from '@/services/api/server'
import { baseUrl } from '@/services/config'
import { cache } from 'react'
import { transformOptionsResponse } from './helpers'

export const getOptions = cache(async (indexUrl: string) => {
	const options = indexUrl === '/user/' ? requestInit() : {}
	options.method = 'OPTIONS'
	const res = await fetch(`${baseUrl}${indexUrl}`, options)
	if (!res.ok) {
		throw new Error('Failed to fetch options')
	}
	const data = await res.json()
	return transformOptionsResponse(data)
})
