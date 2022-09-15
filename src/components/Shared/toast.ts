import { toast, Zoom } from 'react-toastify'
import type { ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

type ToastConfig = ToastOptions & {
  limit: number
  role: string
  'aria-label': string
}

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
  toast.error(message, { autoClose: false, ...toastConfig })
}

export const toastSuccess = (message: string | undefined) => {
  toast.dismiss()
  toast.success(message, toastConfig)
}
