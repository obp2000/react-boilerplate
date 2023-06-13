'use client'

import { Delete } from '@mui/icons-material'
// import { IconButton } from '@mui/material'
// import Tooltip from '@/app/components/Tooltip'
// import { useCallback, useState, useTransition } from 'react'
// import dynamic from 'next/dynamic'
// import { useRouter } from 'next/navigation'
// import { toastError, toastSuccess } from '@/app/components/toast'

// const ConfirmDialog = dynamic(() => import('@/app/components/ConfirmDialog'), {
//   ssr: false,
// })

// type Props = {
//   url: string
//   label: string
//   okText: string
//   cancelText: string
// }

// export default function Button({
//   url,
//   label,
//   okText,
//   cancelText,
// }: Props) {
//   const [isPending, startTransition] = useTransition()
//   const [confirmOpen, setConfirmOpen] = useState(false)
//   const busy = isPending
//   const { refresh } = useRouter()
//   const deleteObject = useCallback(async () => {
//     const res = await fetch(url, { method: 'DELETE' })
//     const { message } = await res.json()
//     if (res.ok) {
//       toastSuccess(message)
//       refresh()
//     } else {
//       toastError(message)
//     }
//   }, [url, refresh])
//   const onConfirmButtonClick = useCallback(() => {
//     if (busy) {
//       return
//     }
//     deleteObject()
//   }, [deleteObject, busy])
//   return <>
//     <Tooltip title={label}>
//       <IconButton
//         aria-label={label}
//         disabled={busy}
//         onClick={() => setConfirmOpen(true)}>
//         <Delete role='img' color='primary' />
//       </IconButton>
//     </Tooltip>
//     {confirmOpen && <ConfirmDialog
//       title={`${label}?`}
//       open={confirmOpen}
//       setOpen={setConfirmOpen}
//       onConfirm={() => startTransition(onConfirmButtonClick)}
//       okText={okText}
//       cancelText={cancelText}
//     />}
//   </>
// }
