import type { ToastOptions } from 'react-toastify'

export type ToastConfig = ToastOptions & {
  limit: number
  role: string
  'aria-label': string
}
