import { notFound } from 'next/navigation'

import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import tables from '@/app/_tables/tables.json'
import getUser from '@/services/getUser'

import type { Translation } from '@/app/i18n/dictionaries'
import type { UserObject as User } from '@/interfaces/users'

async function UserPage({
  params: {
    lng = fallbackLng
  }
}: { params: { lng: string } }) {
  const user = await getUser()
  if (!user) {
    notFound()
  }
  const dict = await getDictionary(lng)
  return <>
    {tables.users.fields.map((fieldName, key) => <div
      key={key} className='grid grid-cols-6'>
      <div>
        {dict.user[fieldName as keyof Translation['user']]}
      </div>
      <div>
        {String(user[fieldName as keyof User])}
      </div>
    </div>)}
  </>
}

export default async function Page(
  props: { params: { lng: string } }
) {
  return <UserPage {...props} />
}
