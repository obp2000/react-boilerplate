import { getDictionary } from "@/app/i18n/dictionaries"
import { fallbackLng } from "@/app/i18n/settings"
import UserButtonMenu from './UserButtonMenu'

export default async function Page({
  params: {
    lng = fallbackLng
  },
}: { params: { lng: string } }) {
  const dict = await getDictionary(lng)
  const labels = {
      profile: dict.auth.profile,
      logout: dict.auth.logout
    }
  return <UserButtonMenu {...{ lng, labels }} />
}