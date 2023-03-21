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
  return <div className='text-sm'>
    {label}: {languages.filter((locale) => locale !== lng).map(
      (locale) => <span key={locale}>
        <Link href={redirectedPathName(locale)}>
          {locale}{' '}
        </Link>
      </span>)}
  </div>
}
