import 'server-only'

import {
	getDictionary,
	type ModelNames,
	type Translation
} from '@/app/i18n/dictionaries'
import { AddCircleOutline } from '@/app/client/icons'
import Tooltip from '@/app/components/Tooltip'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getUsername } from '@/services/getUser'
import { fallbackLng } from '@/app/i18n/settings'

type TableLabels = (arg0: Translation) => string[]

export async function TableLayout({
	params: {
		lng = fallbackLng
	},
	tableLabels,
	table,
	children,
}: {
	params: { lng: string }
	tableLabels: TableLabels
	table: string
	children?: ReactNode
}) {
	const [dict, username] = await Promise.all([
		getDictionary(lng),
		getUsername()])
	return <div className="flex flex-col">
		<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
				<div className="overflow-hidden">
					<div className='text-xl text-center my-1'>
						{dict[table as keyof ModelNames].plural}
					</div>
					<table className="min-w-full text-center text-sm font-light">
						<thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
							<tr>
								{tableLabels(dict).map((tableLabel) => <th
									key={tableLabel}
									scope='col'
									className='px-6 py-4'>
									{tableLabel}
								</th>)}
								{username && <th
									scope='col'
									className='px-6 py-4'>
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
				</div>
			</div>
		</div>
	</div>
}
