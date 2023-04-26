'use client'

import { toast } from "react-hot-toast"

export const toastError = (message: string) => {
  return toast.error(message)
}

export const toastSuccess = (message: string) => {
  return toast.success(message, { duration: 3000 })
}


// const toastConfig: ToastOptions = {
//   position: toast.POSITION.BOTTOM_LEFT,
//   autoClose: 2000,
//   transition: Zoom,
//   theme: 'colored',
//   closeOnClick: true,
//   draggable: true,
//   hideProgressBar: true,
//   // 'aria-label': 'toast',
// }