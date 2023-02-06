import MainPage from '@/app/[lng]/[table]/page'
import { ParsedUrlQuery } from 'querystring'

export default function Page(
	props: { params: ParsedUrlQuery, searchParams: ParsedUrlQuery }) {
	{/* @ts-expect-error Server Component */}
	return <MainPage {...props} />
}
