'use client'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { WarningAmber } from '@mui/icons-material'
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import Button from '@/app/components/Button'

type Props = {
  title: string
  children?: ReactNode
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onConfirm: Function
  okText: string
  cancelText: string
}

export default function ConfirmDialog({
  title,
  children,
  open,
  setOpen,
  onConfirm,
  okText = 'OK',
  cancelText = 'Cancel',
}: Props) {
  const handleClose = () => setOpen(false)
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      arial-label='confirmation'
    >
      <DialogTitle id="confirm-dialog">
        <WarningAmber color='warning' />
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
        >
          {cancelText}
        </Button>
        <Button
          onClick={() => {
            handleClose()
            onConfirm()
          }}
          color="inherit"
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
