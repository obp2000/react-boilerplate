import Link from 'next/link'
import { JSX } from 'react'

import { Tooltip } from "@/app/client/components"
import { Delete, Edit } from '@/app/client/icons'
import Pagination from '@/app/components/Pagination'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { getUsername } from '@/services/getUser'

import type { ModelNames } from '@/app/i18n/dictionaries'
import type { Customer, SerializedCustomer } from '@/interfaces/customers'
import type { Order, SerializedOrder } from '@/interfaces/orders'
import type { Product, SerializedProduct } from '@/interfaces/products'
import type { TableProps } from '@/interfaces/tables'

export async function TablePage(props: TableProps<Customer, SerializedCustomer>):
	Promise<JSX.Element>
export async function TablePage(props: TableProps<Product, SerializedProduct>):
	Promise<JSX.Element>
export async function TablePage(props: TableProps<Order, SerializedOrder>):
	Promise<JSX.Element>
export async function TablePage({
	params: {
		lng = fallbackLng
	},
	searchParams,
	table,
	getObjects,
	createPaginator,
	getTableRow,
}: TableProps<any, any>): Promise<JSX.Element> {
	const perPage = Number(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE)
	const paginate = createPaginator({ perPage })
	const [
		{ data, meta: { lastPage, total } },
		dict,
		username
	] = await Promise.all([
		getObjects({ paginate, searchParams }),
		getDictionary(lng),
		await getUsername()
	]) 
	const { edit, delete: deleteButtonLabel } = dict
	console.log('render objects........')
	const modelName = dict[table as keyof ModelNames].singular
	const row = getTableRow(dict)
	return <>
		<tbody>
			{data.map(({ createdAt, updatedAt, ...object }) => <tr key={object.id}
				className='hover:bg-slate-200 dark:border-neutral-500'
				aria-label={modelName}>
				{row({
					...object,
					createdAt: createdAt.toISOString(),
					updatedAt: updatedAt.toISOString(),
				}).map((field, key) => <td key={key}
					className='border whitespace-nowrap px-6 py-4'>
					{field}
				</td>)}
				{username && <td className='border whitespace-nowrap px-2 py-4'>
					<Tooltip title={edit}>
						<Link aria-label={edit}
							href={`/${lng}/${table}/${object.id}`}
							prefetch={false}
						>
							<Edit color='primary' />
						</Link>
					</Tooltip>
					<Tooltip title={deleteButtonLabel}>
						<Link
							aria-label={deleteButtonLabel}
							href={`/${lng}/confirm/${table}/${object.id}`}>
							<Delete role='img' color='primary' />
						</Link>
					</Tooltip>
				</td>}
			</tr>)}
		</tbody>
		<tfoot>
			<tr className='dark:border-neutral-500'>
				<td className='whitespace-nowrap px-6 py-4' />
				<td className='whitespace-nowrap px-6 py-4' >
					{`${dict.total}: ${total}`}
				</td>
				<td className='whitespace-nowrap px-6 py-4' />
				<td colSpan={4} align='right' className='whitespace-nowrap px-6 py-4'>
					{lastPage > 1 &&
						<Pagination totalPages={lastPage} />}
				</td>
			</tr>
		</tfoot>
	</>
}
