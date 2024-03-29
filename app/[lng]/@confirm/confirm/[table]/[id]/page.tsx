import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Modal from './Modal'

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
    delete: textDelete,
    yes: okText,
    no: cancelText,
  } = await getDictionary(lng)
  return <Modal {...{
    title: `${textDelete}?`,
    okText,
    cancelText,
    lng,
    table,
    id,
  }} />
}
