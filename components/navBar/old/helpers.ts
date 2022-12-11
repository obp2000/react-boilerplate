import 'server-only'

export function activeNavLink(
	path: string,
	indexUrl: string,
	mainPage?: boolean
) {
	// console.log('path ', path, indexUrl)
	// return path === '/' ? indexUrl === mainIndexUrl : path === indexUrl
	return mainPage ? path === '/' : path === indexUrl
}
