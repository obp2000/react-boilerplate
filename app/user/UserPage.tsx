import type { Translation } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import List from '@/app/useClient/List'
import ListItem from '@/app/useClient/ListItem'
import ListItemText from '@/app/useClient/ListItemText'
import tables from '@/app/_tables/tables.json'
import getUser from '@/services/getUser'
import type { UserObject as User } from '@/interfaces/users'
import { ParsedUrlQuery } from 'querystring'
import { notFound } from 'next/navigation'

export async function UserPage({ params }: { params: ParsedUrlQuery }) {
  const user = await getUser()
  if (!user) {
    notFound()
  }
  const lng = String(params.lng || fallbackLng)
  const dict = await getDictionary(lng)
  return <List sx={{ maxWidth: 0.4 }}>
    {tables.users.fields.map((fieldName, key) => <ListItem key={key}>
      <ListItemText primary={dict.user[fieldName as keyof Translation['user']]} />
      <ListItemText primary={String(user[fieldName as keyof User])} />
    </ListItem>)}
  </List>
}
