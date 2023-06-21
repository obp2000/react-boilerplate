import Pagination from '@/app/components/Pagination'
import {
	type ModelNames,
	type Translation,
	getDictionary,
} from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { Edit } from '@/app/client/icons'
import Tooltip from '@/app/components/Tooltip'
import type { Customer, SerializedCustomer } from '@/interfaces/customers'
import type { Order, SerializedOrder } from '@/interfaces/orders'
import type { Product, SerializedProduct } from '@/interfaces/products'
import { getUsername } from '@/services/getUser'
import Link from 'next/link'
import { type PaginateFunction, type PaginatedResult, type PaginateOptions } from 'prisma-pagination'
import { Delete } from '@/app/client/icons'

type RowType<T> = (arg0: T) => (string | number | null | JSX.Element)[]

function RenderTableFields(props: {
	row: RowType<SerializedCustomer>
	object: Customer
}): JSX.Element
function RenderTableFields(props: {
	row: RowType<SerializedProduct>
	object: Product
}): JSX.Element
function RenderTableFields(props: {
	row: RowType<SerializedOrder>
	object: Order
}): JSX.Element
function RenderTableFields({
	row,
	object: { createdAt, updatedAt, ...object },
}: {
	row: any
	object: any
}): JSX.Element {
	const fields = row({
		...object,
		createdAt: createdAt.toISOString(),
		updatedAt: updatedAt.toISOString(),
	})
	return <>
		{fields.map((field: string | JSX.Element, key: number) => <td
			key={key}
			className='whitespace-nowrap px-6 py-4'>
			{field}
		</td>)}
	</>
}

// type GetObjects1<T> = ({ perPage, searchParams }: {
// 	perPage: number
// 	searchParams: { page?: string, term?: string }
// }) => Promise<PaginatedResult<T>>

type GetObjects<T> = ({
	paginate,
	searchParams: { page, term }
}: {
	paginate: PaginateFunction
	searchParams: {
		page?: string
		term?: string
	}
}) => Promise<PaginatedResult<T>>

type GetTableRow<T> = (dict: Translation) => RowType<T>

type CreatePaginator = (defaultOptions: PaginateOptions) => PaginateFunction

export async function TablePage(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<Customer>
	createPaginator: CreatePaginator
	getTableRow: GetTableRow<SerializedCustomer>
}): Promise<JSX.Element>
export async function TablePage(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<Product>
	createPaginator: CreatePaginator
	getTableRow: GetTableRow<SerializedProduct>
}): Promise<JSX.Element>
export async function TablePage(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<Order>
	createPaginator: CreatePaginator
	getTableRow: GetTableRow<SerializedOrder>
}): Promise<JSX.Element>
export async function TablePage({
	params: {
		lng = fallbackLng
	},
	searchParams,
	table,
	getObjects,
	createPaginator,
	getTableRow,
}: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<any>
	createPaginator: CreatePaginator
	getTableRow: GetTableRow<any>
}): Promise<JSX.Element> {
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
			{data.map((object) => <tr key={object.id}
				className='border-b dark:border-neutral-500'
				aria-label={modelName}>
				<RenderTableFields {...{ row, object }} />
				{username && <td className='whitespace-nowrap px-6 py-4'>
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
			<tr className='border-b dark:border-neutral-500'>
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
