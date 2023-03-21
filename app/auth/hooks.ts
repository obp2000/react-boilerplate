import { errorMessage } from '@/app/error/client'
import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction, TransitionStartFunction } from 'react'
import type { LoginValues, RegisterValues } from '@/interfaces/users'

export function useSignOut({
  lng,
  startTransition,
  setSuccess,
  setErrorMessage
}: {
  lng: string
  startTransition: TransitionStartFunction
  setSuccess: Dispatch<SetStateAction<boolean>>
  setErrorMessage: Dispatch<SetStateAction<string | null>>
}) {
  const { refresh, replace } = useRouter()
  return async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
      method: 'POST',
      // headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    if (res.ok) {
      setSuccess(true)
      startTransition(() => {
        replace(`/${lng}`)
        refresh()
      })
    } else {
      const errorMessageText = await errorMessage(res)
      setErrorMessage(errorMessageText)
    }
  }
}

export function useAuthAction({
  url,
  labels,
  startTransition,
  lng,
  setModal,
  setSuccess,
  setErrorMessage,
}: {
  url: string
  labels: Record<string, string>
  startTransition: TransitionStartFunction
  lng: string
  setModal: Dispatch<SetStateAction<boolean>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setErrorMessage: Dispatch<SetStateAction<string | null>>
}) {
  const { replace, refresh } = useRouter()
  return async (values: LoginValues | RegisterValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth${url}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    if (res.ok) {
      setSuccess(true)
      startTransition(() => {
        replace(`/${lng}/user`)
        refresh()
        setModal(false)
      })
    } else {
      const errorMessageText = await errorMessage(res)
      setErrorMessage(labels[errorMessageText])
    }
  }
}