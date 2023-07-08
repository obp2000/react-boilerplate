import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Modal from './_components/Modal'

export default async function Page({
  params: {
    lng = fallbackLng
  },
}: { params: { lng: string } }) {
  const {
    auth,
    errorMessages,
  } = await getDictionary(lng)
  return <Modal {...{
    labels: auth,
    errorMessages,
    lng
  }} />
}
