import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Modal from './_components/Modal'

export default async function Page({
  params: {
    lng = fallbackLng
  },
}: { params: { lng: string } }) {
  const {
    auth: {
      name,
      password,
      login,
      register
    },
    errorMessages,
  } = await getDictionary(lng)
  return <Modal {...{
    labels: {
      name,
      password,
      login,
      register,
    },
    errorMessages,
    lng
  }} />
}
