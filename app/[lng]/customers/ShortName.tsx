'use client'

import { useTranslation } from "@/app/i18n/client"
import { CustomersSelect } from "@/interfaces/api"

export default function ShortName({
  object,
  // nameLabel,
  lng
}: { object?: CustomersSelect, lng: string }) {
  const { t } = useTranslation(lng, 'customer')
  return <>
      {object?.nick}
      {object?.name && ` ${t('name')}: ${object.name}`}
  </>
}
