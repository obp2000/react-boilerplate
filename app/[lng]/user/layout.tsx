import { UserLayout } from '@/app/user/UserLayout'
import { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'

export default async function Layout(
  props: PropsWithChildren<{ params: ParsedUrlQuery }>) {
  {/* @ts-expect-error Server Component */ }
  return <UserLayout {...props} />
}
