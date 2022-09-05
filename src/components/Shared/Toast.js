import {toast, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const toastConfig = {
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

export const toastError = (message) => {
  toast.dismiss()
  toast.error(message, {autoClose: false, ...toastConfig})
}

export const toastSuccess = (message) => {
  toast.dismiss()
  toast.success(message, toastConfig)
}
