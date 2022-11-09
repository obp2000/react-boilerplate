import { toast, Zoom } from 'react-toastify'
import type { ToastConfig } from '@/interfaces/toast'

const toastConfig: ToastConfig = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 1000,
  transition: Zoom,
  theme: 'colored',
  closeOnClick: true,
  draggable: true,
  hideProgressBar: true,
  limit: 1,
  role: 'alert',
  'aria-label': 'toast',
}

export const toastError = (message: string | undefined) => {
  toast.dismiss()
  toast.error(message, { ...toastConfig, autoClose: false })
}

export const toastSuccess = (message: string | undefined) => {
  toast.dismiss()
  toast.success(message, toastConfig)
}
