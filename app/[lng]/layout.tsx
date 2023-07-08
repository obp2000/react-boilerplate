import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng, languages } from '@/app/i18n/settings'
import type { ReactNode } from 'react'
import { LocaleLink } from './_components/LocaleSwitcher'
import NavBar from './_components/NavBar'

export default async function Layout({
  params: {
    lng = fallbackLng
  },
  authButton,
  userButton,
  confirm,
  success,
  children,
}: {
  params: {
    lng: string
  }
  authButton: ReactNode
  userButton: ReactNode
  confirm: ReactNode
  success: ReactNode
  children: ReactNode
}) {
  const { localeSwitcher } = await getDictionary(lng)
  return <div className='container'>
    <NavBar {...{ lng, userButton, authButton }} />
    <main>
      {confirm}
      {success}
      {children}
    </main>
    <footer>
      <div className="flex mt-2">
        <div>{localeSwitcher}:</div>
        {languages.map((locale) => <LocaleLink key={locale}
          {...{ locale, lng }}>
          <div className="flex justify-center items-center mx-1 font-medium py-1 px-2 rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
            <div className="text-xs font-normal leading-none max-w-full flex-initial">
              {locale}
            </div>
          </div>
        </LocaleLink>)}
      </div>
    </footer>
  </div>
}
