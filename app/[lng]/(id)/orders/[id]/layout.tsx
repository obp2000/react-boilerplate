import type { ReactNode } from 'react'
import { ObjectLayout } from '@/app/_objects/ObjectLayout'

export default async function Layout({
	params,
	children,
}: {
	params: {
		lng: string
		id: string
	}
	children: ReactNode
}) {
	const table = 'orders'
	return <ObjectLayout {...{ params, table, children }} />
}
