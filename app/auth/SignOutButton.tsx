'use client'

import Button from '@/app/useClient/Button'
import Tooltip from '@/app/useClient/Tooltip'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useTransition } from 'react'
import { useAuthAction } from './hooks'
import { useForm } from "react-hook-form"

export default function SignOutButton({
  lng,
  username,
  labels
}: {
  lng: string
  username: string
  labels: Record<string, string>
}) {
  const { handleSubmit } = useForm()
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}/auth/logout}`
  const onSubmit = useAuthAction({
    url,
    startTransition,
    redirectUrl: `/${lng}`,
  })
  return <form onSubmit={handleSubmit(onSubmit)}>
    <Tooltip title={labels?.logout}>
      <Button
        type='submit'
        color='inherit'
        aria-label='auth'
        disabled={busy}
      >
        {username}&nbsp;&nbsp;<LogoutOutlinedIcon />
      </Button>
    </Tooltip>
  </form>
}


      // <Button
      //   type='submit'
      //   size='small'
      //   variant='outlined'
      //   aria-label={login}
      //   disabled={busy}
      // >
      //   {login}
      // </Button>