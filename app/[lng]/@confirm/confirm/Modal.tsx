'use client'

import { WarningAmber } from '@mui/icons-material'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { type ReactNode, useTransition, useCallback } from 'react'
import Button from '@/app/components/Button'
import { toastSuccess } from '@/app/components/toast'

type Props = {
  title: string
  okText: string
  cancelText: string
  url: string
  message: string
  children?: ReactNode
}

export default function Modal({
  title,
  okText,
  cancelText,
  url,
  message,
  children,
}: Props) {
  const { back, refresh } = useRouter()
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  const deleteObject = useCallback(async () => {
    const res = await fetch(url, { method: 'DELETE' })
    if (res.ok) {
      toastSuccess(message)
      refresh()
    }
  }, [url, refresh, message])
  const onConfirmButtonClick = useCallback(() => {
    back()
    deleteObject()
  }, [back, deleteObject])
  return <Dialog
    open={true}
    onClose={back}
    arial-label='confirmation'>
    <DialogTitle id="confirm-dialog">
      <WarningAmber color='warning' />
      {title}
    </DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions>
      <Button 
      disabled={busy}
      onClick={back}>
        {cancelText}
      </Button>
      <Button
        disabled={busy}
        onClick={() => startTransition(onConfirmButtonClick)}
      >
        {okText}
      </Button>
    </DialogActions>
  </Dialog>
}
