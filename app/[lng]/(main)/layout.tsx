import TableLayout from '../(table)/customers/layout'
import { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren<{ params: ParsedUrlQuery }>) {
	{/* @ts-expect-error Server Component */ }
	return <TableLayout {...props} />
}
