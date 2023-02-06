import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'

export function useOnSubmit() {
	// const segment = useSelectedLayoutSegment()
	// const indexUrl = segment === '(main)' ? '/customers/' : `/${segment}/`
  	// let pathname = `/${lng}${indexUrl}`
	const { push } = useRouter()
  	const pathname = usePathname()
	const searchParams = new URLSearchParams(useSearchParams())
	return ({ term }: ParsedUrlQuery) => {
		if (term) {
			searchParams.delete('page')
			searchParams.set('term', String(term))
			return push(`${pathname}?${searchParams}`)
		}
	}
}
