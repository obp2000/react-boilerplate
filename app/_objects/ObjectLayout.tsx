import { getDictionary, type ModelNames } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
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
	return <div className='shadow-md p-2'>
		<Header {...{
			title,
			backLabel
		}} />
		{children}
	</div>
}

export async function ObjectLayout({
	params: {
		lng = fallbackLng,
		id,
	},
	table,
	children,
}: {
	params: { lng: string, id: string } 
	table: string
	children?: ReactNode
}) {
	const dict = await getDictionary(lng)
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
	params: { lng: string }
	table: string
	children?: ReactNode
}) {
	const dict = await getDictionary(lng)
	const modelName = dict[table as keyof ModelNames].singular
	return <Layout {...{
		title: `${dict.new} ${modelName.toLowerCase()}`,
		backLabel: dict.back
	}}>
		{children}
	</Layout>
}
