'use client'

import { WarningAmber } from '@mui/icons-material'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useTransition, useCallback } from 'react'

import Button from '@/app/components/Button'
import { toastSuccess } from '@/app/components/toast'
import { remove } from './actions'

import type { ReactNode } from 'react'

type Props = {
  title: string
  okText: string
  cancelText: string
  lng: string
  table: string
  id: string
  children?: ReactNode
}

export default function Modal({
  title,
  okText,
  cancelText,
  lng,
  table,
  id,
  children,
}: Props) {
  const { back } = useRouter()
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  const onConfirmButtonClick = useCallback(() => {
    startTransition(async () => {
      const res = await remove({ lng, table, id: Number(id) })
      back()
      if (res.success) {
        toastSuccess(String(res.message))
      }
    })
  }, [back, id, lng, table])
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
        onClick={onConfirmButtonClick}
      >
        {okText}
      </Button>
    </DialogActions>
  </Dialog>
}
