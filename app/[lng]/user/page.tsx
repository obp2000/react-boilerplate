import { UserPage } from '@/app/user/UserPage'
import { ParsedUrlQuery } from 'querystring'

export default async function Page(props: { params: ParsedUrlQuery }) {
  {/* @ts-expect-error Server Component */ }
  return <UserPage {...props} />
}
