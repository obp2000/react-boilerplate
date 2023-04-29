import { getDictionary, type ModelNames } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Paper from '@/app/useClient/Paper'
import type { ParsedUrlQuery } from 'querystring'
import type { ReactNode } from 'react'
import Header from './Header'

function Layout({
	backLabel,
	title,
	children,
}: {
	backLabel: string
	title: string
	children?: ReactNode
}) {
	return <Paper elevation={3}>
		<Header {...{
			title,
			backLabel
		}} />
		{children}
	</Paper>
}

export async function ObjectLayout({
	params: {
		lng = fallbackLng,
		id,
	},
	table,
	children,
}: {
	params: ParsedUrlQuery
	table: string
	children?: ReactNode
}) {
	const dict = await getDictionary(String(lng))
	const modelName = dict[table as keyof ModelNames].singular
	return <Layout {...{
		title: `${modelName} № ${id}`,
		backLabel: dict.back
	}}>
		{children}
	</Layout>
}

export async function NewObjectLayout({
	params: {
		lng = fallbackLng
	},
	table,
	children,
}: {
	params: ParsedUrlQuery
	table: string
	children?: ReactNode
}) {
	const dict = await getDictionary(String(lng))
	const modelName = dict[table as keyof ModelNames].singular
	return <Layout {...{
		title: `${dict.new} ${modelName.toLowerCase()}`,
		backLabel: dict.back
	}}>
		{children}
	</Layout>
}
