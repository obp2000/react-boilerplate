'use client'

import Button from '@/client/Button'
import Tooltip from '@/client/Tooltip'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { signOutAction } from './client'

export default function SignOutButton({
  lng,
  user,
  labels
}: {
  lng: string
  user: User
  labels: Record<string, string>
}) {
  const { refresh, replace } = useRouter()
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  return <Tooltip content={labels?.logout}>
    <Button
      aria-label='auth'
      onClick={() => signOutAction({
        refresh,
        replace,
        message: labels?.successfulLogout,
        startTransition,
        lng,
      })}
      disabled={busy}
    >
      {user.username}&nbsp;&nbsp;<IoLogOutOutline size={20} />
    </Button>
  </Tooltip>
}
