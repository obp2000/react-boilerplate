import type { ParsedUrlQuery } from 'querystring'
import Controller from '@/app/orders/id/Controller'

export default async function Page(props: { params: ParsedUrlQuery }) {
	{/* @ts-expect-error Server Component */}
	return <Controller {...props} />
}
