import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Success from '../../Modal'

export default async function Page({
  params: {
    lng = fallbackLng,
    table,
    id
  },
}: { params: {
    lng: string
    table: string
    id: string
     } }) {
  const {
    [table as 'customers' | 'products' | 'orders']: {
      singular
    },
    successfully,
    created,
    updated,
  } = await getDictionary(lng)
  const message
    = `${singular} ${successfully.toLowerCase()} ${id === 'new' ? created : updated}`
  return <Success {...{
    message,
    url: `/${lng}/${table}`,
  }} />
}
