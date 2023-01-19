import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useForm() {
	// const segment = useSelectedLayoutSegment()
	// const indexUrl = segment === '(main)' ? '/customers/' : `/${segment}/`
  	// let pathname = `/${lng}${indexUrl}`
	const { push } = useRouter()
  	const pathname = usePathname()
	const searchParams = new URLSearchParams(useSearchParams())
	const onSubmit = ({ term }: { term?: string | string[] }) => {
		if (term) {
			searchParams.delete('page')
			searchParams.set('term', String(term))
			return push(`${pathname}?${searchParams}`)
		}
	}
	return {
		name: 'search',
    	initialValues: { term: searchParams.get('term') },
    	onSubmit
    }
}
