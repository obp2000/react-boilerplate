import type { PropsWithChildren } from 'react'

import { ObjectLayout } from '@/app/_objects/ObjectLayout'

export default async function Layout({
	children,
	params,
}: PropsWithChildren<{ params: { lng: string, id: string } }>) {
	const table = 'products'
	return <ObjectLayout {...{ params, table, children }} />
}
