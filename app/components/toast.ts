'use client'

import { toast } from "react-hot-toast"

export const toastError = (message: string) => {
  return toast.error(message,
    {
      ariaProps: { role: 'status', 'aria-live': 'polite' }
    })
}

export const toastSuccess = (message: string) => {
  return toast.success(message,
    {
      duration: 5000,
      ariaProps: { role: 'status', 'aria-live': 'polite' }
    })
}
