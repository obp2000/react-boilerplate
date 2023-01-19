'use client'

import Toast from '@/client/Toast'

export function ToastComp({
  message,
}: {message: string}) {
  return <>
{/*    <div className="p-3" position='top-center'>
      <Toast show={true} bg='success' aria-label='toast' delay={3000} autohide>
        <div>
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </div>
        <div>{message}</div>
      </Toast>
    </div>*/}
  </>
}

// export function toastSuccess(message: string | undefined) {}

// export const toastSuccess1 = (message: string | undefined) => {
//   toast.dismiss()
//   toast.success(message, toastConfig)
// }