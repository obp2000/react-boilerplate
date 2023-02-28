'use client'

import { languages } from '@/app/i18n/settings'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LocaleSwitcher({ label }: { label: string }) {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  return <div className='text-sm'>
    {label}: {languages.map((locale) => <span key={locale}>
      <Link href={redirectedPathName(locale)}>
        {locale}{' '}
      </Link>
    </span>)}
  </div>
}
