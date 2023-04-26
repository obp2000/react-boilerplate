'use client'

import { fallbackLng, languages } from '@/app/i18n/settings'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import Chip from '@mui/material/Chip'
import Box from '@/app/useClient/Box'

export default function LocaleSwitcher({ label }: { label: string }) {
  const pathname = usePathname()
  const params = useParams()
  const lng = String(params?.lng || fallbackLng)
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  return <Box sx={{ mt: 2 }}>
    {label}: {languages.filter((locale) => locale !== lng).map(
      (locale) => <span key={locale}>
        <Link href={redirectedPathName(locale)}>
           <Chip label={locale} />
        </Link>
      </span>)}
  </Box>
}
