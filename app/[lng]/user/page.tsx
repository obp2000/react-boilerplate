import { ParsedUrlQuery } from 'querystring'

import User from '@/app/user/User'

export default async function Page(props: { params: ParsedUrlQuery }) {
  {/* @ts-expect-error Server Component */}
  return <User {...props} />
}
