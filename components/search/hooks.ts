import type { SearchTerm } from '@/interfaces/search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useForm() {
	const { push } = useRouter()
	let searchPath = usePathname()
	const searchParams = new URLSearchParams()
	const onSubmit = ({ term }: SearchTerm) => {
		if (term) {
			searchParams.set('term', String(term))
			searchPath += `?${searchParams}`
		}
		return push(String(searchPath))
	}
	return {
		name: 'search',
    	initialValues: { term: useSearchParams().get('term') },
    	onSubmit
    }
}
