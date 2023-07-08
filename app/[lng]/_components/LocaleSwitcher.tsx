'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { ReactNode } from 'react'

function redirectedPathName(locale: string, pathname: string) {
  const segments = pathname.split('/')
  segments[1] = locale
  return segments.join('/')
}

export function LocaleLink({ locale, lng, children }: {
  locale: string
  lng: string
  children: ReactNode
}) {
  if (locale === lng) return null
  const pathname = usePathname()
  return <Link href={redirectedPathName(locale, pathname)}>
      {children}
    </Link>
}

// export default function LocaleSwitcher({
//   lng,
//   label
// }: {
//   lng: string
//   label: string
// }) {
//   return <div className="flex mt-2">
//     <div>{label}:</div>
//     {languages.map((locale) => <Locale {...{
//       locale,
//       lng,
//     }} />)}
//   </div>
// }
