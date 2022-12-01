import type { SearchTerm } from '@/interfaces/search'
import { usePathname, useRouter } from 'next/navigation'

export function useOnSubmit() {
	const { push } = useRouter()
	let searchPath = usePathname()
	const searchParams = new URLSearchParams()
	return ({ term }: SearchTerm) => {
		if (term) {
			searchParams.set('term', String(term))
			searchPath += `?${searchParams}`
		}
		return push(String(searchPath))
	}
}
