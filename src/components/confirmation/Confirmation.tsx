import React from 'react'
import type { MouseEvent } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap'
import { confirmable, createConfirmation } from 'react-confirm'
import { Confirmation } from '../../../interfaces'

type ProceedButtonProps = {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const ProceedButton = ({
  label,
  onClick
}: ProceedButtonProps): JSX.Element => <Button
  size='sm'
  aria-labelledby={label}
  outline
  onClick={onClick}>
    {label}
  </Button>

const ConfirmationComp = ({
  proceedLabel,
  cancelLabel,
  title,
  confirmation,
  show,
  proceed,
  // enableEscape = true,
}: Confirmation): JSX.Element => <Modal isOpen={show}>
    <ModalHeader>
      {title}
    </ModalHeader>
    <ModalBody>
      {confirmation}
    </ModalBody>
    <ModalFooter>
      <ProceedButton label={cancelLabel} onClick={() => proceed(false)} />
      <ProceedButton label={proceedLabel} onClick={() => proceed(true)} />
    </ModalFooter>
  </Modal>

export default createConfirmation(confirmable(ConfirmationComp))
