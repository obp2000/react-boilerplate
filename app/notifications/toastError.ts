// import 'react-toastify/dist/ReactToastify.min.css'

import { toast, ToastOptions } from 'react-toastify'
import toastConfig from './toastConfig'

export function toastError(message: string) {
  toast.dismiss()
  toast.error(message, { ...toastConfig, autoClose: false } as ToastOptions)
}
