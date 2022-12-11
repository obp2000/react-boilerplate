import 'server-only'

import { requestInit } from '@/services/api/server'
import { baseUrl } from '@/services/config'
import path from 'path'
import { IdParam } from '@/interfaces/api'

export const getObject = async ({ id }: IdParam) => {
	const dirname = __dirname.replace('/[id]', '')
	const url = `/${path.basename(dirname)}/`
	// console.log('form server dirname ', url)
	const options = requestInit()
	options.cache = 'no-store'
	const res = await fetch(`${baseUrl}${url}${id}/`, options)
	if (!res.ok) return undefined
	const data = res.json()
	return data
}
