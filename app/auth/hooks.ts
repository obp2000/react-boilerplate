import { errorMessage } from '@/app/error/client'
import { toastError } from '@/app/notifications/toastError'
import { toastSuccess } from '@/app/notifications/toastSuccess'
import { useRouter } from 'next/navigation'
import type { TransitionStartFunction } from 'react'

export function useSignOut({ lng, labels, startTransition }: {
  lng: string
  labels: Record<string, string>
  startTransition: TransitionStartFunction
}) {
  const { refresh, replace } = useRouter()
  return async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
      method: 'POST',
      // headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    if (res.ok) {
      startTransition(() => {
        replace(`/${lng}`)
        refresh()
      })
      toastSuccess(labels?.successfulLogout)
    } else {
      const errorMessageText = await errorMessage(res)
      toastError(errorMessageText)
    }
  }
}
