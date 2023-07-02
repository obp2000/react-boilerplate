import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import type { ReactNode } from 'react'
import LocaleSwitcher from './_components/LocaleSwitcher'
import NavBar from './_components/NavBar'

export default async function Layout({
  params: {
    lng = fallbackLng
  },
  authButton,
  userButton,
  confirm,
  children,
}: {
  params: {
    lng: string
  }
  authButton: ReactNode
  userButton: ReactNode
  confirm: ReactNode
  children: ReactNode
}) {
  const dict = await getDictionary(lng)
  return <div className='container'>
    <NavBar {...{ lng, userButton, authButton }} />
    <main>
      {confirm}
      {children}
    </main>
    <footer>
      <LocaleSwitcher {...{ lng, label: dict.localeSwitcher }} />
    </footer>
  </div>
}
