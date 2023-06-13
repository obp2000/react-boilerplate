import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Modal from './Modal'

export default async function Page({
  params: {
    lng = fallbackLng
  },
}: { params: { lng: string } }) {
  const dict = await getDictionary(lng)
  return <Modal {...{
    labels: {
      name: dict.auth.name,
      password: dict.auth.password,
      login: dict.auth.login,
      register: dict.auth.register,
    },
    errorMessages: dict.errorMessages,
    lng
  }} />
}
