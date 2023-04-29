import DeleteButton from '@/app/components/DeleteButton'
import Pagination from '@/app/components/Pagination'
import type { ModelNames, Translation } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import EditIcon from '@/app/useClient/EditIcon'
import TableBody from '@/app/useClient/TableBody'
import TableCell from '@/app/useClient/TableCell'
import TableFooter from '@/app/useClient/TableFooter'
import TableRow from '@/app/useClient/TableRow'
import Tooltip from '@/app/useClient/Tooltip'
import type { Customer, SerializedCustomer } from '@/interfaces/customers'
import type { Order, SerializedOrder } from '@/interfaces/orders'
import type { Product, SerializedProduct } from '@/interfaces/products'
import { isLoggedIn } from '@/services/getUser'
import Link from 'next/link'
import type { PaginatedResult } from 'prisma-pagination'
import type { ParsedUrlQuery } from 'querystring'
import ClientOnly from './ClientOnly'

type RowType<T> = (arg0: T) => (string | JSX.Element)[]

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
		{fields.map((
			field: string | JSX.Element,
			key: number) => <TableCell key={key}>
				{field}
			</TableCell>)}
	</>
}

export function getRenderTableRow(props: {
	dict: Translation
	lng: string
	table: string
	row: RowType<SerializedCustomer>
	loggedIn: boolean
}): (object: Customer) => JSX.Element
export function getRenderTableRow(props: {
	dict: Translation
	lng: string
	table: string
	row: RowType<SerializedProduct>
	loggedIn: boolean
}): (object: Product) => JSX.Element
export function getRenderTableRow(props: {
	dict: Translation
	lng: string
	table: string
	row: RowType<SerializedOrder>
	loggedIn: boolean
}): (object: Order) => JSX.Element
export function getRenderTableRow({
	dict,
	lng,
	table,
	row,
	loggedIn,
}: {
	dict: Translation
	lng: string
	table: string
	row: any
	loggedIn: boolean
}): (object: any) => JSX.Element {
	if (loggedIn) {
		const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}/${table}`
		return function RenderTableRow(object) {
			return <TableRow aria-label={dict[table as keyof ModelNames].singular}>
				<RenderTableFields {...{ row, object }} />
				<TableCell>
					<Tooltip title={dict.edit}>
						<Link
							aria-label={dict.edit}
							href={`/${lng}/${table}/${object.id}`}
						// prefetch={true}
						>
							<EditIcon color='primary' />
						</Link>
					</Tooltip>
					<DeleteButton {...{
						url: `${apiUrl}/${object.id}`,
						label: dict.delete,
						okText: dict.yes,
						cancelText: dict.no,
					}} />
				</TableCell>
			</TableRow>
		}
	} else {
		return function RenderTableRow(object) {
			return <TableRow aria-label={dict[table as keyof ModelNames].singular}>
				<RenderTableFields {...{ row, object }} />
			</TableRow>
		}
	}

}

type GetObjects<T> = ({ perPage, searchParams }: { perPage?: number, searchParams: ParsedUrlQuery}) => Promise<PaginatedResult<T>>

type GetTableRow<T> = (dict: Translation) => RowType<T>

export async function TablePage(props: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
	table: string
	getObjects: GetObjects<Customer>
	getTableRow: GetTableRow<SerializedCustomer>
}): Promise<JSX.Element>
export async function TablePage(props: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
	table: string
	getObjects: GetObjects<Product>
	getTableRow: GetTableRow<SerializedProduct>
}): Promise<JSX.Element>
export async function TablePage(props: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
	table: string
	getObjects: GetObjects<Order>
	getTableRow: GetTableRow<SerializedOrder>
}): Promise<JSX.Element>
export async function TablePage({
	params,
	searchParams,
	table,
	getObjects,
	getTableRow,
}: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
	table: string
	getObjects: GetObjects<any>
	getTableRow: GetTableRow<any>
}): Promise<JSX.Element> {
	const lng = String(params.lng || fallbackLng)
	const paginatorArgs = {
		perPage: Number(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE),
		searchParams
	}
	const [dict, { data, meta }, loggedIn] = await Promise.all([
		getDictionary(lng),
		getObjects(paginatorArgs),
		isLoggedIn(),
	])
	const row = getTableRow(dict)
	const RenderTableRow = getRenderTableRow({
		dict,
		lng,
		table,
		row,
		loggedIn,
	})
	return <>
		<ClientOnly>
			<TableBody>
				{data.map((object, key) => <RenderTableRow key={key} {...object} />)}
			</TableBody>
		</ClientOnly>
		<TableFooter>
			<TableRow>
				<TableCell />
				<TableCell>{`${dict.total}: ${meta?.total}`}</TableCell>
				<TableCell />
				<TableCell colSpan={4} align='right'>
					{meta?.lastPage > 1 &&
						<Pagination totalPages={meta?.lastPage} />}
				</TableCell>
			</TableRow>
		</TableFooter>
	</>
}
