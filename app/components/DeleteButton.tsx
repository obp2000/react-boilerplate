'use client'

import Tooltip from '@/app/useClient/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useCallback, useState, useTransition } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { toastError, toastSuccess } from '@/app/components/toast'

const ConfirmDialog = dynamic(() => import('@/app/components/ConfirmDialog'), {
  ssr: false,
})

type Props = {
  url: string
  label: string
  okText: string
  cancelText: string
}

export default function Button({
  url,
  label,
  okText,
  cancelText,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const busy = isPending
  const { refresh } = useRouter()
  const deleteObject = async () => {
    const res = await fetch(url, { method: 'DELETE' })
    const { message } = await res.json()
    if (res.ok) {
      toastSuccess(message)
      refresh()
    } else {
      toastError(message)
    }
  }
  const onConfirmButtonClick = useCallback(() => {
    if (busy) {
      return
    }
    deleteObject()
  }, [deleteObject, busy])
  return <>
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        disabled={busy}
        onClick={() => setConfirmOpen(true)}>
        <DeleteIcon role='img' color='primary' />
      </IconButton>
    </Tooltip>
    {confirmOpen && <ConfirmDialog
      title={`${label}?`}
      open={confirmOpen}
      setOpen={setConfirmOpen}
      onConfirm={() => startTransition(onConfirmButtonClick)}
      okText={okText}
      cancelText={cancelText}
    />}
  </>
}


  // const onClick = async () => {
  //   const result = await confirm(`${label}?`, { okText, cancelText })
  //   if (result) {
  //     deleteObject()
  //   }
  // }

// {/*<div>
//   <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)}>
//     <DeleteIcon />
//   </IconButton>
//   <ConfirmDialog
//     title="Delete Post?"
//     open={confirmOpen}
//     setOpen={setConfirmOpen}
//     onConfirm={deletePost}
//   >
//     Are you sure you want to delete this post?
//   </ConfirmDialog>
// </div>*/}
      // const res = await fetch(deleteUrl, {
      //   method: 'DELETE',
      //   headers: new Headers({ authorization: `Token ${accessToken}` }),
      // })
      // const { message } = await res.json()
      // if (res.ok) {
      //   startTransition(() => {
      //     refresh()
      //     toastSuccess(message)
      //   })
      // } else {
      //   toastError(message)
      // }
