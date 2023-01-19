'use client'

import { useTranslation } from '@/app/i18n/client'
import Button from '@/client/Button'
import Tooltip from '@/client/Tooltip'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { IoLogOutOutline } from 'react-icons/io5'
import { signOutAction } from './client'

export default function SignOutButton({
  user,
  lng
}: { user: User, lng: string }) {
  const { t } = useTranslation(lng, 'auth')
  const { refresh, replace } = useRouter()
  return <Tooltip content={t('logout')}>
    <Button
      aria-label='auth'
      onClick={() => signOutAction({ refresh, replace, message: t('successful logout') })}>
      {user.username}&nbsp;&nbsp;<IoLogOutOutline size={20} />
    </Button>
  </Tooltip>
}
