'use client'

import { languages } from '@/app/i18n/settings'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LocaleSwitcher({
  lng,
  label
}: {
  lng: string
  label: string
}) {
  const pathname = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  return <div className="flex mt-2">
    <div>{label}:</div>
    {languages.filter((locale) => locale !== lng).map(
      (locale) => <div key={locale}>
        <Link href={redirectedPathName(locale)}>
          <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
            <div className="text-xs font-normal leading-none max-w-full flex-initial">
              {locale}
            </div>
          </div>
        </Link>
      </div>)}
  </div>
}
