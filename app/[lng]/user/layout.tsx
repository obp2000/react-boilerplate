import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'

import type { PropsWithChildren } from 'react'

async function UserLayout({
  children,
  params: {
    lng = fallbackLng
  },
}: PropsWithChildren<{ params: { lng: string } }>) {
  const dict = await getDictionary(lng)
  return <>
    <div className='text-xl text-center my-1'>
      {dict.users.singular}
    </div>
    <div className='shadow-md'>
      {children}
    </div>
  </>
}

export default async function Layout(
  props: PropsWithChildren<{ params: { lng: string } }>) {
  return <UserLayout {...props} />
}
