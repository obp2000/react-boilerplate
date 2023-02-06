import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import ShortName from '@/app/[lng]/customers/ShortName'
import { getAuth } from '@/auth/server'
import Date from '@/Date'
import DeleteObjectButton from '@/deleteObjectButton/DeleteObjectButton'
import LinkToNewOrEditObject from '@/linkToNewOrEditObject/LinkToNewOrEditObject'
import Header from '@/objectsTable/Header'
import Tr from '@/objectsTable/Tr'
import Pagination from '@/pagination/Pagination'
import { makeSerializable } from '@/services/util'
import { ParsedUrlQuery } from 'querystring'
import { getObjects } from './helpers'

export default async function Page({
	params,
	searchParams
}: { params: ParsedUrlQuery, searchParams: ParsedUrlQuery }) {
	const lng = String(params.lng) || fallbackLng
	const dict = await getDictionary(lng)
	const { data, meta } = await getObjects({ perPage: 8, searchParams })
	const indexUrl = '/orders/'
	const { isAuthenticated } = getAuth()
	return <>
		<Header {...{ totalCount: meta?.total, label: dict.mainMenu.orders }} >
			<Pagination {...{ indexUrl, totalPages: meta?.lastPage, params, searchParams }} />
		</Header>
		<div className="bg-white shadow-md rounded my-6">
			<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">{dict.order.id}</th>
						<th className="py-3 px-6 text-left">{dict.order.customer}</th>
						<th className="py-3 px-6 text-left">{dict.order.order_items_cost}</th>
						<th className="py-3 px-6 text-left">{dict.order.created_at}</th>
						<th className="py-3 px-6 text-left">{dict.order.updated_at}</th>
						{isAuthenticated && <th className="py-3 px-6 text-left">
							<LinkToNewOrEditObject {...{ indexUrl, label: dict.new, lng }} />
						</th>}
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-light">
					{makeSerializable(data).map((object, key) => <Tr key={key} label={dict.orderSingular} >
						<td className="py-3 px-6 text-left">
							{object.id}
						</td>
						<td className="py-3 px-6 text-left">
							<ShortName {...{
								object: { nick: object.nick, name: object.name },
								labels: dict.customer,
							}} />
						</td>
						<td className="py-3 px-6 text-left">
							{object.order_items_cost}
						</td>
						<td className="py-3 px-6 text-left">
							<Date dateString={String(object.created_at)} />
						</td>
						<td className="py-3 px-6 text-left">
							<Date dateString={String(object.updated_at)} />
						</td>
						{isAuthenticated && <td className="py-3 px-6 text-left">
							<div className="flex items-center justify-center">
								<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
									<LinkToNewOrEditObject {...{
										indexUrl,
										object,
										label: dict.edit,
										lng
									}} />
								</div>
								<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
									<DeleteObjectButton {...{
										indexUrl,
										object,
										label: dict.delete,
										message: dict.successfully,
										okText: dict.yes,
										cancelText: dict.no,
									}} />
								</div>
							</div>
						</td>}
					</Tr>)}
				</tbody>
			</table>
		</div>
	</>
}
