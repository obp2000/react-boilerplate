'use client'

import Button from '@/app/client/Button'
import Tooltip from '@/app/client/Tooltip'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import type { User } from '@prisma/client'
import { useTransition } from 'react'
import { useSignOut } from './hooks'

export default function SignOutButton({
  lng,
  user,
  labels
}: {
  lng: string
  user: User
  labels: Record<string, string>
}) {
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  return <Tooltip title={labels?.logout}>
    <Button
      color='inherit'
      aria-label='auth'
      onClick={useSignOut({ lng, labels, startTransition })}
      disabled={busy}
    >
      {user.username}&nbsp;&nbsp;<LogoutOutlinedIcon />
    </Button>
  </Tooltip>
}


