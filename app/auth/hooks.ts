import type { LoginValues, RegisterValues } from '@/interfaces/users'
import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction, TransitionStartFunction } from 'react'
import { toastSuccess, toastError } from '@/app/notifications/toast'

export function useAuthAction({
  url,
  startTransition,
  redirectUrl,
  setModal
}: {
  url: string
  startTransition: TransitionStartFunction
  redirectUrl: string
  setModal?: Dispatch<SetStateAction<boolean>>
}) {
  const { replace, refresh } = useRouter()
  return async (values: LoginValues | RegisterValues | {}) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    const { message } = await res.json()
    if (res.ok) {
      if (setModal) {
        setModal(false)
      }
      startTransition(() => {
        replace(redirectUrl)
        refresh()
        toastSuccess(message)
      })
    } else {
      toastError(message)
    }
  }
}
