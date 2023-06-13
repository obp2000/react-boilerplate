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
import type { PaginatedResult } from 'prisma-pagination'
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

type GetObjects<T> = ({ perPage, searchParams }: {
	perPage: number
	searchParams: { page?: string, term?: string }
}) => Promise<PaginatedResult<T>>

type GetTableRow<T> = (dict: Translation) => RowType<T>

export async function TablePage(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<Customer>
	getTableRow: GetTableRow<SerializedCustomer>
}): Promise<JSX.Element>
export async function TablePage(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<Product>
	getTableRow: GetTableRow<SerializedProduct>
}): Promise<JSX.Element>
export async function TablePage(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<Order>
	getTableRow: GetTableRow<SerializedOrder>
}): Promise<JSX.Element>
export async function TablePage({
	params: {
		lng = fallbackLng
	},
	searchParams,
	table,
	getObjects,
	getTableRow,
}: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: GetObjects<any>
	getTableRow: GetTableRow<any>
}): Promise<JSX.Element> {
	const perPage = Number(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE)
	const dict = await getDictionary(lng)
	const { edit, delete: deleteButtonLabel } = dict
	// const [{ data, meta }] = await Promise.all([
	// 	getObjects({ perPage, searchParams }),
	// ])
	console.log('render objects........')
	// const paginate = createPaginator({ perPage })
	const { data, meta: { lastPage, total } } = await getObjects({ perPage, searchParams })
	// const { data, meta } = await paginate<Customer, Prisma.CustomerFindManyArgs>(
	// 	prisma.customer,
	// 	findManyArgs(searchParams),
	// 	{
	// 		page: String(searchParams.page || '1')
	// 	})
	// const data = await prisma.customer.findMany(findManyArgs(searchParams))
	const modelName = dict[table as keyof ModelNames].singular
	const row = getTableRow(dict)
	const username = await getUsername()
	return <>
		<tbody>
			{data.map((object) => <tr key={object.id}
				className='border-b dark:border-neutral-500' aria-label={modelName}>
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


					// {/*					<DeleteButton {...{
					// 	url: `/api${tablePath}/${object.id}`,
					// 	label: deleteButtonLabel,
					// 	okText: yes,
					// 	cancelText: no,
					// }} />*/}

			// 	return <TableRow aria-label={modelName}>
			// 		<RenderTableFields {...{ row, object }} />
			// 		<TableCell>
			// 			<Tooltip title={edit}>
			// 				<Link
			// 					aria-label={edit}
			// 					href={`${tablePath}/${object.id}`}
			// 				// prefetch={true}
			// 				>
			// 					<Edit color='primary' />
			// 				</Link>
			// 			</Tooltip>
			// 			<DeleteButton {...{
			// 				url: `/api${tablePath}/${object.id}`,
			// 				label: deleteButtonLabel,
			// 				okText: yes,
			// 				cancelText: no,
			// 			}} />
			// 		</TableCell>
			// 	</TableRow>
