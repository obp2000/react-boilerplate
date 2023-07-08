'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { toastSuccess } from '@/app/components/toast'

export default function Success({
  url,
  message,
}: {
  url: string
  message: string
}) {
  const {push, refresh, back, replace } = useRouter()
  useEffect(() => {
    toastSuccess(message)
    refresh()
    // back()
    push(url)
    // refresh()
  }, [back, message, push, refresh, replace, url])
  return <></>
}


// export function Modal({
//   title,
//   okText,
//   cancelText,
//   url,
//   message,
//   children,
// }: Props) {
//   const { back, refresh } = useRouter()
//   const [isPending, startTransition] = useTransition()
//   const busy = isPending
//   const deleteObject = useCallback(async () => {
//     const res = await fetch(url, { method: 'DELETE' })
//     if (res.ok) {
//       toastSuccess(message)
//       refresh()
//     }
//   }, [url, refresh, message])
//   const onConfirmButtonClick = useCallback(() => {
//     back()
//     deleteObject()
//   }, [back, deleteObject])
//   return <Dialog
//     open={true}
//     onClose={back}
//     arial-label='confirmation'>
//     <DialogTitle id="confirm-dialog">
//       <WarningAmber color='warning' />
//       {title}
//     </DialogTitle>
//     <DialogContent>
//       {children}
//     </DialogContent>
//     <DialogActions>
//       <Button 
//       disabled={busy}
//       onClick={back}>
//         {cancelText}
//       </Button>
//       <Button
//         disabled={busy}
//         onClick={() => startTransition(onConfirmButtonClick)}
//       >
//         {okText}
//       </Button>
//     </DialogActions>
//   </Dialog>
// }
