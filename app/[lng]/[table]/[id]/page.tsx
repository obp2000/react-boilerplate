import type { ParsedUrlQuery } from 'querystring'
import Controller from '@/app/objectPage/Controller'

export default async function Page(props: { params: ParsedUrlQuery }) {
	{/* @ts-expect-error Server Component */}
	return <Controller {...props} />
}
