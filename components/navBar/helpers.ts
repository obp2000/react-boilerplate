import 'server-only'

import { indexUrl as mainIndexUrl } from '@/app/customers/serverConfig'

export function activeNavLink(path: string, indexUrl: string) {
	// console.log('path ', path, indexUrl)
	return path === '/' ? indexUrl === mainIndexUrl : path === indexUrl
}
