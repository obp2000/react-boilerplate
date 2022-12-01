'use client'

import Button from '@/client/Button'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { UserType } from '@/interfaces/users'
import { signOutAction } from '@/services/api/client'
import { useRouter } from 'next/navigation'

export default function SignOutButtonClient ({
  commonConsts,
  user
}: CommonConstsType & UserType) {
  const { refresh } = useRouter()
  return <Button
    color='primary'
    className='btn-outline-light'
    aria-label='auth'
    onClick={() => signOutAction(refresh)}
  >
    {`${commonConsts?.logout_menu_item.label} (${user?.username})`}
  </Button>
}
