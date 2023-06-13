import { getDictionary } from "@/app/i18n/dictionaries"
import { fallbackLng } from "@/app/i18n/settings"
import UserButton from './UserButton'
import { getUsername } from "@/services/getUser"

export default async function Page({
  params: {
    lng = fallbackLng
  },
}: { params: { lng: string } }) {
  const dict = await getDictionary(lng)
  return <UserButton {...{
    name: await getUsername(),
    lng,
    labels: {
      profile: dict.auth.profile,
      logout: dict.auth.logout
    }
  }} />
}
