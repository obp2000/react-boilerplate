// import 'react-toastify/dist/ReactToastify.min.css'

import { toast, type ToastOptions } from 'react-toastify'
import toastConfig from './toastConfig'

export function toastSuccess(message: string) {
  toast.dismiss()
  toast.success(message, toastConfig as ToastOptions)
}
