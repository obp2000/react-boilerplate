import 'server-only'

import { requestInit } from '@/services/api/server'
import { baseUrl } from '@/services/config'
// import { cache } from 'react'

export const getObject = async ({
	indexUrl,
	id
}: { indexUrl: string, id: string }) => {
	const options = requestInit()
	// options.cache = 'no-store'
	const res = await fetch(`${baseUrl}${indexUrl}${id}`, options)
	if (!res.ok) return undefined
	const data = res.json()
	return data
}
