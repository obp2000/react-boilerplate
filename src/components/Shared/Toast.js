import {toast} from 'react-toastify'

export const toastError = (message) => {
    toast.dismiss()
    toast.error(message, {autoClose: false})
}

export const toastSuccess = (message) => {
    toast.dismiss()
    toast.success(message)
}
