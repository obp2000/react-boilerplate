// import useSWR from 'swr'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { baseUrl } from '@/services/config'

export const searchFetcher = (url: string, term: string) => {
	if (typeof term === 'string' && term.length === 2) {
		const searchParams = new URLSearchParams()
		searchParams.set('page_size', '1000000')
		searchParams.set('term', term)
		return fetch(`${baseUrl}${url}?${searchParams}`)
			.then(res => res.json()
				.then(({ results }) => results))
	}
}

// export const useSearchObjects = (url: string) => {
// 	// const fetcher = (url: string, term: string) => {
// 	// 	if (typeof term === 'string' && term.length === 2) {
// 	// 		const searchParams = new URLSearchParams()
// 	// 		searchParams.set('page_size', '1000000')
// 	// 		searchParams.set('term', term)
// 	// 		let reqOptions: RequestInit = {
// 	// 		}
// 	// 		return fetch(`${baseUrl}${url}?${searchParams.toString()}`, reqOptions)
// 	// 			.then(res => res.json()
// 	// 				.then(({ results }) => results))
// 	// 	}
// 	// }
// 	const { data, error } = useSWR(url, fetcher)
// 	return {
// 		data,
// 		isLoading: !error && !data,
// 		fetcher,
// 		// isError: error
// 	}
// }
