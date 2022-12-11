import 'server-only'

import type { ObjectsWithTotals } from '@/interfaces/api'
import { requestInit } from '@/services/api/server'
import { baseUrl } from '@/services/config'
import { cache } from 'react'
// import path from 'path'
import { IndexUrl } from '@/interfaces/index'

export const preloadObjects = (
	indexUrl: IndexUrl,
	searchParams: Record<string, string>
) => {
	void getObjects({ indexUrl, searchParams })
}

type Props = IndexUrl & {
	searchParams?: Record<string, string>
}

export const getObjects = cache(async ({
	indexUrl,
	searchParams = {}
}: Props): Promise<ObjectsWithTotals> => {
	// const basename = path.basename(__dirname)
	// const indexUrl = `/${basename === 'app' ? 'customers' : basename}/`
	let params = new URLSearchParams(searchParams).toString()
	if (params) {
		params = `?${params}`
	}
	const options = requestInit()
	const res =
		await fetch(`${baseUrl}${indexUrl}${params}`, options)
	if (!res.ok) {
		throw new Error('Failed to fetch objects')
	}
	const data = res.json()
	return data
})
