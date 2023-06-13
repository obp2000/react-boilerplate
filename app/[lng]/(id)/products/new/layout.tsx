import type { PropsWithChildren } from 'react'
import { NewObjectLayout } from '@/app/_objects/ObjectLayout'

export default async function Layout({
	children,
	params,
}: PropsWithChildren<{ params: { lng: string } }>) {
	const table = 'products'
	return <NewObjectLayout {...{ params, table, children }} />
}
