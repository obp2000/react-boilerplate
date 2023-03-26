import 'server-only'

import List from '@/app/useClient/List'
import ListItem from '@/app/useClient/ListItem'
import ListItemText from '@/app/useClient/ListItemText'
import Paper from '@/app/useClient/Paper'
import Stack from '@/app/useClient/Stack'
import Typography from '@/app/useClient/Typography'
import type { Translation } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import userFieldNames from '@/app/user/config.json'
import { getUser } from '@/app/user/server'
import type { UserObject as User } from '@/interfaces/users'
import { ParsedUrlQuery } from 'querystring'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
  const user = getUser()
  const lng = String(params.lng || fallbackLng)
  const dict = await getDictionary(lng)
  return <Paper elevation={3}>
    <Stack direction="row" spacing={2}>
      <Typography
        component="h3"
        variant="h6"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        {dict.users.singular}
      </Typography>
    </Stack>
    <div>
      <List sx={{ maxWidth: 0.4}}>
        {userFieldNames.map((fieldName, key) => <ListItem key={key}>
          <ListItemText primary={dict.user[fieldName as keyof Translation['user']]} />
          <ListItemText primary={user && user[fieldName as keyof User]} />
        </ListItem>)}
      </List>
    </div>
  </Paper>
}
