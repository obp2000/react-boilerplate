import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap'
import {confirmable, createConfirmation} from 'react-confirm'

const ProceedButton = ({label, onClick}) => <Button
      size='sm'
      aria-labelledby={label}
      outline
      onClick={onClick}>
      {label}
    </Button>

const Confirmation = ({
  proceedLabel,
  cancelLabel,
  title,
  confirmation,
  show,
  proceed,
  // enableEscape = true,
}) => <Modal isOpen={show}>
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

Confirmation.propTypes = {
  proceedLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,
  // enableEscape: PropTypes.bool,
}

export default createConfirmation(confirmable(Confirmation))
