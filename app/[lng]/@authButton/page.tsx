import Button from "@/app/components/Button"
import { getDictionary } from "@/app/i18n/dictionaries"
import { fallbackLng } from "@/app/i18n/settings"
import Link from "next/link"

export default async function Page({
  params: {
    lng = fallbackLng
  },
}: { params: { lng: string } }) {
  const dict = await getDictionary(lng)
  return <Link href={`/${lng}/login`}>
    <Button>
      {dict.auth.login}
    </Button>
  </Link>
}
