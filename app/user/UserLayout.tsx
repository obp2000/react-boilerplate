import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Paper from '@/app/useClient/Paper'
import Stack from '@/app/useClient/Stack'
import Typography from '@/app/useClient/Typography'
import { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'

export async function UserLayout({
  children,
  params,
}: PropsWithChildren<{ params: ParsedUrlQuery }>) {
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
    {children}
  </Paper>
}
