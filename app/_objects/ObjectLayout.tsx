import { getDictionary, type ModelNames } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import type { ReactNode } from 'react'
import BackButton from '@/app/components/BackButton'

export async function ObjectLayout({
	params: {
		lng = fallbackLng,
		id,
	},
	table,
	children,
}: {
	params: {
		lng: string
		id: string
	} 
	table: string
	children?: ReactNode
}) {
	const dict = await getDictionary(lng)
	const modelName = dict[table as keyof ModelNames].singular
	const title = id === 'new'
		? `${dict.new} ${modelName.toLowerCase()}` 
		: `${modelName} № ${id}`
	return <div className='shadow-md p-2'>
		<div className='grid grid-cols-3 mt-1'>
			<BackButton label={dict.back} />
			<div aria-label={title} className='text-xl'>
				{title}
			</div>
		</div>
		{children}
	</div>
}
