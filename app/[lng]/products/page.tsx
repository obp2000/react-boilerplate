import type { ParsedUrlQuery } from 'querystring'
import Controller from '@/app/products/Controller'

export default async function Page(props: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
}) {
	{/* @ts-expect-error Server Component */ }
	return <Controller {...props} />
}
