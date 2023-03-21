import { useRouter } from 'next/navigation'
import type { ParsedUrlQuery } from 'querystring'
import type { TransitionStartFunction } from 'react'

export function useOnSubmit({
	searchParams,
	lng,
	table,
	startTransition
}: {
	searchParams: URLSearchParams
	lng: string
	table: string
	startTransition: TransitionStartFunction
}) {
	const { push } = useRouter()
  	const pathname = `/${lng}/${table}`
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
