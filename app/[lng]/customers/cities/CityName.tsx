'use client'

import { useTranslation } from "@/app/i18n/client"
import { City } from "@prisma/client"

export default function CityName({
  object,
  // labels,
  lng
}: { object?: Pick<City, 'id' | 'city' | 'pindex'> | null } & { lng: string }) {
  const { t } = useTranslation(lng, 'city')
  if (!object) { return null }
  return <>
    {object?.pindex &&
      `${t('pindex').substring(0, 3).toLowerCase()}.${object.pindex} `}
    {object.city}
  </>
}
