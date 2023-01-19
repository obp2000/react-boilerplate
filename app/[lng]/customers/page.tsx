import { useTranslation } from '@/app/i18n'
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
import CityName from './cities/CityName'
import { getObjects } from './helpers'

const Page = async ({
	params,
	searchParams
}: { params: ParsedUrlQuery, searchParams: ParsedUrlQuery }) => {
	const lng = String(params.lng) || fallbackLng
	const [{ t },
		{ t: modelT },
		// { t: cityT },
		{ data, meta },
	] = await Promise.all([
		useTranslation(lng),
		useTranslation(lng, 'customer'),
		// useTranslation(lng, 'city'),
		getObjects({ perPage: 8, searchParams })
	])
	const indexUrl = '/customers/'
	const { isAuthenticated } = getAuth() || {}
	return <>
		<Header {...{ totalCount: meta?.total, label: t('customers') }} >
			<Pagination {...{ indexUrl, totalPages: meta?.lastPage, params, searchParams }} />
		</Header>
		<div className="bg-white shadow-md rounded my-6">
			<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 table-fixed">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left w-1/12">{modelT('id')}</th>
						<th className="py-3 px-6 text-left w-3/12">{modelT('name')}</th>
						<th className="py-3 px-6 text-left w-3/12">{modelT('city')}</th>
						<th className="py-3 px-6 text-left w-2/12">{modelT('address')}</th>
						<th className="py-3 px-6 text-left w-1/12">{modelT('created_at')}</th>
						<th className="py-3 px-6 text-left w-1/12">{modelT('updated_at')}</th>
						{isAuthenticated && <th className="py-3 px-6 text-left w-1/12">
							<LinkToNewOrEditObject {...{
								indexUrl,
								label: t('new'),
								lng
							}} />
						</th>}
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-light">
					{makeSerializable(data).map((object, key) => <Tr key={key} label={t('customer')} >
						<td className="py-3 px-6 text-left">
							{object.id}
						</td>
						<td className="py-3 px-6 text-left">
							<ShortName {...{
								object,
								// nameLabel: modelT('name'),
								lng
							}} />
						</td>
						<td className="py-3 px-6 text-left">
							<CityName {...{ object: object.city, lng }} />
						</td>
						<td className="py-3 px-6 text-left">
							{object.address}
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
										label: t('edit'),
										lng
									}} />
								</div>
								<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
									<DeleteObjectButton {...{
										indexUrl,
										object,
										label: t('delete'),
										message: t('successfully'),
										okText: t('yes'),
										cancelText: t('no'),
										lng
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

export default Page
