import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Modal from '../../Modal'

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
  const dict = await getDictionary(lng)
  return <Modal {...{
    title: `${dict.delete}?`,
    okText: dict.yes,
    cancelText: dict.no,
    url: `/api/${lng}/${table}/${id}`,
    // labels: dict.auth,
    // errorMessages: dict.errorMessages,
    // lng
  }} />
}
