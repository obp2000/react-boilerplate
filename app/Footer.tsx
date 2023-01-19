import 'server-only'

import { languages } from '@/app/i18n/settings'
import type { TFunction } from 'i18next'
import Link from 'next/link'
import type { TransProps } from 'react-i18next'
import { Trans } from 'react-i18next/TransWithoutContext'

export function Footer({ lng, t }: { lng: string, t: TFunction }) {
  const restLngs = languages.filter((language) => lng !== language)
  return <>
    <Trans i18nKey="languageSwitcher" t={t}>
      Switch from <strong>{{ lng } as unknown as TransProps<string>['children']}</strong> to:{' '}
    </Trans>
    {restLngs.map((language, index) => <span key={language}>
      {index > 0 && (' or ')}
      <Link href={`/${language}`}>
        {language}
      </Link>
    </span>)}
  </>
}
