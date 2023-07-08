import 'server-only'

import Link from 'next/link'

import { Tooltip } from "@/app/client/components"
import { AddCircleOutline } from '@/app/client/icons'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { getUsername } from '@/services/getUser'

import type { ModelNames } from '@/app/i18n/dictionaries'
import type { LayoutProps } from '@/interfaces/tables'

export async function TableLayout({
	params: {
		lng = fallbackLng
	},
	tableLabels,
	table,
	children,
}: LayoutProps) {
	const [dict, username] = await Promise.all([
		getDictionary(lng),
		getUsername()])
	return <table className="w-full text-sm border-collapse">
		<caption className='text-xl py-1'>
			{dict[table as keyof ModelNames].plural}
		</caption>
		<thead className="bg-slate-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
			<tr>
				{tableLabels(dict).map((tableLabel) => <th
					key={tableLabel}
					scope='col'
					align='left'
					className='px-6 py-4'>
					{tableLabel}
				</th>)}
				{username && <th scope='col' align='left' className='px-6 py-4'>
					<Link
						aria-label={dict.new}
						href={`/${lng}/${table}/new`}
						prefetch={false}
					>
						<Tooltip title={dict.new}>
							<AddCircleOutline color='primary' />
						</Tooltip>
					</Link>
				</th>}
			</tr>
		</thead>
		{children}
	</table>
}
