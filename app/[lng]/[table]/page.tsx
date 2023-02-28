import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { getAuth } from '@/app/auth/server'
import DeleteObjectButton from './DeleteObjectButton'
import Pagination from './pagination/Pagination'
import { makeSerializable } from '@/services/util'
import type { ParsedUrlQuery } from 'querystring'
import { getGetObjects, getTableLabels, getTableRow } from './helpers'
import type { ModelNames } from '@/app/i18n/dictionaries'
import EditIcon from '@/app/client/EditIcon'
import AddIcon from '@/app/client/AddIcon'
import Tooltip from '@/app/client/Tooltip'
import Link from 'next/link'

export default async function Page({
	params,
	searchParams
}: { params: ParsedUrlQuery, searchParams: ParsedUrlQuery }) {
	const lng = String(params.lng || fallbackLng)
	const table = String(params.table || 'customers')
	const dict = await getDictionary(lng)
	const getObjects = await getGetObjects(table)
	const { data, meta } = await getObjects({ perPage: 8, searchParams })
	const TableLabels = await getTableLabels(table)
	const TableRow = await getTableRow(table)
	const auth = getAuth()
	const modelNameSingular = dict[table as keyof ModelNames].singular
	const modelNamePlural = dict[table as keyof ModelNames].plural
	return <>
		<div className='columns-3'>
			<div className='text-center text-2xl text-gray-900'>
				<h1>{modelNamePlural} ({meta?.total})</h1>
			</div>
			<Pagination {...{ table, totalPages: meta?.lastPage, params, searchParams }} />
		</div>
		<div className="bg-white shadow-md rounded my-6">
			<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 table-fixed">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						<TableLabels {...{ dict }} />
						{auth?.isAuthenticated && <th className="py-3 px-6 text-left w-1/12">
							<Link
							    aria-label={dict.new}
							    href={`/${lng}/${table}/new`}
							  // prefetch={false}
							>
							    <Tooltip title={dict.new}>
							      <AddIcon />
							    </Tooltip>
							</Link>
						</th>}
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-light">
					{makeSerializable(data).map((object, key) => <tr key={key}
						aria-label={modelNameSingular}
						className="border-b border-gray-200 hover:bg-gray-100">
						<TableRow {...{ object, dict }} />
						{auth?.isAuthenticated && <td className="py-3 px-6 text-left">
							<div className="flex items-center justify-center">
								<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
									<Link
									    aria-label={dict.edit}
									    href={`/${lng}/${table}/${object.id}`}
									  // prefetch={false}
									>
									    <Tooltip title={dict.edit}>
									      <EditIcon />
									    </Tooltip>
									</Link>
								</div>
								<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
									<DeleteObjectButton {...{
										table,
										object,
										label: dict.delete,
										message: dict.successfully,
										okText: dict.yes,
										cancelText: dict.no,
										accessToken: auth.accessToken
									}} />
								</div>
							</div>
						</td>}
					</tr>)}
				</tbody>
			</table>
		</div>
	</>
}
