import {toast, Zoom} from 'react-toastify'

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
}

export const toastError = (message) => {
    toast.dismiss()
    toast.error(message, {autoClose: false, ...toastConfig})
}

export const toastSuccess = (message) => {
    toast.dismiss()
    toast.success(message, toastConfig)
}
