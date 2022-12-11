'use client'

import Toast from '@/client/Toast'
import ToastContainer from '@/client/ToastContainer'

export function ToastComp({
  message,
}: {message: string}) {
  return <>
    <ToastContainer className="p-3" position='top-center'>
      <Toast show={true} bg='success' aria-label='toast' delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  </>
}

// export function toastSuccess(message: string | undefined) {}

// export const toastSuccess1 = (message: string | undefined) => {
//   toast.dismiss()
//   toast.success(message, toastConfig)
// }