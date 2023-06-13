import { UserLayout } from '@/app/user/UserLayout'
import type { PropsWithChildren } from 'react'

export default async function Layout(
  props: PropsWithChildren<{ params: { lng: string } }>) {
  return <UserLayout {...props} />
}
