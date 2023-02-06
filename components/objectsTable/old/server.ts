import 'server-only'

import { requestInit } from '@/services/api/server'
import { baseUrl } from '@/services/config'
import { ParsedUrlQuery } from 'querystring'
// import { cache } from 'react'

export const preloadObjects = (
	indexUrl: string,
	searchParams: Record<string, string>
) => {
	void getObjects({ indexUrl, searchParams })
}

type Props = { indexUrl: string, searchParams: ParsedUrlQuery }

export const getObjects = async ({
	indexUrl,
	searchParams = {}
}: Props) => {
	let params = new URLSearchParams(searchParams as Record<string, string>).toString()
	if (params) {
		params = `?${params}`
	}
	const options = requestInit()
	// options.cache = 'no-store'
	const res =
		await fetch(`${baseUrl}${indexUrl}${params}`, options)
	if (!res.ok) {
		throw new Error('Failed to fetch objects')
	}
	const data = res.json()
	return data
}
