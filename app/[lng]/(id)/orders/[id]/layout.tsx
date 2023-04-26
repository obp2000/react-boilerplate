import { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'
import { ObjectLayout } from '@/app/_objects/ObjectLayout'

export default async function Layout({
	children,
	params,
}: PropsWithChildren<{ params: ParsedUrlQuery }>) {
	const table = 'orders'
	{/* @ts-expect-error Server Component */ }
	return <ObjectLayout {...{ params, table, children }} />
}
