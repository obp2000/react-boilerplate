'use client'

import Button from '@/app/useClient/Button'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { confirmable, createConfirmation } from 'react-confirm'

type Props = {
  /** header title */
  title: string
  confirmation: string, // arguments of your confirm function
  okText: string,
  cancelText: string,
  okButtonStyle: 'primary' | 'secondary' | 'success' | 'danger' |
  'warning' | 'info' | 'light' | 'dark' | 'link'
  cancelButtonStyle: 'primary' | 'secondary' | 'success' | 'danger' |
  'warning' | 'info' | 'light' | 'dark' | 'link'
  show: boolean // from confirmable.
  proceed: Function // from confirmable.
  cancel: Function // from confirmable.
  dismiss: Function // from confirmable.
}

const Confirmation = ({
  show,
  proceed,
  confirmation,
  // title,
  okText = 'OK',
  cancelText = 'Cancel',
  // okButtonStyle = 'primary',
  // cancelButtonStyle = 'secondary',
}: Props) => <Dialog
  arial-label='confirmation'
  open={show}
  onClose={() => proceed(false)}
>
    <DialogTitle>
      <WarningAmberIcon color='warning' />
        {confirmation}
    </DialogTitle>
    <DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => proceed(false)}>
          {cancelText}
        </Button>
        <Button variant="outlined" onClick={() => proceed(true)}>
          {okText}
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog >

const confirmLow = createConfirmation(confirmable(Confirmation))

export const confirm = (message: string, options = {}) => {
  return confirmLow(Object.assign({ confirmation: message }, options))
}


// import Button from '@/app/useClient/Button'
// import type {
//   Confirmation,
//   ProceedButtonProps
// } from '@/interfaces/confirmation'
// import { FC } from 'react'
// import Modal from 'react-bootstrap/Modal'
// import {
//   confirmable,
//   createConfirmation,
//   ReactConfirmProps
// } from 'react-confirm'

// const ProceedButton: FC<ProceedButtonProps> = ({ label, onClick }) => <Button
//   size='sm'
//   variant='outline-dark'
//   aria-labelledby={label}
//   onClick={onClick}>
//   {label}
// </Button>

// const ConfirmationComp = ({
//   proceedLabel,
//   cancelLabel,
//   title,
//   confirmation,
//   show,
//   proceed,
//   // enableEscape = true,
// }: Omit<ReactConfirmProps, 'proceed'> & Confirmation) => <Modal
//   show={show} centered>
//     <Modal.Header>
//       {title}
//     </Modal.Header>
//     <Modal.Body>
//       {confirmation}
//     </Modal.Body>
//     <Modal.Footer>
//       <ProceedButton label={cancelLabel} onClick={() => proceed(false)} />
//       <ProceedButton label={proceedLabel} onClick={() => proceed(true)} />
//     </Modal.Footer>
//   </Modal>

// export default createConfirmation(confirmable(ConfirmationComp))


