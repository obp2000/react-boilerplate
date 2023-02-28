import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ParsedUrlQuery } from 'querystring'
import type { TransitionStartFunction } from 'react'

export function useOnSubmit({
	startTransition
}: { startTransition: TransitionStartFunction }) {
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
			startTransition(() => {
				push(`${pathname}?${searchParams}`)
			})
		}
	}
}
