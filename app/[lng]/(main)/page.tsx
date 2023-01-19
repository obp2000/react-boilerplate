import MainPage from '@/app/[lng]/customers/page'
import { ParsedUrlQuery } from 'querystring'

export default function Page(
	props: { params: ParsedUrlQuery, searchParams: ParsedUrlQuery }) {
	return <MainPage {...props} />
}
