'use client'

import { toast, type ToastOptions, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const toastConfig: ToastOptions = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000,
  transition: Zoom,
  theme: 'colored',
  closeOnClick: true,
  draggable: true,
  hideProgressBar: true,
  // 'aria-label': 'toast',
}

export const toastError = (message: string | undefined) => {
  toast.dismiss()
  toast.error(message, { ...toastConfig, autoClose: false })
}

export const toastSuccess = (message: string | undefined) => {
  toast.dismiss()
  // toast.success(message, toastConfig)
  toast.success(message, { ...toastConfig, autoClose: false })
}
