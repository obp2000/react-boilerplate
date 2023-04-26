'use client'

import Button from '@/app/useClient/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import type { ReactNode, Dispatch, SetStateAction } from 'react'

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
        <WarningAmberIcon color='warning' />
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClose}
        >
          {cancelText}
        </Button>
        <Button
          variant="outlined"
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
