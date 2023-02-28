import { toast, Zoom } from 'react-toastify'

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

export default toastConfig
