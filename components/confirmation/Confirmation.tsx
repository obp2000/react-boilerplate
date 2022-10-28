import { FC } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap'
import {
  confirmable,
  createConfirmation,
  ReactConfirmProps
} from 'react-confirm'
import type {
  Confirmation,
  ProceedButtonProps
} from '../../interfaces/confirmation'

const ProceedButton: FC<ProceedButtonProps> = ({ label, onClick }) => <Button
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
}: Omit<ReactConfirmProps, 'proceed'> & Confirmation): JSX.Element => <Modal isOpen={show}>
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
